import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import data from '@/data/data.json';
import { Button } from '@/components/ui/button';
// Import icons from react-icons
import { 
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaBootstrap, FaGitAlt,
  FaGithub, FaDocker, FaAws, FaJava, FaDatabase
} from "react-icons/fa";
import { 
  SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiExpress,
  SiMongodb, SiPostgresql, SiFirebase, SiGraphql, SiRedux, SiSwift, 
  SiDjango, SiC
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { RiRestTimeLine } from "react-icons/ri";

// Define skill categories with improved organization
const categories = [
  {
    name: "all",
    label: "All Skills"
  },
  {
    name: "frontend",
    label: "Frontend"
  },
  {
    name: "backend",
    label: "Backend"
  },
  {
    name: "mobile",
    label: "Mobile"
  },
  {
    name: "other",
    label: "Tools & DevOps"
  }
];

// Simplified categorized skills with icon mappings only
const categorizedSkills = {
  frontend: [
    { name: "HTML", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "Redux", icon: SiRedux, color: "#764ABC" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
    { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" }
  ],
  backend: [
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "Express.js", icon: SiExpress, color: "#000000" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Django REST", icon: SiDjango, color: "#092E20" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { name: "REST API", icon: RiRestTimeLine, color: "#0096D6" },
    { name: "GraphQL", icon: SiGraphql, color: "#E535AB" }
  ],
  mobile: [
    { name: "React Native", icon: TbBrandReactNative, color: "#61DAFB" },
    { name: "Swift", icon: SiSwift, color: "#FA7343" }
  ],
  other: [
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "GitHub", icon: FaGithub, color: "#181717" },
    { name: "Docker", icon: FaDocker, color: "#2496ED" },
    { name: "AWS", icon: FaAws, color: "#FF9900" },
    { name: "C", icon: SiC, color: "#A8B9CC" },
    { name: "Java (SE)", icon: FaJava, color: "#007396" }
  ]
};

const Skills = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Get all unique skills
  const allSkills = Object.values(categorizedSkills).flat();
  
  // Filter skills based on selected category
  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      return allSkills;
    }
    return categorizedSkills[activeCategory as keyof typeof categorizedSkills] || [];
  };

  const filteredSkills = getFilteredSkills();
  
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  // Animation variants for skill cards
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section 
      id="skills" 
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
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 100
          }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-block mb-3">
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-3 ${
              isDark ? 'bg-tech-blue/20 text-tech-blue' : 'bg-tech-blue/10 text-tech-blue'
            }`}>
              Technical Arsenal
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            My <span className="text-tech-blue">Skills</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto rounded-full mb-6"></div>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-10`}>
            Technologies I've mastered to create exceptional digital experiences
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <Button 
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                variant={activeCategory === category.name ? 'default' : 'outline'}
                className={`rounded-full px-6 ${
                  activeCategory === category.name 
                    ? 'bg-gradient-to-r from-tech-blue to-tech-purple text-white shadow-md' 
                    : isDark ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : ''
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </m.div>
        
        {/* Skills Grid - Simplified Clean Design */}
        <m.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill) => (
              <m.div
                key={skill.name}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ 
                  scale: 0.8, 
                  opacity: 0,
                  transition: { duration: 0.2 }
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 },
                  boxShadow: `0 10px 25px -5px ${skill.color}30`
                }}
                className={`flex flex-col items-center justify-center p-5 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800/60 backdrop-blur-sm hover:bg-gray-800/80 border border-gray-700' 
                    : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-tech-blue/20'
                }`}
              >
                {/* Skill Icon */}
                <div 
                  className={`w-14 h-14 rounded-lg flex items-center justify-center mb-3 ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}
                  style={{ 
                    boxShadow: `0 0 15px ${skill.color}20`
                  }}
                >
                  <skill.icon style={{ color: skill.color }} size={30} />
                </div>
                
                {/* Skill Name */}
                <h3 className={`text-center font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {skill.name}
                </h3>
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
        
        {/* Current Learning Section - Simplified */}
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`mt-16 p-6 rounded-xl text-center ${
            isDark 
              ? 'bg-gray-800/50 border border-gray-700' 
              : 'bg-white/70 border border-gray-200 shadow-sm'
          }`}
        >
          <h3 className="text-2xl font-semibold mb-4">
            <span className="text-tech-blue">Continuous</span> Learning
          </h3>
          
          {/* Current Learning Goals */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {['Advanced TypeScript', 'AWS Solutions', 'GraphQL', 'Next.js 14'].map((goal) => (
              <span 
                key={goal}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isDark 
                    ? 'bg-gradient-to-r from-tech-blue/30 to-tech-purple/30 text-white' 
                    : 'bg-gradient-to-r from-tech-blue/10 to-tech-purple/10 text-gray-800'
                }`}
              >
                {goal}
              </span>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default Skills; 