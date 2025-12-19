import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated, user } = useAuth();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <p className="footer-title">Libréum LMS</p>
          <p className="footer-description">
            The best Library Management System for managing book records.
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          {isAuthenticated ? (
            <span className="footer-user-info">
              Signed in as {user?.firstName || user?.username}
            </span>
          ) : (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {currentYear} Libréum LMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
