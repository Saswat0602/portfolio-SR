// components/Experience.tsx
import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Briefcase, ChevronDown, ChevronUp, Award, Code, ExternalLink, Check } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { Button } from '@/components/ui/button';

// Updated experience data with a new entry
const experienceData = [
  {
    title: "Software Development Engineer 1",
    company: "HyScaler",
    duration: "Apr 2025 - present",
    location: "Bhubaneswar, Odisha, India · On-site",
    type: "Full-time",
    description: "Working on React Native, and developing multiple web and mobile/Web applications with focus on performance optimization and user experience.",
    skills: ["React Native", "Swift", "TypeScript", "Redux", "UI/UX Design"],
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=200&auto=format&fit=crop",
    highlights: [
      "Led the development of 3 key mobile applications",
      "Improved app performance by 40%",
      "Implemented CI/CD pipeline for faster deployment"
    ]
  },
  {
    title: "Junior Software Developer",
    company: "HyScaler",
    duration: "Apr 2024 - Apr 2025",
    location: "Bhubaneswar, Odisha, India · On-site",
    type: "Full-time",
    description: "Worked on Django REST Framework, React Native, and developing multiple web and mobile applications with a focus on API development and frontend integration.",
    skills: ["Django REST Framework", "React Native", "JavaScript", "Python", "REST API", "Git", "SQL"],
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=200&auto=format&fit=crop",
    highlights: [
      "Developed and maintained RESTful APIs",
      "Contributed to frontend development with React Native",
      "Implemented unit testing for critical features"
    ]
  },
  {
    title: "Apprentice Trainee",
    company: "HyScaler",
    duration: "Aug 2023 - Mar 2024 (8 mos)",
    location: "Bhubaneswar, Odisha, India · On-site",
    type: "Trainee",
    description: "Gained hands-on experience in React.js, React Native, and other web technologies through intensive mentorship and practical projects.",
    skills: ["React.js", "React Native", "JavaScript", "HTML", "CSS", "Git"],
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=200&auto=format&fit=crop",
    highlights: [
      "Completed training in frontend development",
      "Participated in team coding challenges",
      "Built portfolio projects showcasing various technologies"
    ]
  },
];

