import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import { technologies } from '@/data/hero';

// Register plugins
gsap.registerPlugin(TextPlugin, ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const typingRef = useRef(null);
  const particlesRef = useRef(null);
  const techItemsRef = useRef(null);

  useEffect(() => {
    // Create animation after component has mounted
    const setupAnimation = () => {
      const hero = heroRef.current;
      const text = textRef.current;
      const buttons = buttonsRef.current;
      const typing = typingRef.current;

      if (!hero || !text || !buttons || !typing) return;

      // Create floating tech items with random movement
      if (techItemsRef.current) {
        // Clear any existing tech items
        techItemsRef.current.innerHTML = '';
        
        // Create new tech items with random movement animations
        for (let i = 0; i < 20; i++) {
          const randomTech = technologies[Math.floor(Math.random() * technologies.length)];
          const techItem = document.createElement('div');
          techItem.classList.add('tech-item');
          
          // Create icon and text as separate elements for styling
          const iconSpan = document.createElement('span');
          iconSpan.classList.add('tech-icon');
          iconSpan.textContent = randomTech.icon;
          
          const textSpan = document.createElement('span');
          textSpan.classList.add('tech-name');
          textSpan.textContent = randomTech.name;
          
          techItem.appendChild(iconSpan);
          techItem.appendChild(textSpan);
          
          // Random initial positioning
          const xPos = Math.random() * 90 + 5; // 5-95%
          const yPos = Math.random() * 90 + 5; // 5-95%
          
          techItem.style.left = `${xPos}%`;
          techItem.style.top = `${yPos}%`;
          
          // Random opacity between 0.2 and 0.7
          techItem.style.opacity = `${Math.random() * 0.5 + 0.2}`;
          
          techItemsRef.current.appendChild(techItem);
          
          // Create random floating movement
          createRandomMovement(techItem);
        }
      }

      // Function to create random movement for tech items
      function createRandomMovement(element) {
        // Initial position
        const startX = parseFloat(element.style.left);
        const startY = parseFloat(element.style.top);
        
        // Create timeline for continuous random movement
        const movementTimeline = gsap.timeline({
          repeat: -1,
          yoyo: false,
          onRepeat: () => {
            // Reset to a new random position on repeat to avoid predictable patterns
            movementTimeline.clear();
            
            // New random position within reasonable bounds from start position
            const randomX = startX + (Math.random() * 20 - 10); // ±10% from start
            const randomY = startY + (Math.random() * 20 - 10); // ±10% from start
            
            // Constrain to visible area
            const boundedX = Math.max(5, Math.min(95, randomX));
            const boundedY = Math.max(5, Math.min(95, randomY));
            
            // Random duration between 10-20 seconds
            const duration = Math.random() * 10 + 10;
            
            // Add new movement
            movementTimeline.to(element, {
              left: `${boundedX}%`,
              top: `${boundedY}%`,
              duration: duration,
              ease: "sine.inOut"
            });
          }
        });
        
        // Initial movement target (first random position)
        const initialX = startX + (Math.random() * 20 - 10);
        const initialY = startY + (Math.random() * 20 - 10);
        const boundedX = Math.max(5, Math.min(95, initialX));
        const boundedY = Math.max(5, Math.min(95, initialY));
        
        // Add initial movement with random duration
        movementTimeline.to(element, {
          left: `${boundedX}%`,
          top: `${boundedY}%`,
          duration: Math.random() * 10 + 10,
          ease: "sine.inOut"
        });
        
        // Add subtle scale and rotation animation
        gsap.to(element, {
          scale: `random(0.8, 1.2)`,
          rotation: `random(-15, 15)`,
          duration: Math.random() * 5 + 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        
        // Add subtle blur animation
        gsap.to(element, {
          filter: `blur(${Math.random() * 2}px)`,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Create particles for background effect
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

      // Main timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(hero, {
        duration: 1.2,
        opacity: 0,
        scale: 1.1,
      })
        .from(text.children[0], {
          duration: 0.8,
          opacity: 0,
          y: 50,
          delay: -0.8
        })
        .from(text.children[1], {
          duration: 0.8,
          opacity: 0,
          y: 50,
          delay: -0.6
        })
        .from(text.children[2], {
          duration: 0.8,
          opacity: 0,
          y: 50,
          delay: -0.4
        })
        .to(typing, {
          duration: 2,
          text: { value: "Software Development Engineer I" },
          ease: "none",
          delay: -0.2
        })
        .from(buttons.children, {
          duration: 0.6,
          opacity: 0,
          y: 20,
          stagger: 0.2,
          delay: -0.4
        });

      // Setup parallax effect with ScrollTrigger
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

      // Continuous subtle animation for the background
      gsap.to(hero, {
        backgroundPosition: '100% 100%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setupAnimation();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] bg-hero-pattern bg-cover bg-center flex items-center overflow-hidden">
      <div ref={particlesRef} className="particles-container absolute inset-0 z-0"></div>
      <div ref={techItemsRef} className="tech-container absolute inset-0 z-[1] overflow-hidden"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 to-dark/70 z-[2]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-start max-w-3xl">
          <div ref={textRef} className="mb-6">
            <h2 className="text-tech-blue text-xl md:text-2xl font-medium mb-2">
              Hello, I'm
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 gsap-reveal glowing-text">
              Saswat Ranjan Mohanty
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90 flex">
              <span ref={typingRef} className="typing-cursor"></span>
            </h2>
          </div>

          <p className="text-white/80 text-lg max-w-2xl mb-8 split-text">
            I am a dedicated SDE 1 at HyScaler, where I develop modern applications using React, React Native, and Node.js. Passionate about technology and innovation, I strive to create impactful solutions that deliver exceptional user experiences.
          </p>

          <div ref={buttonsRef} className="flex flex-wrap gap-4 mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-tech-blue hover:bg-tech-purple text-white btn-glow">
                View My Work
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 btn-outline-glow">
                Download CV
              </Button>
            </motion.div>
          </div>

          <motion.a
            href="#about"
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80 hover:text-white transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="mb-2 text-sm">Scroll Down</span>
            <ArrowDown className="animate-bounce" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;