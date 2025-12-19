using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryManagementAPI.Data;
using LibraryManagementAPI.DTOs;
using LibraryManagementAPI.Models;
using LibraryManagementAPI.Services;
using BCrypt.Net;

namespace LibraryManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ITokenService _tokenService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        ApplicationDbContext context, 
        ITokenService tokenService,
        ILogger<AuthController> logger)
    {
        _context = context;
        _tokenService = tokenService;
        _logger = logger;
    }

    /// <summary>
    /// Register a new user
    /// </summary>
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto dto)
    {
        // Check if username already exists
        if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
        {
            return BadRequest(new { message = "Username already taken" });
        }

        // Check if email already exists
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
        {
            return BadRequest(new { message = "Email already registered" });
        }

        // Hash the password
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        // Create new user
        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = passwordHash,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        _logger.LogInformation("New user registered: {Username}", user.Username);

        // Generate token
        var token = _tokenService.GenerateToken(user);

        return Ok(new AuthResponseDto
        {
            Token = token,
            User = MapToUserDto(user)
        });
    }

    /// <summary>
    /// Login with username/email and password
    /// </summary>
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
    {
        // Find user by username or email
        var user = await _context.Users
            .FirstOrDefaultAsync(u => 
                u.Username == dto.UsernameOrEmail || 
                u.Email == dto.UsernameOrEmail);

        if (user == null)
        {
            return Unauthorized(new { message = "Invalid credentials" });
        }

        // Verify password
        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Invalid credentials" });
        }

        // Update last login time
        user.LastLoginAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        _logger.LogInformation("User logged in: {Username}", user.Username);

        // Generate token
        var token = _tokenService.GenerateToken(user);

        return Ok(new AuthResponseDto
        {
            Token = token,
            User = MapToUserDto(user)
        });
    }

    /// <summary>
    /// Get current user info (requires authentication)
    /// </summary>
    [HttpGet("me")]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "0");
        
        var user = await _context.Users.FindAsync(userId);
        
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        return Ok(MapToUserDto(user));
    }

    /// <summary>
    /// Update current user profile (requires authentication)
    /// </summary>
    [HttpPut("me")]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public async Task<ActionResult<UserDto>> UpdateProfile(UpdateUserDto dto)
    {
        var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "0");
        
        var user = await _context.Users.FindAsync(userId);
        
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        // Check if email is being changed and if it's already taken
        if (!string.IsNullOrWhiteSpace(dto.Email) && dto.Email != user.Email)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest(new { message = "Email already in use" });
            }
            user.Email = dto.Email;
        }

        // Update other fields if provided
        if (dto.FirstName != null)
        {
            user.FirstName = dto.FirstName;
        }

        if (dto.LastName != null)
        {
            user.LastName = dto.LastName;
        }

        await _context.SaveChangesAsync();

        _logger.LogInformation("User profile updated: {Username}", user.Username);

        return Ok(MapToUserDto(user));
    }

    private static UserDto MapToUserDto(User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            FullName = user.FullName,
            CreatedAt = user.CreatedAt
        };
    }
}
