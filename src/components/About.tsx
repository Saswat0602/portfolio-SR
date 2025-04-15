// components/About.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, User, ArrowRight } from 'lucide-react';

// Import data from your data file
// You can also embed it directly here if you prefer
import { aboutData } from '@/data/aboutData';

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const highlightVariants = {
    initial: { width: 0 },
    animate: { 
      width: "100%",
      transition: { 
        duration: 0.8, 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <motion.section 
      id="about" 
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section heading */}
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              About Me
            </h2>
            <motion.div 
              className="w-16 h-1 bg-blue-500 mx-auto"
              initial="initial"
              animate="animate"
              variants={highlightVariants}
            />
          </motion.div>
          
          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile picture column */}
            <motion.div 
              className="md:col-span-1 flex justify-center"
              variants={cardVariants}
            >
              <motion.div 
                className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
                whileHover={{ scale: 1.05, borderColor: "#a855f7" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img 
                  src="/api/placeholder/200/200" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
            
            {/* Info column */}
            <div className="md:col-span-2">
              {/* Title with animation */}
              <motion.h3 
                className="text-2xl font-bold mb-4 text-white"
                variants={itemVariants}
              >
                {aboutData.title}
              </motion.h3>
              
              {/* Introduction paragraphs */}
              {aboutData.intro.map((paragraph, index) => (
                <motion.p 
                  key={index} 
                  className="mb-4 text-gray-300 leading-relaxed"
                  variants={itemVariants}
                  custom={index}
                >
                  {paragraph}
                </motion.p>
              ))}
              
              {/* Contact details */}
              <motion.div 
                className="mt-6 space-y-3"
                variants={itemVariants}
              >
                <motion.div 
                  className="flex items-center text-gray-300"
                  whileHover={{ x: 5, color: "#60a5fa" }}
                >
                  <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                  <span>{aboutData.location}</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center text-gray-300"
                  whileHover={{ x: 5, color: "#60a5fa" }}
                >
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <a href={`mailto:${aboutData.email}`} className="hover:underline">
                    {aboutData.email}
                  </a>
                </motion.div>
              </motion.div>
              
              {/* CTA Button */}
              <motion.div 
                className="mt-8"
                variants={itemVariants}
              >
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium flex items-center"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Resume
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </motion.div>
            </div>
          </div>
          
          {/* Skills cards */}
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={itemVariants}
          >
            {['Frontend Development', 'Mobile Development', 'Backend Development'].map((skill, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.5 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(66, 153, 225, 0.4)" 
                }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">{skill}</h4>
                </div>
                <p className="text-gray-400 text-sm">
                  Experienced in building modern, responsive solutions using industry best practices.
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;