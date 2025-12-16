import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">
            <span className="footer-icon">📚</span>
            Library
          </h3>
          <p className="footer-description">
            Your personal space for organizing and cherishing your book collection.
            Simple, beautiful, and built with love.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">My Library</Link></li>
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Get Started</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>About</h4>
          <ul className="footer-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#privacy">Privacy</a></li>
            <li><a href="#terms">Terms</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Made with</h4>
          <p className="tech-stack">
            React • TypeScript • .NET<br />
            Framer Motion • SQLite
          </p>
          <p className="footer-tagline">
            Crafted for book lovers ☕️
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {currentYear} Library. All rights reserved.
        </p>
        <p className="built-with-love">
          Built with ❤️ for readers everywhere
        </p>
      </div>
    </footer>
  );
};
