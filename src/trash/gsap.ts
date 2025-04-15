useEffect(() => {
    // Add smooth scroll behavior for anchor links
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetElement,
              offsetY: 80
            },
            ease: "power3.inOut"
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Page load animation
    const tl = gsap.timeline();
    tl.from("nav", { y: -100, opacity: 0, duration: 1, ease: "power3.out" });

    // Initialize GSAP animations
    const sections = gsap.utils.toArray('.section-reveal');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section as Element,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Add a cursor follower effect for a modern touch
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-follower');
    document.body.appendChild(cursor);
    
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "none"
      });
    };
    
    window.addEventListener('mousemove', moveCursor);

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);