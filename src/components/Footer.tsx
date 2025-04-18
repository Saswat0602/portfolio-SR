import { useTheme } from '@/lib/ThemeContext';
import { animations } from '@/lib/config';
import data from '@/data/data.json';
import { m } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const footerData = data.footer;

  const containerClasses = `py-12 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'}`;
  const headingClasses = 'text-xl font-bold mb-4';
  const linkClasses = `hover:text-tech-blue ${animations.navbarTransition}`;

  return (
    <footer className={containerClasses}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={headingClasses}>{footerData.title}</h3>
            <p className="text-gray-300 mb-4 max-w-xs">
              {footerData.description}
            </p>
            <div className="flex space-x-3">
              {footerData.socialLinks.slice(0, 4).map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-tech-blue transition-colors"
                >
                  <span>
                    {/* Placeholder icons - replace with actual icons */}
                    {index === 0 && "in"}
                    {index === 1 && "gh"}
                    {index === 2 && "tw"}
                    {index === 3 && "ig"}
                  </span>
                </a>
              ))}
            </div>
          </m.div>
          
          {/* Quick Links */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={headingClasses}>Quick Links</h3>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={`/#${link.label.toLowerCase()}`} className={linkClasses}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
          
          {/* Contact */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className={headingClasses}>Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-tech-blue mt-1" />
                <span className="text-gray-300">{footerData.contact.location}</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-tech-blue mt-1" />
                <a href={`mailto:${footerData.contact.email}`} className={linkClasses}>
                  {footerData.contact.email}
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-tech-blue mt-1" />
                <a href={`tel:${footerData.contact.phone}`} className={linkClasses}>
                  {footerData.contact.phone}
                </a>
              </li>
            </ul>
          </m.div>
        </div>
        
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400"
        >
          <p>{footerData.copyright}</p>
        </m.div>
      </div>
    </footer>
  );
};

export default Footer;
