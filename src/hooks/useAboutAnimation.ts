// hooks/useAboutAnimation.ts
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useAboutAnimation = (
  aboutRef: React.RefObject<HTMLElement>,
  imageRef: React.RefObject<HTMLDivElement>,
  contentRef: React.RefObject<HTMLDivElement>,
  headingRef: React.RefObject<HTMLHeadingElement>,
  paragraphsRef: React.MutableRefObject<HTMLParagraphElement[]>
) => {
  useEffect(() => {
    const aboutSection = aboutRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const heading = headingRef.current;
    const paragraphs = paragraphsRef.current;

    if (!aboutSection || !image || !content || !heading) return;

    gsap.set(image, { opacity: 0, x: -50, transformOrigin: "center" });
    gsap.set(heading, { opacity: 0, y: 20 });
    gsap.set(paragraphs, { opacity: 0, y: 30 });
    gsap.set(content.querySelector('.contact-info'), { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
        start: "top 60%",
      }
    });

    tl.to(image, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power3.out"
    })
      .to(heading, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.5)"
      }, "-=0.8")
      .to(paragraphs, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8
      }, "-=0.4")
      .to(content.querySelector('.contact-info'), {
        opacity: 1,
        duration: 0.6
      }, "-=0.4");

    const imgEl = image.querySelector('img');
    const onEnter = () => {
      gsap.to(imgEl, {
        scale: 1.05,
        duration: 0.4,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
        filter: "brightness(1.05)",
        ease: "power1.out"
      });
    };

    const onLeave = () => {
      gsap.to(imgEl, {
        scale: 1,
        duration: 0.4,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        filter: "brightness(1)",
        ease: "power1.out"
      });
    };

    image.addEventListener('mouseenter', onEnter);
    image.addEventListener('mouseleave', onLeave);

    paragraphs.forEach((paragraph, index) => {
      gsap.to(paragraph, {
        scrollTrigger: {
          trigger: paragraph,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        backgroundColor: "rgba(37, 99, 235, 0.05)",
        paddingLeft: "10px",
        borderLeft: "3px solid #2563eb",
        duration: 0.3,
        delay: index * 0.1
      });
    });

    return () => {
      tl.kill();
      image.removeEventListener('mouseenter', onEnter);
      image.removeEventListener('mouseleave', onLeave);
    };
  }, []);
};
