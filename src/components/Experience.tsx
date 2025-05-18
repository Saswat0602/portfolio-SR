// components/Experience.tsx
import React, { useState } from 'react';
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
  const [expandedItems, setExpandedItems] = useState<number[]>([0]); // First item expanded by default
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const toggleExpand = (index: number) => {
    setExpandedItems(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } 
      return [...prev, index];
    });
  };

  const isExpanded = (index: number) => expandedItems.includes(index);

  return (
    <section 
      id="experience" 
      className={`py-24 relative fade-in-up ${isDark 
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
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
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
          </div>

          {/* Experience Cards */}
          <div className="space-y-8">
            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className={`rounded-xl shadow-lg p-8 transition-all duration-300 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                } fade-in-up ${hoveredCard === idx ? 'ring-2 ring-tech-blue/40' : ''}`}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-16 h-16 rounded-full object-cover border-2 border-tech-blue shadow"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-tech-blue font-medium">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Calendar className="w-4 h-4" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => toggleExpand(idx)}
                  >
                    {isExpanded(idx) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {isExpanded(idx) ? 'Show Less' : 'Show More'}
                  </Button>
                </div>
                <div
                  className={`transition-all duration-300 overflow-hidden ${isExpanded(idx) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                >
                  <div className="py-2">
                    <p className="mb-2 text-lg">{exp.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="inline-block bg-tech-blue/10 text-tech-blue px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <ul className="list-disc pl-6 mb-2">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="mb-1">{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;