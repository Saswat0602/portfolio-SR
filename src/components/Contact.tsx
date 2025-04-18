import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { m } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import data from '@/data/data.json';

const Contact = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formState);
    // Reset form
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const containerClasses = `py-16 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`;
  const cardClasses = `rounded-lg p-8 shadow-lg ${isDark ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`;
  const textClasses = isDark ? 'text-gray-300' : 'text-gray-600';
  const iconContainerClasses = `flex items-center justify-center w-12 h-12 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`;

  const contactDetails = [
    {
      icon: <Mail className="w-5 h-5 text-tech-blue" />,
      title: 'Email',
      detail: data.about.email,
      link: `mailto:${data.about.email}`
    },
    {
      icon: <MapPin className="w-5 h-5 text-tech-purple" />,
      title: 'Location',
      detail: data.about.location,
      link: `https://maps.google.com/?q=${encodeURIComponent(data.about.location)}`
    }
  ];

  return (
    <section id="contact" className={containerClasses}>
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Contact Me</h2>
          <div className="w-20 h-1 bg-tech-blue mx-auto mb-6"></div>
          <p className={`max-w-2xl mx-auto ${textClasses}`}>
            {data.contact.message}
          </p>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className={cardClasses}>
              <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-6">
                {contactDetails.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-4 group"
                  >
                    <div className={iconContainerClasses}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className={`${textClasses} group-hover:text-tech-blue transition-colors`}>
                        {item.detail}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Follow Me</h3>
                <div className="flex space-x-3">
                  {data.footer.socialLinks.slice(0, 4).map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 flex items-center justify-center rounded-full ${
                        isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                      } shadow-md transition-colors`}
                    >
                      <span className="text-tech-blue">
                        {/* Placeholder icons - would be better to use actual social icons */}
                        {index === 0 && "in"}
                        {index === 1 && "gh"}
                        {index === 2 && "tw"}
                        {index === 3 && "ig"}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </m.div>

          {/* Contact Form */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className={cardClasses}>
              <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={`block mb-2 text-sm font-medium ${textClasses}`}>
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      className={`w-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block mb-2 text-sm font-medium ${textClasses}`}>
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="....@example.com"
                      required
                      className={`w-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className={`block mb-2 text-sm font-medium ${textClasses}`}>
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="How can I help you"
                    required
                    className={`w-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block mb-2 text-sm font-medium ${textClasses}`}>
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={6}
                    required
                    className={`w-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="bg-tech-blue hover:bg-tech-purple transition-colors flex items-center"
                >
                  Send Message
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 