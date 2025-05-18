import React, { lazy, Suspense } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { m } from 'framer-motion';
import '@/styles/hero.css';
import { useTheme } from '@/lib/ThemeContext';

const GalaxyScene = lazy(() => import('@/components/GalaxyScene'));

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section
      className={`relative min-h-[90vh] flex items-center overflow-hidden ${!isDark && 'bg-gray-100'}`}
    >
      {isDark && (
        <Suspense fallback={<div className="absolute inset-0 "></div>}>
          <div className="absolute inset-0 z-0">
            <GalaxyScene />
          </div>
        </Suspense>
      )}

      <div className="particles-container absolute inset-0 z-1 overflow-hidden"></div>



      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-start max-w-3xl">
          <m.div
            className="mb-6"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <m.h2
              className="text-tech-blue text-xl md:text-2xl font-medium mb-2"
              variants={textVariants}
            >
              Hello, I'm
            </m.h2>
            <m.h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 ${isDark ? 'glowing-text' : ''}`}
              variants={textVariants}
            >
              Saswat Ranjan Mohanty
            </m.h1>
            <m.h2
              className={`text-2xl md:text-3xl font-semibold ${isDark ? 'text-white/90' : 'text-gray-800'} flex`}
              variants={textVariants}
            >
              <span className="css-typing">Software Development Engineer I</span>
            </m.h2>
          </m.div>

          <m.div
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              className="bg-tech-blue hover:bg-tech-purple text-white btn-glow"
              onClick={() => {
                const target = document.getElementById('projects');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </Button>

            <Button
              variant={isDark ? "outline" : "secondary"}
              className={isDark
                ? "bg-transparent border-white text-white hover:bg-white/10"
                : "text-gray-900 hover:bg-gray-200/80"}
            >
              Download CV
            </Button>
          </m.div>

          <a
            href="#about"
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center ${
              isDark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-gray-900'
            } transition-colors animate-fade-in`}
          >
            <span className="mb-2 text-sm">Scroll Down</span>
            <ArrowDown className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;