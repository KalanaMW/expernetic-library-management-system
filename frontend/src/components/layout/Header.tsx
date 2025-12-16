import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <motion.header
      className="app-header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">Library</span>
        </Link>

        <nav className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                My Books
              </Link>
              <div className="user-menu">
                <span className="user-name">
                  {user?.firstName || user?.username}
                </span>
                <button onClick={logout} className="btn-link">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary btn-sm">
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};
