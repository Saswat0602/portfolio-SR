import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { colors } from '@/lib/config';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        // Make progress increments smoother and more natural
        const increment = Math.max(5, Math.min(15, 100 - prev) * 0.15);
        const newProgress = prev + increment;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          // Give a little delay before completion for a smoother experience
          setTimeout(() => {
            onLoadComplete();
          }, 600);
          return 100;
        }
        
        return newProgress;
      });
    }, 180); // Slightly faster than before

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  const bgColor = isDark ? colors.theme.dark.background : colors.theme.light.background;
  const textColor = isDark ? colors.theme.dark.text : colors.theme.light.text;

  // Animation for the loader circle
  const circleVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: { 
      rotate: 360, 
      scale: [1, 1.1, 1],
      transition: { 
        rotate: { duration: 1.5, ease: "linear", repeat: Infinity },
        scale: { duration: 2, ease: "easeInOut", repeat: Infinity }
      }
    }
  };

  // Animation for the inner circles
  const innerCircleVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    animate: { 
      scale: [0.8, 1.1, 0.8],
      opacity: [0.5, 0.8, 0.5],
      transition: { 
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };

  // Animation for progress text
  const textVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <m.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center hardware-accelerated"
      style={{ backgroundColor: bgColor, color: textColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5, ease: 'easeInOut' }
      }}
    >
      <div className="w-72 flex flex-col items-center">
        <m.div 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-tech-blue">Saswat</span>
          <span>.dev</span>
        </m.div>
        
        {/* Animated G-Loader */}
        <m.div 
          className="relative w-24 h-24 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Outer circle */}
          <m.div 
            className="absolute inset-0 rounded-full border-4 border-tech-blue border-t-transparent"
            variants={circleVariants}
            initial="initial"
            animate="animate"
          />
          
          {/* Middle circle */}
          <m.div 
            className="absolute inset-4 rounded-full border-2 border-tech-purple border-b-transparent"
            variants={circleVariants}
            initial="initial"
            animate="animate"
            custom={1}
          />
          
          {/* Inner circle */}
          <m.div 
            className="absolute inset-8 rounded-full bg-gradient-to-br from-tech-blue to-tech-purple"
            variants={innerCircleVariants}
            initial="initial"
            animate="animate"
          />
        </m.div>
        
        {/* Progress text with smooth transition */}
        <m.div
          key={Math.round(progress)} // Force re-render for a cleaner animation
          variants={textVariants}
          initial="initial"
          animate="animate"
          className={`mb-1 text-2xl font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}
        >
          {Math.round(progress)}%
        </m.div>
        
        <m.div 
          className="text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.3 }}
        >
          {progress < 30 ? "Initializing..." : 
           progress < 60 ? "Loading components..." : 
           progress < 90 ? "Almost there..." : 
           "Ready!"}
        </m.div>
      </div>
    </m.div>
  );
};

export default LoadingScreen; 