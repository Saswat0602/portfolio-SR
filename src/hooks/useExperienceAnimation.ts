// hooks/useExperienceAnimation.ts
import { useEffect } from 'react';
import gsap from 'gsap';

export const useExperienceAnimation = () => {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.timeline-item', {
      duration: 1.5,
      opacity: 0,
      y: 50,
      stagger: 0.3,
      delay: 0.2,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return {};
};
