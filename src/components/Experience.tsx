// components/Experience.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';

const experienceData = [
  {
    title: "Junior Software Developer",
    company: "HyScaler",
    duration: "Apr 2024 - Present (1 yr 1 mo)",
    location: "Bhubaneswar, Odisha, India · On-site",
    type: "Full-time",
    description: "Working on Django REST Framework, React Native, and developing multiple web and mobile applications.",
    skills: ["Django REST Framework", "React Native", "JavaScript", "Python", "REST API", "Git", "SQL"],
    logo: "/api/placeholder/100/100",
  },
  {
    title: "Apprentice Trainee",
    company: "HyScaler",
    duration: "Aug 2023 - Mar 2024 (8 mos)",
    location: "Bhubaneswar, Odisha, India · On-site",
    type: "Trainee",
    description: "Gaining hands-on experience in React.js, React Native, and other web technologies.",
    skills: ["React.js", "React Native", "JavaScript", "HTML", "CSS", "Git"],
    logo: "/api/placeholder/100/100",
  },
];

const Experience = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const toggleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: i * 0.2
      }
    })
  };

  const skillsVariants = {
    collapsed: { 
      height: 0,
      opacity: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeInOut" 
      }
    },
    expanded: { 
      height: "auto",
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const skillItemVariants = {
    collapsed: { 
      opacity: 0, 
      scale: 0.8,
      y: 10 
    },
    expanded: { 
      opacity: 1, 
      scale: 1,
      y: 0 
    }
  };

  return (
    <motion.section 
      id="experience" 
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          variants={titleVariants}
        >
          Experience
        </motion.h2>
        
        <motion.p 
          className="text-center text-gray-300 mb-16 max-w-2xl mx-auto"
          variants={titleVariants}
        >
          My professional journey and the skills I've developed
        </motion.p>

        <div className="max-w-4xl mx-auto">
          {experienceData.map((experience, index) => (
            <motion.div 
              key={index}
              custom={index}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="mb-10"
            >
              <motion.div 
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Timeline indicator */}
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <motion.div 
                      className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center"
                      animate={{ 
                        scale: hoveredCard === index ? [1, 1.2, 1] : 1
                      }}
                      transition={{ 
                        duration: 1, 
                        repeat: hoveredCard === index ? Infinity : 0,
                        repeatType: "reverse" 
                      }}
                    >
                      <motion.div 
                        className="h-2 w-2 rounded-full bg-white"
                        animate={{ 
                          scale: hoveredCard === index ? [1, 1.5, 1] : 1 
                        }}
                        transition={{ 
                          duration: 1, 
                          repeat: hoveredCard === index ? Infinity : 0,
                          repeatType: "reverse" 
                        }}
                      />
                    </motion.div>
                    {index < experienceData.length - 1 && (
                      <motion.div 
                        className="h-12 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 absolute top-5 left-2.5 -translate-x-1/2"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      />
                    )}
                  </div>
                  <div className="ml-4">
                    <motion.span 
                      className="text-sm text-gray-400 font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {experience.duration}
                    </motion.span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                  {/* Logo column */}
                  <div className="flex justify-center md:justify-start">
                    <motion.div 
                      className="bg-gray-700 p-3 rounded-xl h-20 w-20 flex items-center justify-center"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)" 
                      }}
                    >
                      <img
                        src={experience.logo}
                        alt={experience.company}
                        className="max-h-14 max-w-14 object-contain"
                      />
                    </motion.div>
                  </div>

                  {/* Content column */}
                  <div className="md:col-span-3">
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {experience.title}
                    </motion.h3>
                    <motion.h4 
                      className="text-blue-400 font-medium mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {experience.company}
                    </motion.h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
                      <motion.div 
                        className="flex items-center text-gray-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                        <span>{experience.duration}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center text-gray-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                        <span>{experience.location.split('·')[0]}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center text-gray-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Briefcase className="w-4 h-4 mr-2 text-blue-400" />
                        <span>{experience.type}</span>
                      </motion.div>
                    </div>

                    <motion.p 
                      className="mb-4 text-gray-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {experience.description}
                    </motion.p>

                    <AnimatePresence>
                      <motion.div
                        initial="collapsed"
                        animate={expandedItem === index ? "expanded" : "collapsed"}
                        variants={skillsVariants}
                        className="overflow-hidden"
                      >
                        <h5 className="text-sm font-semibold text-gray-300 mb-3">Technologies & Skills</h5>
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill, skillIndex) => (
                            <motion.span 
                              key={skillIndex} 
                              variants={skillItemVariants}
                              className="px-3 py-1 bg-gradient-to-r from-blue-900 to-purple-900 text-blue-100 text-sm font-medium rounded-full"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <motion.button
                      onClick={() => toggleExpand(index)}
                      className="mt-4 flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {expandedItem === index ? (
                        <>
                          <span>Hide Skills</span>
                          <ChevronUp className="w-4 h-4 ml-1" />
                        </>
                      ) : (
                        <>
                          <span>Show Skills</span>
                          <ChevronDown className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;