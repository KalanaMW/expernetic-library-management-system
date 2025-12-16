import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import './LandingPage.css';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Your Personal Library,
            <span className="gradient-text"> Beautifully Organized</span>
          </motion.h1>
          
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Collect, organize, and rediscover your favorite books in a warm, 
            minimalist space designed for book lovers.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary btn-large">
                Go to My Library
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary btn-large">
                  Start Your Collection
                </Link>
                <Link to="/login" className="btn-secondary btn-large">
                  Sign In
                </Link>
              </>
            )}
          </motion.div>
        </div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="book-stack">
            <div className="book book-1">📕</div>
            <div className="book book-2">📗</div>
            <div className="book book-3">📘</div>
            <div className="book book-4">📙</div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="features">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Everything You Need
        </motion.h2>

        <div className="features-grid">
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="feature-icon">📚</div>
            <h3>Organize Your Collection</h3>
            <p>Add books with details like author, ISBN, publication year, and cover images. Keep everything in one beautiful place.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="feature-icon">🔍</div>
            <h3>Quick Search</h3>
            <p>Find any book instantly with our powerful search. Filter by title, author, or any detail you've added.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="feature-icon">✨</div>
            <h3>Beautiful Interface</h3>
            <p>A warm, minimal design inspired by cozy coffee shops. Easy on the eyes, delightful to use.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your collection is yours alone. Industry-standard security keeps your library safe and private.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Start Building Your Library Today</h2>
        <p>Join book lovers who've already organized their collections</p>
        {!isAuthenticated && (
          <Link to="/register" className="btn-primary btn-large">
            Create Free Account
          </Link>
        )}
      </motion.section>
    </div>
  );
};
