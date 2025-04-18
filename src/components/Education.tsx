import React from 'react';
import { GraduationCap } from 'lucide-react';
import { m } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { animations } from '@/lib/config';
import data from '@/data/data.json';

const Education = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerClasses = `py-16 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`;
  const cardClasses = `rounded-lg p-6 shadow-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`;

  const educationData = data.about.education;
  
  return (
    <section id="education" className={containerClasses}>
      <div className="container mx-auto px-4">
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">Education</h2>
          <div className="w-20 h-1 bg-tech-blue mx-auto mb-6"></div>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            My academic background that has shaped my professional journey
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Postgraduate Education */}
          <m.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cardClasses}
          >
            <div className="flex items-start">
              <div className={`p-3 rounded-full mr-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <GraduationCap className="w-6 h-6 text-tech-blue"/>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Postgraduate</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {educationData.postgraduate}
                </p>
                <div className="mt-4 flex items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    2021 - 2023
                  </span>
                  <span className="mx-2 text-tech-blue">•</span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Master's Degree
                  </span>
                </div>
              </div>
            </div>
          </m.div>

          {/* Undergraduate Education */}
          <m.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cardClasses}
          >
            <div className="flex items-start">
              <div className={`p-3 rounded-full mr-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <GraduationCap className="w-6 h-6 text-tech-purple"/>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Undergraduate</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {educationData.undergraduate}
                </p>
                <div className="mt-4 flex items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    2018 - 2021
                  </span>
                  <span className="mx-2 text-tech-purple">•</span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Bachelor's Degree
                  </span>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default Education; 