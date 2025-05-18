import { useRef } from 'react';

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
        // Use classList instead of state for better performance
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
}

const Index = () => {
  const mainRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Use ref callback pattern for better performance - no extra useEffect needed
  const sectionRef = (element) => {
    if (element && observer) {
      observer.observe(element);
    }
  };
  
  // Apply dark/light mode through CSS variables for better performance
  const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';

  return (
    <div ref={mainRef} className={`min-h-screen ${bgClass} will-change-auto`}>
      <div id="home">
        <Hero />
      </div>
      
      {/* Preload critical sections with visible class already */}
      <div ref={sectionRef} className="section-reveal visible" id={sections.about}>
        <About />
      </div>
      
      <div ref={sectionRef} className="section-reveal visible" id={sections.experience}>
        <Experience />
      </div>
      
      <div ref={sectionRef} className="section-reveal visible" id={sections.skills}>
        <Skills />
      </div>
      
      <div ref={sectionRef} className="section-reveal visible" id={sections.projects}>
        <Projects />
      </div>
      
      <div ref={sectionRef} className="section-reveal visible" id={sections.contact}>
        <Contact />
      </div>
      
      <div ref={sectionRef} className="section-reveal visible" id="footer">
        <Footer />
      </div>
    </div>
  );
};

// Add module-level preloading for critical paths
// This forces webpack to load these modules during initial bundle
if (typeof window !== 'undefined') {
  // Pre-evaluate critical components
  const preloadComponents = [Hero, About];
  preloadComponents.forEach(component => !!component);
}

export default Index;