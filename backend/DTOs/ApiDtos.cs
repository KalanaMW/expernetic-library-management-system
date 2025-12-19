using System.ComponentModel.DataAnnotations;

namespace LibraryManagementAPI.DTOs;

// ========== Auth DTOs ==========

public class RegisterDto
{
    [Required]
    [StringLength(50, MinimumLength = 3)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 6)]
    public string Password { get; set; } = string.Empty;

    [StringLength(50)]
    public string? FirstName { get; set; }

    [StringLength(50)]
    public string? LastName { get; set; }
}

public class LoginDto
{
    [Required]
    public string UsernameOrEmail { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public UserDto User { get; set; } = null!;
}

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class UpdateUserDto
{
    [EmailAddress]
    [StringLength(100)]
    public string? Email { get; set; }

    [StringLength(50)]
    public string? FirstName { get; set; }

    [StringLength(50)]
    public string? LastName { get; set; }
}

// ========== Book DTOs ==========

public class CreateBookDto
{
    [Required]
    [StringLength(200, MinimumLength = 1)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(150, MinimumLength = 1)]
    public string Author { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [StringLength(20)]
    public string? ISBN { get; set; }

    [Range(1000, 2100)]
    public int? PublishedYear { get; set; }

    [StringLength(500)]
    public string? ImageUrl { get; set; }
}

public class UpdateBookDto
{
    [Required]
    [StringLength(200, MinimumLength = 1)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(150, MinimumLength = 1)]
    public string Author { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [StringLength(20)]
    public string? ISBN { get; set; }

    [Range(1000, 2100)]
    public int? PublishedYear { get; set; }

    [StringLength(500)]
    public string? ImageUrl { get; set; }
}

public class BookDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ISBN { get; set; }
    public int? PublishedYear { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public int UserId { get; set; }
    public string? OwnerUsername { get; set; }
}

// ========== Common DTOs ==========

public class PaginatedResponseDto<T>
{
    public List<T> Data { get; set; } = new();
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
    public bool HasPrevious { get; set; }
    public bool HasNext { get; set; }
}
