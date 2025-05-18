import { useEffect, useRef, useState } from 'react';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { useTheme } from '@/lib/ThemeContext';
import { sections } from '@/lib/config';

const Index = () => {
  const mainRef = useRef(null);
  const [observerAttached, setObserverAttached] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    console.log("Components loaded:", {
      About: !!About,
      Experience: !!Experience,
      Skills: !!Skills,
      Projects: !!Projects,
      Contact: !!Contact
    });
  }, []);
  
  useEffect(() => {
    if (!observerAttached && typeof IntersectionObserver !== 'undefined') {
      const observerOptions = {
        root: null, // use viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% visible
      };
      
      const handleIntersection = (entries) => {
        entries.forEach(entry => {
          // Use requestAnimationFrame for smoother animation timing
          requestAnimationFrame(() => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              console.log(`Section ${entry.target.id} is now visible`);
            }
          });
        });
      };
      
      const observer = new IntersectionObserver(handleIntersection, observerOptions);
      
      const sectionElements = document.querySelectorAll('.section-reveal');
      console.log(`Found ${sectionElements.length} sections to observe`);
      
      sectionElements.forEach(section => {
        observer.observe(section);
      });
      
      setObserverAttached(true);
      
      return () => {
        sectionElements.forEach(section => {
          observer.unobserve(section);
        });
        observer.disconnect();
      };
    }
  }, [observerAttached]);

  useEffect(() => {
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    const handleAnchorClick = (e) => {
      const target = e.target;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          e.preventDefault();
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerOffset = 50; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            if (!('scrollBehavior' in document.documentElement.style)) {
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            } else {
              targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';

  return (
    <div ref={mainRef} className={`min-h-screen ${bgClass} will-change-auto`}>
      <div id="home">
        <Hero />
      </div>
      
      <div className="section-reveal visible" id={sections.about} style={{ minHeight: '100px' }}>
        <About />
      </div>
      
      <div className="section-reveal visible" id={sections.experience} style={{ minHeight: '100px' }}>
        <Experience />
      </div>
      
      <div className="section-reveal visible" id={sections.skills} style={{ minHeight: '100px' }}>
        <Skills />
      </div>
      
      <div className="section-reveal visible" id={sections.projects} style={{ minHeight: '100px' }}>
        <Projects />
      </div>
      
      <div className="section-reveal visible" id={sections.contact} style={{ minHeight: '100px' }}>
        <Contact />
      </div>
      <div className="section-reveal visible" id={sections.contact} style={{ minHeight: '100px' }}>
      <Footer />
      </div>
    </div>
  );
};

export default Index;