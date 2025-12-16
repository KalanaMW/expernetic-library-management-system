# Quick Start Guide

## Prerequisites

- .NET 9 SDK
- Node.js 18+ and npm
- A terminal/command prompt

## Running the Application

### 1. Start the Backend API

```bash
cd backend
dotnet run
```

The API will start on `http://localhost:5207` (or the port shown in the terminal).

**Backend Features:**
- Swagger UI available at `http://localhost:5207/swagger`
- SQLite database created automatically on first run
- JWT authentication with BCrypt password hashing
- Full CRUD endpoints for books

### 2. Start the Frontend

Open a new terminal window:

```bash
cd frontend
npm install  # First time only
npm run dev
```

The app will open at `http://localhost:5173`

## First Time Setup

1. **Create an Account**
   - Navigate to `http://localhost:5173`
   - You'll be redirected to the login page
   - Click "Sign up" to create a new account
   - Fill in your details (username, email, password)
   - You'll be automatically logged in and redirected to the dashboard

2. **Add Your First Book**
   - Click the "+ Add Book" button
   - Enter book details:
     - Title (required)
     - Author (required)
     - Description (optional)
     - ISBN (optional)
     - Published Year (optional)
   - Click "Add Book"

3. **Explore Features**
   - **Search**: Use the search bar to filter books by title or author
   - **Edit**: Click the ✏️ icon on any book card to edit
   - **Delete**: Click the 🗑️ icon to remove a book (with confirmation)
   - **Logout**: Click the "Logout" button in the header

## Architecture Overview

### Backend (.NET 9)
- **API Endpoints**: RESTful design with proper HTTP verbs
- **Authentication**: JWT tokens with Bearer authentication
- **Database**: SQLite with Entity Framework Core
- **Validation**: DataAnnotations + manual checks
- **CORS**: Configured for localhost:5173 and localhost:3000

### Frontend (React + TypeScript)
- **Routing**: React Router v6 with protected routes
- **State Management**: React Context API for auth
- **Animations**: Framer Motion for smooth transitions
- **Forms**: React Hook Form for validation
- **HTTP Client**: Axios with interceptors for auth tokens
- **Styling**: Custom CSS with CSS variables for theming

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/me` - Get current user info (requires auth)

### Books (All require authentication)
- `GET /api/books` - List all user's books (supports pagination & search)
- `GET /api/books/{id}` - Get single book details
- `POST /api/books` - Create new book
- `PUT /api/books/{id}` - Update existing book (owner only)
- `DELETE /api/books/{id}` - Delete book (owner only)

## Database Schema

### Users Table
- Id, Username (unique), Email (unique)
- PasswordHash (BCrypt)
- FirstName, LastName (optional)
- CreatedAt, LastLoginAt

### Books Table
- Id, Title, Author
- Description, ISBN, PublishedYear (optional)
- CreatedAt, UpdatedAt
- UserId (foreign key to Users)

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- **Frontend**: Vite provides instant HMR
- **Backend**: Use `dotnet watch run` for auto-restart on file changes

### Debugging
- **Frontend**: Use browser DevTools, React Developer Tools
- **Backend**: Use Visual Studio Code debugger or Rider

### Testing the API
Use Swagger UI at `http://localhost:5207/swagger` or tools like:
- Postman
- curl
- HTTPie

### Common Issues

**CORS Errors**
- Ensure backend CORS is configured for your frontend origin
- Check that you're using the correct API URL in frontend

**401 Unauthorized**
- Token may have expired - logout and login again
- Check that Authorization header is being sent
- Verify token is stored in localStorage

**Database Locked**
- Only one backend instance can access SQLite at a time
- Stop all running backend processes and restart

## Project Structure

```
/backend
  /Controllers       - API endpoints
  /Data             - DbContext and migrations  
  /DTOs             - Data transfer objects
  /Models           - Entity models
  /Services         - Business logic (JWT service)
  library.db        - SQLite database file

/frontend
  /src
    /components     - Reusable UI components
    /pages          - Page components
    /services       - API client
    /contexts       - React contexts
    /types          - TypeScript definitions
    /utils          - Helper functions
```

## Next Steps

- Add more books to your library
- Try the search functionality
- Explore the smooth animations
- Check out the responsive design on mobile
- Review the code to understand the architecture

## Tech Stack Summary

**Backend**
- .NET 9 Web API
- Entity Framework Core 9.0
- SQLite
- JWT Authentication
- BCrypt password hashing
- Swagger/OpenAPI

**Frontend**  
- React 18 + TypeScript
- React Router v6
- Framer Motion
- Axios
- React Hook Form
- Vite

Enjoy building with this library management system! 📚
