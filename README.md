# Library Management System

A clean, pragmatic full-stack application for managing book records. Built as a demonstration of solid software engineering principles with modern web technologies.

## What This Does

Simple book inventory management with full CRUD capabilities. Add books, edit their details, view your collection, and remove entries when needed. Nothing fancy, just solid fundamentals executed well.

## Tech Stack

**Backend**
- .NET 8 with ASP.NET Core (Web API)
- Entity Framework Core for ORM
- SQLite for data persistence
- C# 12 features throughout

**Frontend**
- React 18 with TypeScript
- **React Router v6** for seamless navigation
- **Framer Motion** for smooth, professional animations
- Vite for build tooling (because life's too short for slow builds)
- Modern React patterns - hooks, functional components
- Responsive CSS (mobile-first approach)

**Why These Choices?**

SQLite keeps deployment simple - no separate database server to manage. Entity Framework gives us clean data access without writing raw SQL everywhere. TypeScript catches bugs at compile time instead of runtime. Vite provides instant HMR during development. Framer Motion brings the UI to life with buttery-smooth animations inspired by modern web design. These are battle-tested tools that just work.

## What You Can Do

- **User Authentication** - Secure registration and login with JWT
- **Book Management** - Full CRUD operations on your personal library
  - Create book records (title, author, description, ISBN, year)
  - View your collection with smooth animations
  - Search and filter through books instantly
  - Update book information with real-time validation
  - Delete books with satisfying confirmation flows
- **Smooth Animations** - Page transitions, hover effects, loading states
- **Input Validation** - Both client and server-side (never trust the client)
- **Proper Error Handling** - Meaningful messages when things go wrong
- **Responsive Design** - Works beautifully on any screen size

## Project Layout

```
├── backend/                    # .NET API project
│   ├── Controllers/            # API endpoints
│   ├── Models/                 # Entity models
│   ├── Data/                   # DbContext and migrations
│   ├── DTOs/                   # Request/response shapes
│   └── Program.cs
├── frontend/                   # React app
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── services/           # API client
│   │   ├── types/              # TypeScript interfaces
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

You'll need:
- .NET 8 SDK ([download here](https://dotnet.microsoft.com/download))
- Node.js 18+ ([grab it here](https://nodejs.org/))
- Your favorite code editor (VS Code recommended)

### Running Locally

**Backend:**

```bash
cd backend
dotnet restore
dotnet ef database update    # Creates the SQLite database
dotnet run
```

API runs on `http://localhost:5000` by default. You'll see swagger docs at `/swagger` if you want to poke around the endpoints.

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Opens on `http://localhost:5173`. Hot reload is enabled, so changes appear instantly.

## API Reference

Base URL: `http://localhost:5000/api`

### Endpoints

```http
GET    /api/books           # Fetch all books
GET    /api/books/{id}      # Get specific book
POST   /api/books           # Create new book
PUT    /api/books/{id}      # Update existing book  
DELETE /api/books/{id}      # Remove book
```

### Request Examples

**Creating a book:**
```json
POST /api/books
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "description": "A handbook of agile software craftsmanship"
}
```

**Updating a book:**
```json
PUT /api/books/1
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin", 
  "description": "Essential reading for any developer"
}
```

All string fields are required except description (which is optional). The API returns 400 with validation errors if you send bad data.

## Database Schema

**Books Table:**

| Column      | Type     | Notes                    |
|-------------|----------|--------------------------|
| Id          | int      | Primary key, auto-increment |
| Title       | string   | Required                 |
| Author      | string   | Required                 |
| Description | string   | Optional                 |
| CreatedAt   | DateTime | Auto-generated           |
| UpdatedAt   | DateTime | Updated on modification  |

Entity Framework handles the migrations, so you don't need to write SQL by hand. The schema is defined in the model classes.

## Development Notes

### Code Structure

The backend follows standard .NET API patterns - controllers handle HTTP, services contain business logic (when needed), and EF Core manages data access. DTOs keep our API contracts clean and separate from internal models.

Frontend uses a straightforward component hierarchy. The API service layer abstracts HTTP calls so components don't deal with fetch directly. Type definitions are shared across components to maintain consistency.

### Things Worth Knowing

- CORS is configured to allow the frontend origin (localhost:5173)
- The SQLite database file gets created in the backend directory
- EF migrations are version-controlled - check the Migrations folder
- Error handling uses standard HTTP status codes (400, 404, 500)
- No authentication yet - this is a simple CRUD demo

### If You're Extending This

Consider adding:
- Pagination for the book list (you'll want this with 1000+ books)
- Search and filtering capabilities
- ISBN field with validation
- Book categories/genres
- User authentication (JWT works well here)
- Unit tests (especially for validation logic)

## Building for Production

**Backend:**
```bash
cd backend
dotnet publish -c Release -o ./publish
```

**Frontend:**
```bash
cd frontend
npm run build
```

Static files end up in `frontend/dist`. You can serve them with any static file server or bundle them into the .NET app.

## Troubleshooting

**"Table doesn't exist" errors:** Run `dotnet ef database update` in the backend folder.

**CORS errors in browser:** Check that the backend is running on port 5000 and the frontend is calling the right URL.

**Port already in use:** Kill the process or change ports in `launchSettings.json` (backend) or `vite.config.ts` (frontend).

**Frontend can't reach API:** Verify the API base URL in your frontend service configuration matches where the backend is actually running.

## Context

This project was built as an internship assignment for Expernetic LLC (rebranded as Libréum LMS). The goal was demonstrating clean architecture, proper separation of concerns, and competency with modern full-stack development practices. It's intentionally focused on fundamentals rather than bells and whistles.

## License

Educational/assessment project.

---

Built with attention to detail and genuine care for code quality. Questions? Feel free to reach out.
