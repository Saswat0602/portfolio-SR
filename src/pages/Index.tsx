import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { useTheme } from '@/lib/ThemeContext';
import { sections } from '@/lib/config';

// Register GSAP plugins (only free ones)
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Setup ScrollTrigger for section animations with better performance
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    
    // Improved animation initialization with better timing
    const initAnimations = () => {
      // Batch all GSAP operations in a single context for better performance
      ctx = gsap.context(() => {
        const sectionRevealElements = document.querySelectorAll('.section-reveal');
        
        sectionRevealElements.forEach((section, index) => {
          // Reduce the stagger delay to improve overall performance
          setTimeout(() => {
            ScrollTrigger.create({
              trigger: section,
              start: 'top 85%', // Start slightly earlier for better perception
              end: 'bottom 20%',
              toggleActions: 'play none none none',
              onEnter: () => {
                // Use requestAnimationFrame for smoother animations
                requestAnimationFrame(() => {
                  // Add class to mark that GSAP is controlling this animation
                  section.classList.add('gsap-animated');
                  
                  gsap.to(section, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power2.out',
                    overwrite: 'auto', // Prevent animation conflicts
                    clearProps: 'transform', // Better performance after animation
                    onComplete: () => {
                      // Keep the gsap-animated class while in view
                    }
                  });
                });
              },
              onLeaveBack: () => {
                requestAnimationFrame(() => {
                  // Add class to mark that GSAP is controlling this animation
                  section.classList.add('gsap-animated');
                  
                  gsap.to(section, {
                    opacity: 0.6,
                    y: 40, // Slightly reduced distance for better UX
                    duration: 0.7,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                });
              },
            });
          }, index * 30); // Reduced stagger time
        });
      }, mainRef);
    }
    
    // Initialize animations with a very short delay for better DOM readiness
    const timeoutId = setTimeout(initAnimations, 50);
    
    return () => {
      clearTimeout(timeoutId);
      if (ctx) ctx.revert(); // Clean up GSAP context
      
      // Kill all ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add enhanced smooth scrolling class to HTML element
  useEffect(() => {
    // Apply enhanced smooth scroll class to document element
    document.documentElement.classList.add('enhanced-smooth-scroll');
    
    // Implement fallback scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // Use GSAP for smooth scrolling (compatible with all browsers)
            gsap.to(window, {
              duration: 0.8,
              scrollTo: {
                y: targetElement,
                offsetY: 50 // Add some offset to account for fixed headers
              },
              ease: 'power2.inOut'
            });
          }
        }
      }
    };
    
    // Add event listener for anchor clicks
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      // Cleanup
      document.documentElement.classList.remove('enhanced-smooth-scroll');
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';

  return (
    <div ref={mainRef} className={`min-h-screen ${bgClass} hardware-accelerated`}>
      <div id="home">
        <Hero />
      </div>
      
      <div className="section-reveal opacity-0 translate-y-12" id={sections.about}>
        <About />
      </div>
      
      <div className="section-reveal opacity-0 translate-y-12" id={sections.experience}>
        <Experience />
      </div>
      
      <div className="section-reveal opacity-0 translate-y-12" id={sections.skills}>
        <Skills />
      </div>
      
      <div className="section-reveal opacity-0 translate-y-12" id={sections.projects}>
        <Projects />
      </div>
      
      <div className="section-reveal opacity-0 translate-y-12" id={sections.contact}>
        <Contact />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
