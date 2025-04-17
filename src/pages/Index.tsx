
import  { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';
// import Skills from '@/components/Skills';
// import Projects from '@/components/Projects';
// import Certifications from '@/components/Certifications';
// import Contact from '@/components/Contact';
// import Footer from '@/components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);



  return (
    <div ref={mainRef} className="min-h-screen">
      <Navbar />
      <Hero/>
      <div className="section-reveal">
        <About />
      </div>
      <div className="section-reveal">
        <Experience />
      </div>
     {/*  <div className="section-reveal">
        <Skills />
      </div>
      <div className="section-reveal">
        <Projects />
      </div>
      <div className="section-reveal">
        <Certifications />
      </div>
      <div className="section-reveal">
        <Contact />
      </div> */}
      <Footer />
    </div>
  );
};

export default Index;
