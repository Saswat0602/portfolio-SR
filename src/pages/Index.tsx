import { useRef, useEffect, useState } from 'react';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { useTheme } from '@/lib/ThemeContext';
import { sections } from '@/lib/config';

// Setup intersection observer once at module level
let observer;
if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
}

// Mobile-optimized component wrapper
const MobileOptimizedSection = ({ children, isMobile, id, className = '' }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current && observer) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <div 
      ref={sectionRef} 
      id={id}
      className={`section-reveal ${isMobile ? 'mobile-optimize' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

const Index = () => {
  const mainRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Apply dark/light mode through CSS variables for better performance
  const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';

  return (
    <div ref={mainRef} className={`min-h-screen ${bgClass} will-change-auto`}>
      <MobileOptimizedSection isMobile={isMobile} id="home">
        <Hero />
      </MobileOptimizedSection>
      
      <MobileOptimizedSection isMobile={isMobile} id={sections.about}>
        <About />
      </MobileOptimizedSection>
      
      <MobileOptimizedSection isMobile={isMobile} id={sections.experience}>
        <Experience />
      </MobileOptimizedSection>
      
      <MobileOptimizedSection isMobile={isMobile} id={sections.skills}>
        <Skills />
      </MobileOptimizedSection>
      
      <MobileOptimizedSection isMobile={isMobile} id={sections.projects}>
        <Projects />
      </MobileOptimizedSection>
      
      <MobileOptimizedSection isMobile={isMobile} id={sections.contact}>
        <Contact />
      </MobileOptimizedSection>
      
      <MobileOptimizedSection isMobile={isMobile} id="footer">
        <Footer />
      </MobileOptimizedSection>
    </div>
  );
};

// Add mobile-specific styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .mobile-optimize {
        transform: none !important;
      }
      .mobile-optimize * {
        transform: none !important;
        transition: none !important;
        animation: none !important;
      }
      .section-reveal {
        opacity: 1 !important;
        transform: none !important;
      }
      .section-reveal.visible {
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Index;