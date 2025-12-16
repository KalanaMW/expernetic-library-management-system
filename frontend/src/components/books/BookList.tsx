import { motion } from 'framer-motion';
import type { Book } from '../../types';
import { BookCard } from './BookCard';
import './BookList.css';

interface BookListProps {
  books: Book[];
  isLoading: boolean;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export const BookList = ({ books, isLoading, onEdit, onDelete }: BookListProps) => {
  if (isLoading) {
    return (
      <div className="book-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="book-card skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-author"></div>
              <div className="skeleton-description"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="empty-icon">📚</div>
        <h2>No books yet</h2>
        <p>Start building your library by adding your first book!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="book-grid"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </motion.div>
  );
};
