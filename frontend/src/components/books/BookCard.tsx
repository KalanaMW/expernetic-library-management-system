import { motion } from 'framer-motion';
import type { Book } from '../../types';
import './BookCard.css';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export const BookCard = ({ book, onEdit, onDelete }: BookCardProps) => {
  return (
    <motion.div
      className="book-card"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="book-cover">
        {book.imageUrl ? (
          <img src={book.imageUrl} alt={book.title} className="book-cover-image" />
        ) : (
          <div className="book-cover-placeholder">
            <span className="book-icon">📖</span>
          </div>
        )}
      </div>

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        
        {book.description && (
          <p className="book-description">{book.description}</p>
        )}

        <div className="book-meta">
          {book.publishedYear && (
            <span className="book-year">{book.publishedYear}</span>
          )}
          {book.isbn && (
            <span className="book-isbn">ISBN: {book.isbn}</span>
          )}
        </div>
      </div>

      <div className="book-actions">
        <motion.button
          className="btn-icon"
          onClick={() => onEdit(book)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Edit book"
        >
          ✏️
        </motion.button>
        <motion.button
          className="btn-icon btn-danger"
          onClick={() => onDelete(book.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Delete book"
        >
          🗑️
        </motion.button>
      </div>
    </motion.div>
  );
};
