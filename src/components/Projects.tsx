import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { ExternalLink, Github, ArrowRight, Code, Calendar, Tag, Globe, Smartphone, Check, Layers } from 'lucide-react';
import data from '@/data/data.json';
import { Button } from '@/components/ui/button';

interface Project {
  project_name: string;
  code_link: string;
  demo_link?: string;
  description: string;
  image: string;
  category: 'web' | 'mobile' | 'all';
  technologies: string[];
  id: string;
}

const Projects = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const projects = data.Projects as Project[];
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile'>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  }, [filter, projects]);

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

  const techBadgeVariants = {
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
      id="projects" 
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
          className="max-w-6xl mx-auto"
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
                My Creative Showcase
              </span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Featured <span className="text-tech-blue">Projects</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto rounded-full mb-6"></div>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              A collection of my most significant works showcasing my skills and problem-solving capabilities
            </p>
          </m.div>

          {/* Filter buttons */}
          <m.div 
            variants={titleVariants} 
            className="flex justify-center mb-12 gap-4 flex-wrap"
          >
            {[
              { value: 'all', label: 'All Projects', icon: <Layers className="w-4 h-4 mr-2" /> },
              { value: 'web', label: 'Web Projects', icon: <Globe className="w-4 h-4 mr-2" /> },
              { value: 'mobile', label: 'Mobile Projects', icon: <Smartphone className="w-4 h-4 mr-2" /> }
            ].map((option) => (
              <Button
                key={option.value}
                variant={filter === option.value ? "default" : "outline"}
                className={`rounded-full transition-all duration-300 ${
                  filter === option.value
                    ? 'bg-gradient-to-r from-tech-blue to-tech-purple text-white'
                    : isDark 
                      ? 'bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'bg-white text-gray-700 hover:text-tech-blue hover:border-tech-blue/50'
                }`}
                onClick={() => setFilter(option.value as 'all' | 'web' | 'mobile')}
              >
                <div className="flex items-center justify-center">
                  {option.icon}
                  {option.label}
                </div>
              </Button>
            ))}
          </m.div>
          
          {/* Projects grid */}
          <AnimatePresence mode="wait">
            <m.div 
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <m.div
                  key={project.id}
                  custom={index}
                  variants={cardVariants}
                  className={`group relative p-6 rounded-xl shadow-lg transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:shadow-tech-blue/10' 
                      : 'bg-white border border-gray-200 hover:shadow-tech-blue/20'
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Project image with overlay */}
                  <div className="relative rounded-lg overflow-hidden mb-6 aspect-video bg-gray-900">
                    <img 
                      src={project.image} 
                      loading="lazy"
                      alt={project.project_name} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex gap-3">
                        <a 
                          href={project.code_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-tech-blue transition-colors"
                          aria-label="View code"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                        {project.demo_link && (
                          <a 
                            href={project.demo_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-tech-purple transition-colors"
                            aria-label="View demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Category badge */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      isDark 
                        ? project.category === 'web' 
                          ? 'bg-tech-blue/20 text-tech-blue' 
                          : 'bg-tech-purple/20 text-tech-purple'
                        : project.category === 'web'
                          ? 'bg-tech-blue/10 text-tech-blue' 
                          : 'bg-tech-purple/10 text-tech-purple'
                    }`}>
                      {project.category === 'web' ? 'Web Application' : 'Mobile Application'}
                    </span>
                  </div>
                  
                  {/* Project title */}
                  <h3 className={`text-xl font-bold mb-3 group-hover:text-tech-blue transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.project_name}
                  </h3>
                  
                  {/* Project description */}
                  <p className={`mb-5 line-clamp-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  
                  {/* Technologies used */}
                  <div className={`p-4 rounded-lg mb-5 ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}>
                    <h5 className={`font-semibold mb-3 flex items-center ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <Code className="w-4 h-4 mr-2 text-tech-blue" />
                      Technologies Used
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <m.span 
                          key={techIndex}
                          variants={techBadgeVariants}
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            isDark 
                              ? 'bg-gradient-to-r from-tech-blue/80 to-tech-purple/80 text-white' 
                              : 'bg-gradient-to-r from-tech-blue to-tech-purple text-white'
                          }`}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: '0 0 8px rgba(37, 99, 235, 0.5)'
                          }}
                        >
                          {tech}
                        </m.span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Key features or highlights */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center">
                      <a 
                        href={project.demo_link || project.code_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`inline-flex items-center ${
                          isDark ? 'text-tech-blue hover:text-tech-purple' : 'text-tech-blue hover:text-tech-purple'
                        } font-medium transition-colors`}
                      >
                        View Project <ArrowRight className="w-4 h-4 ml-1.5" />
                      </a>
                      
                      <span className={`animate-pulse ${
                        hoveredCard === index ? 'opacity-100' : 'opacity-0'
                      } transition-opacity duration-300 ${
                        isDark ? 'text-tech-purple' : 'text-tech-blue'
                      }`}>
                        <Check className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </m.div>
              ))}
            </m.div>
          </AnimatePresence>
          
          {/* View all projects button */}
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
              <span>View All Projects</span>
              <Github className="w-4 h-4 ml-2" />
            </Button>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};

export default Projects; 