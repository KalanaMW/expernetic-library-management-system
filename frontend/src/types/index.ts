export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  isbn?: string;
  publishedYear?: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
  userId: number;
  user?: User;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  description?: string;
  isbn?: string;
  publishedYear?: number;
  imageUrl?: string;
}

export interface UpdateBookRequest {
  title: string;
  author: string;
  description?: string;
  isbn?: string;
  publishedYear?: number;
  imageUrl?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
