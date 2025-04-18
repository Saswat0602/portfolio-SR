import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  isTransitioning: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('color-theme');
      if (storedPrefs) {
        return storedPrefs as Theme;
      }

      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
        return 'dark';
      }
    }
    return 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Update the data-theme attribute on HTML element with transition
  const updateTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    
    // Start transition
    setIsTransitioning(true);
    
    // Add transition classes if not already present
    if (!root.classList.contains('transition-colors')) {
      root.classList.add('transition-colors', 'duration-500');
    }
    
    // Set new theme
    root.setAttribute('data-theme', newTheme);
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    
    localStorage.setItem('color-theme', newTheme);
    
    // End transition after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Match this with the duration class (duration-500)
  };

  // Update theme when the component mounts
  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    if (!isTransitioning) {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }
  };

  const value = {
    theme,
    toggleTheme,
    isTransitioning,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContext; 