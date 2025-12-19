import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = 'Search books...' }: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <motion.div
      className="search-bar"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <span className="search-icon">🔍</span>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      {localValue && (
        <motion.button
          className="search-clear"
          onClick={() => setLocalValue('')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          ×
        </motion.button>
      )}
    </motion.div>
  );
};
