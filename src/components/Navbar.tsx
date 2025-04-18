import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { animations, colors, sections } from '@/lib/config';
import { m } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // Handle scroll effect with throttling for performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const navbarClasses = `sticky top-0 z-50 ${animations.navbarTransition} 
    ${scrolled ? 'shadow-md py-3' : 'py-4'} 
    ${isDark 
      ? 'bg-gray-900/90 text-white backdrop-blur-md border-b border-gray-800' 
      : 'bg-white/90 text-gray-800 backdrop-blur-md border-b border-gray-100'
    }`;

  const navLinks = [
    { path: "/#home", label: "Home" },
    { path: "/#about", label: "About" },
    { path: "/#experience", label: "Experience" },
    { path: "/#skills", label: "Skills" },
    { path: "/#projects", label: "Projects" },
    { path: "/#contact", label: "Contact" },
    { path: "/playground", label: "Playground" }
  ];

  // Get current section from URL hash
  const currentSection = location.hash.replace('#', '') || 'home';

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={animations.performant.transform}
          >
            <Link to="/" className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Saswat<span className="text-tech-blue">.dev</span>
            </Link>
          </m.div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <m.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={animations.performant.transform}
              >
                <Link 
                  to={link.path} 
                  className={`${animations.navbarTransition} hover:text-tech-blue ${
                    (link.path.includes(currentSection) && currentSection !== 'home') || 
                    (link.path === "/#home" && currentSection === 'home') ||
                    (link.path === "/playground" && location.pathname === "/playground")
                      ? "text-tech-blue font-medium"
                      : isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              </m.div>
            ))}
            
            {/* Theme Toggle Button */}
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className={animations.performant.transform}
            >
              <Button 
                variant="ghost"
                size="icon" 
                onClick={toggleTheme}
                className={`rounded-full ${isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </m.div>
            
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className={animations.performant.transform}
            >
              <Link to="/#contact">
                <Button className="bg-tech-blue hover:bg-tech-purple text-white transition-colors duration-300">
                  Contact Me
                </Button>
              </Link>
            </m.div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <Button 
              variant="ghost"
              size="icon" 
              onClick={toggleTheme}
              className={`rounded-full ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {isOpen && (
          <m.div 
            className="md:hidden pt-4 pb-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <m.div
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={animations.performant.transform}
                >
                  <Link 
                    to={link.path} 
                    className={`${animations.navbarTransition} py-2 block hover:text-tech-blue ${
                      (link.path.includes(currentSection) && currentSection !== 'home') || 
                      (link.path === "/#home" && currentSection === 'home') ||
                      (link.path === "/playground" && location.pathname === "/playground")
                        ? "text-tech-blue font-medium"
                        : isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                className={animations.performant.transform}
              >
                <Link to="/#contact" onClick={() => setIsOpen(false)}>
                  <Button className="bg-tech-blue hover:bg-tech-purple text-white w-full transition-colors duration-300">
                    Contact Me
                  </Button>
                </Link>
              </m.div>
            </div>
          </m.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
