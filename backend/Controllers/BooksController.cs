using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryManagementAPI.Data;
using LibraryManagementAPI.DTOs;
using LibraryManagementAPI.Models;
using System.Security.Claims;

namespace LibraryManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // All endpoints require authentication
public class BooksController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<BooksController> _logger;

    public BooksController(ApplicationDbContext context, ILogger<BooksController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Get all books with optional pagination and search
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<PaginatedResponseDto<BookDto>>> GetBooks(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] bool myBooksOnly = false)
    {
        var userId = GetCurrentUserId();
        var query = _context.Books.Include(b => b.User).AsQueryable();

        // Filter by user's books if requested
        if (myBooksOnly)
        {
            query = query.Where(b => b.UserId == userId);
        }

        // Search filter
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(b => 
                b.Title.Contains(search) || 
                b.Author.Contains(search) ||
                (b.Description != null && b.Description.Contains(search)) ||
                (b.ISBN != null && b.ISBN.Contains(search)));
        }

        // Get total count
        var totalCount = await query.CountAsync();

        // Apply pagination
        var books = await query
            .OrderByDescending(b => b.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var bookDtos = books.Select(MapToBookDto).ToList();

        return Ok(new PaginatedResponseDto<BookDto>
        {
            Data = bookDtos,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount,
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
            HasPrevious = page > 1,
            HasNext = page < (int)Math.Ceiling(totalCount / (double)pageSize)
        });
    }

    /// <summary>
    /// Get a specific book by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<BookDto>> GetBook(int id)
    {
        var book = await _context.Books
            .Include(b => b.User)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (book == null)
        {
            return NotFound(new { message = "Book not found" });
        }

        return Ok(MapToBookDto(book));
    }

    /// <summary>
    /// Create a new book
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<BookDto>> CreateBook(CreateBookDto dto)
    {
        var userId = GetCurrentUserId();

        // Check for duplicate ISBN if provided
        if (!string.IsNullOrWhiteSpace(dto.ISBN))
        {
            if (await _context.Books.AnyAsync(b => b.ISBN == dto.ISBN))
            {
                return BadRequest(new { message = "A book with this ISBN already exists" });
            }
        }

        var book = new Book
        {
            Title = dto.Title,
            Author = dto.Author,
            Description = dto.Description,
            ISBN = dto.ISBN,
            PublishedYear = dto.PublishedYear,
            ImageUrl = dto.ImageUrl,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        // Load the user for the response
        await _context.Entry(book).Reference(b => b.User).LoadAsync();

        _logger.LogInformation("Book created: {Title} by user {UserId}", book.Title, userId);

        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, MapToBookDto(book));
    }

    /// <summary>
    /// Update an existing book (owner only)
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<BookDto>> UpdateBook(int id, UpdateBookDto dto)
    {
        var userId = GetCurrentUserId();
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound(new { message = "Book not found" });
        }

        // Check ownership
        if (book.UserId != userId)
        {
            return Forbid(); // 403 Forbidden
        }

        // Check for duplicate ISBN if changed
        if (!string.IsNullOrWhiteSpace(dto.ISBN) && dto.ISBN != book.ISBN)
        {
            if (await _context.Books.AnyAsync(b => b.ISBN == dto.ISBN && b.Id != id))
            {
                return BadRequest(new { message = "A book with this ISBN already exists" });
            }
        }

        // Update properties
        book.Title = dto.Title;
        book.Author = dto.Author;
        book.Description = dto.Description;
        book.ISBN = dto.ISBN;
        book.PublishedYear = dto.PublishedYear;
        book.ImageUrl = dto.ImageUrl;
        book.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        // Load the user for the response
        await _context.Entry(book).Reference(b => b.User).LoadAsync();

        _logger.LogInformation("Book updated: {Id} by user {UserId}", id, userId);

        return Ok(MapToBookDto(book));
    }

    /// <summary>
    /// Delete a book (owner only)
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var userId = GetCurrentUserId();
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound(new { message = "Book not found" });
        }

        // Check ownership
        if (book.UserId != userId)
        {
            return Forbid();
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Book deleted: {Id} by user {UserId}", id, userId);

        return NoContent(); // 204 No Content
    }

    private int GetCurrentUserId()
    {
        return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
    }

    private static BookDto MapToBookDto(Book book)
    {
        return new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Description = book.Description,
            ISBN = book.ISBN,
            ImageUrl = book.ImageUrl,
            PublishedYear = book.PublishedYear,
            CreatedAt = book.CreatedAt,
            UpdatedAt = book.UpdatedAt,
            UserId = book.UserId,
            OwnerUsername = book.User?.Username
        };
    }
}
