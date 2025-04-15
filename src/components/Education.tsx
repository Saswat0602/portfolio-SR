
import React from 'react';
import { Calendar } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Education</h2>
        
        <div className="mt-10">
          <div className="timeline-item">
            <div className="mb-1">
              <img 
                src="https://media.licdn.com/dms/image/C560BAQE3uC03JEVX0g/company-logo_100_100/0/1631341540259?e=2147483647&v=beta&t=MPbMOzeBWHWFiwDuyBNe1g_aah8IwTAnVzrAJWkdKO8" 
                alt="Biju Patnaik University of Technology" 
                className="h-12 w-12 object-contain mb-3"
              />
              <h3 className="text-xl font-semibold">Biju Patnaik University of Technology, Odisha</h3>
              <h4 className="text-tech-blue font-medium">Master of Computer Applications - MCA, MCA</h4>
            </div>
            
            <div className="flex text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> 
                <span>Nov 2021 - Aug 2023</span>
              </div>
            </div>
            
            <div className="flex flex-wrap mb-4">
              <span className="skill-badge">Software Development Life Cycle (SDLC)</span>
              <span className="skill-badge">Java</span>
              <span className="skill-badge">+4 skills</span>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="mb-1">
              <img 
                src="https://media.licdn.com/dms/image/C510BAQEgKj3QBFbCNA/company-logo_100_100/0/1555398707491?e=2147483647&v=beta&t=U6CZfujryEkS0gfMhohuS02U_D7FnrxcQVmFQPTYDhQ" 
                alt="Utkal University" 
                className="h-12 w-12 object-contain mb-3"
              />
              <h3 className="text-xl font-semibold">Utkal University</h3>
              <h4 className="text-tech-blue font-medium">BSc Chemistry</h4>
            </div>
            
            <div className="flex text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> 
                <span>Graduation Year: 2021</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-3">Grade: A</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
