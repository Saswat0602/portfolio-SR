import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { technologies } from '@/data/hero';

// Register plugins
gsap.registerPlugin(TextPlugin, ScrollTrigger);

export const useHeroAnimation = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const typingRef = useRef(null);
  const particlesRef = useRef(null);
  const techItemsRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const setupAnimation = () => {
      const hero = heroRef.current;
      const text = textRef.current;
      const buttons = buttonsRef.current;
      const typing = typingRef.current;

      if (!hero || !text || !buttons || !typing) return;

      setupFloatingTechItems();
      setupParticles();
      setupTextAnimation();
      setupScrollTrigger();

      // Cursor follow
      if (cursorRef.current) {
        const cursor = cursorRef.current;
        const moveCursor = (e: MouseEvent) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.2,
            ease: "power2.out",
          });
        };
        window.addEventListener("mousemove", moveCursor);

        return () => {
          window.removeEventListener("mousemove", moveCursor);
        };
      }
    };

    const timer = setTimeout(setupAnimation, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const setupFloatingTechItems = () => {
    if (techItemsRef.current) {
      techItemsRef.current.innerHTML = '';

      for (let i = 0; i < 20; i++) {
        const randomTech = technologies[Math.floor(Math.random() * technologies.length)];
        const techItem = document.createElement('div');
        techItem.classList.add('tech-item');

        const iconSpan = document.createElement('span');
        iconSpan.classList.add('tech-icon');
        iconSpan.textContent = randomTech.icon;

        const textSpan = document.createElement('span');
        textSpan.classList.add('tech-name');
        textSpan.textContent = randomTech.name;

        techItem.appendChild(iconSpan);
        techItem.appendChild(textSpan);

        const xPos = Math.random() * 90 + 5;
        const yPos = Math.random() * 90 + 5;

        techItem.style.left = `${xPos}%`;
        techItem.style.top = `${yPos}%`;
        techItem.style.opacity = `${Math.random() * 0.5 + 0.2}`;

        techItemsRef.current.appendChild(techItem);
        createRandomMovement(techItem);
      }
    }
  };

  const createRandomMovement = (element: HTMLElement) => {
    const startX = parseFloat(element.style.left);
    const startY = parseFloat(element.style.top);

    const movementTimeline = gsap.timeline({
      repeat: -1,
      yoyo: false,
      onRepeat: () => {
        movementTimeline.clear();
        const randomX = startX + (Math.random() * 20 - 10);
        const randomY = startY + (Math.random() * 20 - 10);

        const boundedX = Math.max(5, Math.min(95, randomX));
        const boundedY = Math.max(5, Math.min(95, randomY));

        const duration = Math.random() * 10 + 10;

        movementTimeline.to(element, {
          left: `${boundedX}%`,
          top: `${boundedY}%`,
          duration: duration,
          ease: "sine.inOut"
        });
      }
    });

    const initialX = startX + (Math.random() * 20 - 10);
    const initialY = startY + (Math.random() * 20 - 10);
    const boundedX = Math.max(5, Math.min(95, initialX));
    const boundedY = Math.max(5, Math.min(95, initialY));

    movementTimeline.to(element, {
      left: `${boundedX}%`,
      top: `${boundedY}%`,
      duration: Math.random() * 10 + 10,
      ease: "sine.inOut"
    });

    gsap.to(element, {
      scale: `random(0.8, 1.2)`,
      rotation: `random(-15, 15)`,
      duration: Math.random() * 5 + 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(element, {
      filter: `blur(${Math.random() * 2}px)`,
      duration: Math.random() * 3 + 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  };

  const setupParticles = () => {
    if (particlesRef.current) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesRef.current.appendChild(particle);
      }
    }
  };

  const setupTextAnimation = () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(heroRef.current, { duration: 1.2, opacity: 0, scale: 1.1 })
      .from(textRef.current?.children[0], { duration: 0.8, opacity: 0, y: 50, delay: -0.8 })
      .from(textRef.current?.children[1], { duration: 0.8, opacity: 0, y: 50, delay: -0.6 })
      .from(textRef.current?.children[2], { duration: 0.8, opacity: 0, y: 50, delay: -0.4 })
      .to(typingRef.current, {
        duration: 2,
        text: { value: "Software Development Engineer I" },
        ease: "none",
        delay: -0.2
      })
      .from(buttonsRef.current?.children, {
        duration: 0.6,
        opacity: 0,
        y: 20,
        stagger: 0.2,
        delay: -0.4
      });
  };

  const setupScrollTrigger = () => {
    const hero = heroRef.current;

    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        gsap.to(hero, {
          backgroundPosition: `50% ${window.innerHeight / 2 * self.progress}px`,
          ease: "none",
          overwrite: "auto"
        });
      }
    });

    gsap.to(hero, {
      backgroundPosition: '100% 100%',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "none"
    });
  };

  return {
    heroRef,
    textRef,
    buttonsRef,
    typingRef,
    particlesRef,
    techItemsRef,
    cursorRef
  };
};
