import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useRef, useEffect } from 'react';
import './LandingPage.css';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const featuresGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridElement = featuresGridRef.current;
    if (!gridElement) return;

    let animationFrameId: number;
    let isPaused = false;
    let isResetting = false;
    const scrollSpeed = 0.5;

    const continuousScroll = () => {
      if (!isPaused && !isResetting && gridElement) {
        gridElement.scrollLeft += scrollSpeed;
        
        const maxScroll = gridElement.scrollWidth - gridElement.clientWidth;
        
        if (gridElement.scrollLeft >= maxScroll - 5) {
          // Pause auto-scroll and smoothly reset
          isResetting = true;
          gridElement.scrollTo({ left: 0, behavior: 'smooth' });
          
          // Resume after smooth scroll completes (approx 800ms)
          setTimeout(() => {
            isResetting = false;
          }, 1000);
        }
      }
      
      animationFrameId = requestAnimationFrame(continuousScroll);
    };

    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };
    const handleTouchStart = () => { isPaused = true; };
    const handleTouchEnd = () => { 
      setTimeout(() => { isPaused = false; }, 1000);
    };

    gridElement.addEventListener('mouseenter', handleMouseEnter);
    gridElement.addEventListener('mouseleave', handleMouseLeave);
    gridElement.addEventListener('touchstart', handleTouchStart);
    gridElement.addEventListener('touchend', handleTouchEnd);

    continuousScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      gridElement.removeEventListener('mouseenter', handleMouseEnter);
      gridElement.removeEventListener('mouseleave', handleMouseLeave);
      gridElement.removeEventListener('touchstart', handleTouchStart);
      gridElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Welcome to ...
          </motion.p>

            | Libréum
            < br/>
            <span className="gradient-text">Library Management System.</span>
          </motion.h1>
          
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            “Add books, curate your collection, refine details effortlessly, and manage your entire library experience under one roof.”
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary btn-large">
                Open Dashboard  ☞
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary btn-large">
                  Register
                </Link>
                <Link to="/login" className="btn-secondary btn-large">
                  Sign In
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>

      </section>

      {/* Features Section */}
      <section className="features">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What You Can Do ? <br/> ♞
        </motion.h2>

        <div className="features-grid" ref={featuresGridRef}>
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3>⌘ Create</h3>
            <p>☞ Add a new book record with title, author, and description.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3>⌘ View</h3>
            <p>☞ Browse the list of existing book records.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3>⌘ Update</h3>
            <p>☞ Edit and update the details of an existing book record.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3>⌘ Delete</h3>
            <p>☞ Remove book records that are no longer required.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3>⌘ Search</h3>
            <p>☞ Find books quickly by title, author, or description.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3>⌘ Sort</h3>
            <p>☞ Organize your collection by different criteria.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h3>⌘ Filter</h3>
            <p>☞ View books matching specific requirements.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3>⌘ Manage</h3>
            <p>☞ Keep track of your entire book collection easily.</p>
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
        {isAuthenticated ? (
          <>
            <h2>Your Library Awaits</h2>
            <p>Continue managing your book collection and discover new additions.</p>
            <Link to="/dashboard" className="btn-primary btn-large">
              Go to Dashboard
            </Link>
          </>
        ) : (
          <>
            <h2>Get Started</h2>
            <p>Register or sign in to manage book records.</p>
            <Link to="/register" className="btn-primary btn-large">
              Register
            </Link>
          </>
        )}
      </motion.section>
    </div>
  );
};
