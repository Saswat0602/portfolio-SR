import { useState, useEffect } from 'react';

/**
 * Custom hook to track mouse position with performance optimization
 * @param {number} delay - Throttle delay in milliseconds (default: 50)
 * @returns {Object} - { x, y } normalized mouse coordinates (-1 to 1)
 */
const useMousePosition = (delay = 50) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    let timeoutId = null;
    let lastUpdate = 0;
    
    // Throttled mouse move handler to improve performance
    const handleMouseMove = (event) => {
      const now = Date.now();
      
      // Only update if enough time has passed since last update
      if (now - lastUpdate > delay) {
        lastUpdate = now;
        
        // Calculate normalized position (-1 to 1)
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;
        
        setMousePosition({ x, y });
      }
    };
    
    // Add passive event listener for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay]);
  
  return mousePosition;
};

export default useMousePosition;