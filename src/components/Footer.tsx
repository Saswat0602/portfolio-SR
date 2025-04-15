import { footerData } from '@/data/footerdata';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold mb-4 block">
              {footerData.title}
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              {footerData.description}
            </p>
            <div className="flex space-x-4">
              {footerData.socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="text-gray-400 hover:text-white transition-colors">
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                {footerData.contact.location}
              </li>
              <li>
                <a href={`mailto:${footerData.contact.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {footerData.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${footerData.contact.phone}`} className="text-gray-400 hover:text-white transition-colors">
                  {footerData.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-6 text-center text-gray-500 text-sm">
          <p>{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
