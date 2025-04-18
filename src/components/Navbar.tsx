import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { animations, colors, sections } from '@/lib/config';
import { m, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // Handle scroll effect with throttling for performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          
          // Determine which section is currently in view
          const sections = document.querySelectorAll('section[id]');
          let currentSectionId = 'home';
          
          sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.getBoundingClientRect().height;
            
            // If the section is in the viewport (with some offset for the navbar)
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
              currentSectionId = section.id;
            }
          });
          
          setActiveSection(currentSectionId);
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

  // Update active section based on URL hash when the page loads
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
    } else if (location.pathname === '/') {
      setActiveSection('home');
    }
  }, [location]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Handle smooth scrolling to section
  const scrollToSection = useCallback((path: string) => {
    // Close mobile menu if open
    setIsOpen(false);
    
    // Extract the section ID from the path
    const sectionId = path.split('#')[1];
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/' && path.startsWith('/#')) {
      navigate('/');
      // Allow time for page to load before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Update URL without refreshing page
          window.history.pushState(null, '', `#${sectionId}`);
          setActiveSection(sectionId);
        }
      }, 100);
    } else if (sectionId) {
      // If we're already on the right page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Update URL without refreshing page
        window.history.pushState(null, '', `#${sectionId}`);
        setActiveSection(sectionId);
      }
    } else {
      // Regular navigation for non-anchor links
      navigate(path);
    }
  }, [location.pathname, navigate]);

  const navbarClasses = `sticky top-0 z-50 ${animations.navbarTransition} 
    ${scrolled ? 'shadow-md py-3' : 'py-4'} 
    ${isDark 
      ? 'bg-gray-900/90 text-white backdrop-blur-md border-b border-gray-800' 
      : 'bg-white/90 text-gray-800 backdrop-blur-md border-b border-gray-100'
    }`;

  const navLinks = [
    { path: "/#home", label: "Home", id: "home" },
    { path: "/#about", label: "About", id: "about" },
    { path: "/#experience", label: "Experience", id: "experience" },
    { path: "/#skills", label: "Skills", id: "skills" },
    { path: "/#projects", label: "Projects", id: "projects" },
    { path: "/#contact", label: "Contact", id: "contact" },
    { path: "/playground", label: "Playground", id: "playground" }
  ];

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
            <a 
              href="/#home" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("/#home");
              }}
              className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Saswat<span className="text-tech-blue">.dev</span>
            </a>
          </m.div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <m.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`${animations.performant.transform} relative`}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href={link.path} 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.path);
                  }}
                  className={`${animations.navbarTransition} hover:text-tech-blue block py-1 ${
                    (activeSection === link.id) ||
                    (link.path === "/playground" && location.pathname === "/playground")
                      ? "text-tech-blue font-medium"
                      : isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {link.label}
                  
                  {/* Animated underline indicator for active section */}
                  <AnimatePresence>
                    {(activeSection === link.id || 
                      (link.path === "/playground" && location.pathname === "/playground")) && (
                      <m.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '100%', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 h-0.5 bg-tech-blue"
                      />
                    )}
                  </AnimatePresence>
                </a>
              </m.div>
            ))}
            
            {/* Theme Toggle Button */}
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className={animations.performant.transform}
              whileTap={{ scale: 0.9, rotate: 180 }}
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
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("/#contact");
                }}
              >
                <Button className="bg-tech-blue hover:bg-tech-purple text-white transition-colors duration-300">
                  Contact Me
                </Button>
              </a>
            </m.div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <m.div whileTap={{ scale: 0.9, rotate: 180 }}>
              <Button 
                variant="ghost"
                size="icon" 
                onClick={toggleTheme}
                className={`rounded-full ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </m.div>
            
            {/* Mobile Menu Button */}
            <m.div whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </m.div>
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
                  className={`${animations.performant.transform} relative`}
                  whileTap={{ scale: 0.95, x: 5 }}
                >
                  <a 
                    href={link.path} 
                    className={`${animations.navbarTransition} py-2 block hover:text-tech-blue ${
                      (activeSection === link.id) ||
                      (link.path === "/playground" && location.pathname === "/playground")
                        ? "text-tech-blue font-medium"
                        : isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.path);
                    }}
                  >
                    {link.label}
                    
                    {/* Animated indicator for active section in mobile menu */}
                    {(activeSection === link.id || 
                      (link.path === "/playground" && location.pathname === "/playground")) && (
                      <m.div
                        initial={{ width: 0 }}
                        animate={{ width: '3px' }}
                        className="absolute left-0 top-0 h-full bg-tech-blue rounded-r"
                      />
                    )}
                  </a>
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                className={animations.performant.transform}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="/#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("/#contact");
                  }}
                >
                  <Button className="bg-tech-blue hover:bg-tech-purple text-white w-full transition-colors duration-300">
                    Contact Me
                  </Button>
                </a>
              </m.div>
            </div>
          </m.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
