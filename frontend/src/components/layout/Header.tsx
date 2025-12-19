import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import siteLogo from '../../assets/Site-logo.png';
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
          <img className="logo-icon" src={siteLogo} alt="Libréum LMS" />
          <span className="logo-text">Libréum LMS</span>
        </Link>

        <nav className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Books
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
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
