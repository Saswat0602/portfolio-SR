// components/About.tsx
import React from 'react';
import { m } from 'framer-motion';
import { Mail, MapPin, User, ArrowRight, Download, FileText, Coffee, Code, Globe, Briefcase } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { Button } from '@/components/ui/button';
import data from '@/data/data.json';

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const aboutData = data.about;

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

  const quickStats = [
    { icon: <Code className="w-5 h-5" />, label: "Projects", value: data.Projects.length.toString() },
    { icon: <Coffee className="w-5 h-5" />, label: "Experience", value: "2+ Years" },
    { icon: <Globe className="w-5 h-5" />, label: "Languages", value: "3" }
  ];

  const containerClasses = `py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`;
  const cardClasses = `rounded-xl p-6 shadow-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`;

  return (
    <m.section 
      id="about" 
      className={containerClasses}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <m.div className="mb-12 text-center" variants={itemVariants}>
          <h2 className="text-4xl font-bold mb-2 inline-block">
            About Me
          </h2>
          <div className="w-20 h-1 bg-tech-blue mx-auto mb-6"></div>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Get to know more about me and my experience
          </p>
        </m.div>
          
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Profile section */}
          <m.div variants={itemVariants} className="lg:col-span-1">
            <div className={cardClasses}>
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-tech-blue shadow-lg mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1000&auto=format&fit=crop"
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {data.name}
                </h3>
                <p className="text-tech-blue font-medium mb-4">{data.title}</p>
                
                <div className="space-y-2 w-full mb-6">
                  <div className={`flex items-center py-2 px-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <MapPin className="w-5 h-5 mr-3 text-tech-blue" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {aboutData.location}
                    </span>
                  </div>
                  
                  <div className={`flex items-center py-2 px-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Mail className="w-5 h-5 mr-3 text-tech-blue" />
                    <a 
                      href={`mailto:${aboutData.email}`} 
                      className={`hover:text-tech-blue transition-colors ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      {aboutData.email}
                    </a>
                  </div>
                </div>
                
                <Button className="flex items-center bg-tech-blue hover:bg-tech-purple w-full justify-center">
                  <FileText className="w-4 h-4 mr-2" />
                  <span>Download CV</span>
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </m.div>
          
          {/* Info section */}
          <m.div variants={itemVariants} className="lg:col-span-2">
            <div className={cardClasses}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Bio
              </h3>
              
              <div className="space-y-4 mb-6">
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {aboutData.description}
                </p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {aboutData.description2}
                </p>
              </div>
              
              {/* Current Position */}
              <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <Briefcase className="w-5 h-5 text-tech-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Current Position</h4>
                    <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {aboutData.current_position}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {quickStats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg text-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      {React.cloneElement(stat.icon, { className: 'text-tech-blue' })}
                    </div>
                    <h4 className="text-xl font-bold text-tech-blue">{stat.value}</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  className="bg-tech-blue hover:bg-tech-purple text-white flex items-center"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Button
                  variant="outline"
                  className={isDark ? 'border-gray-700 text-white hover:bg-gray-700' : ''}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Me
                </Button>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </m.section>
  );
};

export default About;