const Experience = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(0); // First item expanded by default
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const toggleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

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

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
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
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: i * 0.15
      }
    })
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10
      }
    }
  };

  return (
    <section 
      id="experience" 
      className={`py-24 relative ${isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
      }`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full ${
          isDark ? 'bg-blue-500/5' : 'bg-blue-500/10'
        }`}></div>
        <div className={`absolute top-1/3 -left-32 w-96 h-96 rounded-full ${
          isDark ? 'bg-purple-500/5' : 'bg-purple-500/10'
        }`}></div>
        <div className={`absolute -bottom-20 right-1/4 w-80 h-80 rounded-full ${
          isDark ? 'bg-tech-blue/5' : 'bg-tech-blue/10'
        }`}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <m.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <m.div 
            className="text-center mb-16"
            variants={titleVariants}
          >
            <div className="inline-block mb-3">
              <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-3 ${
                isDark ? 'bg-tech-blue/20 text-tech-blue' : 'bg-tech-blue/10 text-tech-blue'
              }`}>
                My Professional Journey
              </span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Work <span className="text-tech-blue">Experience</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto rounded-full mb-6"></div>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              A timeline of my professional growth and the valuable skills I've developed
            </p>
          </m.div>

          {/* Experience Timeline */}
          <div className="relative flex flex-col space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:bg-gradient-to-b before:from-tech-blue before:via-tech-purple before:to-purple-500 before:rounded-full">
            {experienceData.map((experience, index) => (
              <m.div 
                key={index}
                custom={index}
                variants={cardVariants}
                className={`relative md:w-5/12 ${
                  index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                } md:pl-4 ${index % 2 === 0 ? 'md:pl-0 md:pr-12' : ''}`}
              >
                {/* Timeline node */}
                <div className="absolute left-0 top-5 -ml-1 h-5 w-5 rounded-full border-4 border-tech-blue bg-white md:left-1/2 md:-ml-2.5">
                  <span className={`absolute animate-ping h-full w-full rounded-full ${
                    hoveredCard === index ? 'bg-tech-blue/40' : 'bg-tech-blue/0'
                  }`}></span>
                </div>
                
                {/* Date badge - only visible on medium screens and up */}
                <div className={`hidden md:block absolute top-5 ${
                  index % 2 === 0 ? 'left-0 -translate-x-[calc(100%+3rem)]' : 'right-0 translate-x-[calc(100%+3rem)]'
                }`}>
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {experience.duration}
                  </span>
                </div>

                {/* Card */}
                <div 
                  className={`group relative p-6 rounded-xl shadow-lg transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:shadow-tech-blue/10' 
                      : 'bg-white border border-gray-200 hover:shadow-tech-blue/20'
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Only show date on mobile */}
                  <div className="md:hidden mb-4">
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {experience.duration}
                    </span>
                  </div>

                  {/* Company logo and job type */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-lg overflow-hidden mr-4 ${
                        isDark ? 'border border-gray-700' : 'border border-gray-200'
                      }`}>
                        <img 
                          src={experience.logo} 
                          alt={experience.company} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {experience.company}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {experience.type}
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      index === 0 
                        ? isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                        : isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {index === 0 ? 'Current' : 'Completed'}
                    </div>
                  </div>

                  {/* Job title and details */}
                  <h3 className={`text-xl font-bold mb-3 group-hover:text-tech-blue transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {experience.title}
                  </h3>

                  <p className={`mb-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {experience.description}
                  </p>

                  {/* Location */}
                  <div className={`flex items-center mb-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <MapPin className="w-4 h-4 mr-2 text-tech-blue" />
                    <span className="text-sm">{experience.location}</span>
                  </div>

                  {/* Highlights */}
                  <div className={`p-4 rounded-lg mb-5 ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}>
                    <h5 className={`font-semibold mb-3 flex items-center ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <Award className="w-4 h-4 mr-2 text-tech-blue" />
                      Key Achievements
                    </h5>
                    <ul className="space-y-2">
                      {experience.highlights.map((highlight, idx) => (
                        <li key={idx} className={`flex items-start text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <Check className={`w-4 h-4 mr-2 mt-0.5 ${
                            isDark ? 'text-tech-purple' : 'text-tech-blue'
                          }`} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <AnimatePresence>
                    {(expandedItem === index || expandedItem === null) && (
                      <m.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={skillItemVariants}
                      >
                        <div className="flex flex-wrap gap-2 mb-4">
                          {experience.skills.map((skill, skillIndex) => (
                            <m.span 
                              key={skillIndex}
                              variants={skillItemVariants}
                              className={`px-3 py-1 text-sm font-medium rounded-full ${
                                isDark 
                                  ? 'bg-gradient-to-r from-tech-blue/80 to-tech-purple/80 text-white' 
                                  : 'bg-gradient-to-r from-tech-blue to-tech-purple text-white'
                              }`}
                              whileHover={{ 
                                scale: 1.05,
                                boxShadow: '0 0 8px rgba(37, 99, 235, 0.5)'
                              }}
                            >
                              {skill}
                            </m.span>
                          ))}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>

                  {/* Button row */}
                  <div className="flex justify-between items-center mt-6">
                    <Button 
                      onClick={() => toggleExpand(index)}
                      variant="ghost"
                      size="sm"
                      className={`font-medium ${
                        isDark 
                          ? 'text-tech-blue hover:text-tech-purple hover:bg-gray-700/50' 
                          : 'text-tech-blue hover:text-tech-purple hover:bg-gray-100/80'
                      }`}
                    >
                      {expandedItem === index ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          <span>Hide Skills</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          <span>View Skills</span>
                        </>
                      )}
                    </Button>
                    
                    {index === 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={isDark 
                          ? 'bg-gray-700/50 text-white border-gray-600 hover:bg-gray-600' 
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }
                      >
                        <span>Certificate</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    )}
                  </div>
                </div>
              </m.div>
            ))}
          </div>

          {/* Resume Button */}
          <m.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              className="bg-gradient-to-r from-tech-blue to-tech-purple hover:from-tech-purple hover:to-tech-blue text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-tech-blue/30"
            >
              <span>Download Full Resume</span>
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};

export default Experience;