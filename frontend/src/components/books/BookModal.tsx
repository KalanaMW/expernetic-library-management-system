import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { booksApi } from '../../services/api';
import type { Book, CreateBookRequest } from '../../types';
import './BookModal.css';

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const BookModal = ({ book, onClose, onSuccess }: BookModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateBookRequest>({
    defaultValues: book || {},
  });

  useEffect(() => {
    if (book) {
      reset(book);
    }
  }, [book, reset]);

  const onSubmit = async (data: CreateBookRequest) => {
    try {
      setIsSubmitting(true);
      setError('');

      if (book) {
        await booksApi.updateBook(book.id, data);
      } else {
        await booksApi.createBook(data);
      }

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save book');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{book ? 'Edit Book' : 'Add New Book'}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
          {error && (
            <div className="error-message">{error}</div>
          )}

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              {...register('title', { required: 'Title is required' })}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && (
              <span className="field-error">{errors.title.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <input
              id="author"
              type="text"
              {...register('author', { required: 'Author is required' })}
              className={errors.author ? 'error' : ''}
            />
            {errors.author && (
              <span className="field-error">{errors.author.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={4}
              {...register('description')}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="isbn">ISBN <span className="field-hint">(Optional)</span></label>
              <input
                id="isbn"
                type="text"
                {...register('isbn')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="publishedYear">Year</label>
              <input
                id="publishedYear"
                type="number"
                {...register('publishedYear', {
                  valueAsNumber: true,
                  min: { value: 1000, message: 'Invalid year' },
                  max: { value: new Date().getFullYear() + 1, message: 'Invalid year' },
                })}
                className={errors.publishedYear ? 'error' : ''}
              />
              {errors.publishedYear && (
                <span className="field-error">{errors.publishedYear.message}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Cover Image URL</label>
            <input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/book-cover.jpg"
              {...register('imageUrl')}
            />
            <span className="field-hint">Optional: Paste a URL to an image of the book cover</span>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <motion.button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? 'Saving...' : book ? 'Update Book' : 'Add Book'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
