import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useAboutAnimation } from '@/hooks/useAboutAnimation';
import { aboutData } from '@/data/aboutData';

const About = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLParagraphElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  paragraphsRef.current = [];
  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (el && !paragraphsRef.current.includes(el)) {
      paragraphsRef.current.push(el);
    }
  };

  useAboutAnimation(aboutRef, imageRef, contentRef, headingRef, paragraphsRef);

  return (
    <section id="about" className="py-20 bg-white" ref={aboutRef}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-12 mt-10">
          <div className="md:w-1/3" ref={imageRef}>
            <img
              src={aboutData.imageUrl}
              alt="Saswat Ranjan Mohanty"
              className="rounded-lg shadow-lg w-full object-cover aspect-square hover:shadow-2xl transition-all duration-300 image-mask"
            />
          </div>

          <div className="md:w-2/3" ref={contentRef}>
            <h3 className="text-2xl font-semibold mb-4 text-tech-blue animated-underline">
              {aboutData.title}
            </h3>

            {aboutData.intro.map((paragraph, index) => (
              <p
                ref={addToRefs}
                key={index}
                className="text-gray-700 mb-6 paragraph-animation"
              >
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-4 contact-info">
              <div className="flex items-center contact-item">
                <span className="font-semibold mr-2">Location:</span>
                <span className="text-gray-700">{aboutData.location}</span>
              </div>

              <div className="flex items-center contact-item">
                <span className="font-semibold mr-2">Email:</span>
                <a
                  href={`mailto:${aboutData.email}`}
                  className="text-tech-blue hover:underline animated-link"
                >
                  {aboutData.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
