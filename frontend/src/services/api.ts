import axios from 'axios';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
  Book,
  CreateBookRequest,
  UpdateBookRequest,
  PaginatedResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', userData);
    return data;
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },
};

// Books API
export const booksApi = {
  getBooks: async (params?: {
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<PaginatedResponse<Book>> => {
    const { data } = await api.get<PaginatedResponse<Book>>('/books', { params });
    return data;
  },

  getBook: async (id: number): Promise<Book> => {
    const { data } = await api.get<Book>(`/books/${id}`);
    return data;
  },

  createBook: async (book: CreateBookRequest): Promise<Book> => {
    const { data } = await api.post<Book>('/books', book);
    return data;
  },

  updateBook: async (id: number, book: UpdateBookRequest): Promise<Book> => {
    const { data } = await api.put<Book>(`/books/${id}`, book);
    return data;
  },

  deleteBook: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};

export default api;
