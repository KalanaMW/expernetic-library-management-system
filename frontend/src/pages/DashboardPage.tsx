import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { booksApi } from '../services/api';
import type { Book } from '../types';
import { BookList, BookModal } from '../components/books';
import { SearchBar } from '../components/common';
import './DashboardPage.css';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await booksApi.getBooks({ 
        search: searchQuery,
        myBooksOnly: true 
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchQuery]);

  const handleCreateBook = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteBook = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await booksApi.deleteBook(id);
        fetchBooks();
      } catch (error) {
        console.error('Failed to delete book:', error);
        alert('Failed to delete book');
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const handleModalSuccess = () => {
    setIsModalOpen(false);
    setEditingBook(null);
    fetchBooks();
  };

  return (
    <div className="dashboard">
      <motion.header
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <div>
            <h1>My Library</h1>
            <p className="welcome-text">Welcome back, {user?.firstName || user?.username}!</p>
          </div>
          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>
      </motion.header>

      <div className="dashboard-content">
        <motion.div
          className="actions-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <motion.button
            className="btn-primary"
            onClick={handleCreateBook}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Add Book
          </motion.button>
        </motion.div>

        <BookList
          books={books}
          isLoading={isLoading}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
        />
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <BookModal
            book={editingBook}
            onClose={handleModalClose}
            onSuccess={handleModalSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
