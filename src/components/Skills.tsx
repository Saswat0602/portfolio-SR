import React, { useState, useEffect } from 'react';
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

// Define skill categories
const categories = [
  { name: "all", label: "All Skills" },
  { name: "frontend", label: "Frontend" },
  { name: "backend", label: "Backend" },
  { name: "mobile", label: "Mobile" },
  { name: "other", label: "Tools & DevOps" }
];

// Categorized skills
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
  const [forceRender, setForceRender] = useState(0);
  
  // Re-render on theme change to ensure proper styling
  useEffect(() => {
    setForceRender(prev => prev + 1);
  }, [theme]);
  
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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <section 
      id="skills" 
      className={`py-24 relative ${isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
      } transition-colors duration-300`}
      key={`skills-section-${isDark ? 'dark' : 'light'}-${forceRender}`}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-tech-blue mx-auto mb-6"></div>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Technologies I use to create exceptional digital experiences
          </p>
        </div>
        
        {/* Category Filters - Tab Style */}
        <div className="flex justify-center mb-12">
          <div className={`inline-flex p-1 rounded-full shadow-sm transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeCategory === category.name
                    ? isDark 
                      ? 'bg-gray-700 text-tech-blue shadow-sm' 
                      : 'bg-gray-100 text-tech-blue shadow-sm'
                    : isDark 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Skills Cards */}
        <AnimatePresence mode="wait">
          <m.div
            key={`${activeCategory}-${isDark ? 'dark' : 'light'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <m.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {filteredSkills.map((skill) => (
                <m.div
                  key={`${skill.name}-${isDark ? 'dark' : 'light'}`}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 4px 20px ${skill.color}20`,
                    transition: { duration: 0.2 } 
                  }}
                  className={`flex flex-col items-center justify-center p-5 rounded-lg transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-800 border border-gray-700' 
                      : 'bg-white border border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="mb-3">
                    <skill.icon 
                      style={{ color: skill.color }} 
                      size={36} 
                      className="transition-transform duration-300"
                    />
                  </div>
                  <span className={`text-base font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {skill.name}
                  </span>
                </m.div>
              ))}
            </m.div>
          </m.div>
        </AnimatePresence>
        
        {/* Currently Learning */}
        <div 
          className={`mt-16 p-6 rounded-lg max-w-3xl mx-auto text-center transition-colors duration-300 ${
            isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Currently Learning
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Advanced TypeScript', 'AWS Solutions', 'GraphQL', 'Next.js 14'].map(skill => (
              <span 
                key={skill} 
                className={`px-4 py-2 text-sm rounded-lg transition-colors duration-300 ${
                  isDark 
                    ? 'bg-tech-blue/10 text-tech-blue border border-tech-blue/30' 
                    : 'bg-tech-blue/10 text-tech-blue border border-tech-blue/20'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 