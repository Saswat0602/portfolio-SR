// Hero.tsx
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { m } from 'framer-motion';
import '@/styles/hero.css';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import GalaxyScene from '@/components/GalaxyScene';
import { useTheme } from '@/lib/ThemeContext';

const Hero = () => {
  const {
    heroRef,
    textRef,
    buttonsRef,
    typingRef,
    particlesRef,
    cursorRef
  } = useHeroAnimation();

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      ref={heroRef}
      className={`relative min-h-[90vh] flex items-center overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      {/* Only show galaxy in dark mode */}
      {isDark && <GalaxyScene />}

      <div ref={particlesRef} className="particles-container absolute inset-0 z-0"></div>
      <div ref={cursorRef} className="custom-cursor z-[100] pointer-events-none"></div>
      
      {/* Theme-specific overlay */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-r from-gray-900/90 to-gray-800/70' 
          : 'bg-gradient-to-r from-blue-50/70 to-white/80'
      } z-[2]`}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-start max-w-3xl">
          <div ref={textRef} className="mb-6">
            <h2 className="text-tech-blue text-xl md:text-2xl font-medium mb-2">
              Hello, I'm
            </h2>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 gsap-reveal ${isDark ? 'glowing-text' : ''}`}>
              Saswat Ranjan Mohanty
            </h1>
            <h2 className={`text-2xl md:text-3xl font-semibold ${isDark ? 'text-white/90' : 'text-gray-800'} flex`}>
              <span ref={typingRef} className="typing-cursor"></span>
            </h2>
          </div>

          <p className={`${isDark ? 'text-white/80' : 'text-gray-700'} text-lg max-w-2xl mb-8 split-text`}>
            I am a dedicated SDE 1 at HyScaler, where I develop modern applications using React, React Native, and Node.js. Passionate about technology and innovation, I strive to create impactful solutions that deliver exceptional user experiences.
          </p>

          <div ref={buttonsRef} className="flex flex-wrap gap-4 mb-12">
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-tech-blue hover:bg-tech-purple text-white btn-glow"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </Button>
            </m.div>
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant={isDark ? "outline" : "secondary"}
                className={isDark 
                  ? "bg-transparent border-white text-white hover:bg-white/10 btn-outline-glow" 
                  : "text-gray-900 hover:bg-gray-200/80"}
              >
                Download CV
              </Button>
            </m.div>
          </div>

          <m.a
            href="#about"
            className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center ${
              isDark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-gray-900'
            } transition-colors`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="mb-2 text-sm">Scroll Down</span>
            <ArrowDown className="animate-bounce" />
          </m.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
