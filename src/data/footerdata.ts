// footerData.ts
import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

export const footerData = {
  title: "Saswat.dev",
  description: "Junior Software Developer specialized in React, React Native, and Node.js development. Based in Bhubaneswar, Odisha, India.",
  socialLinks: [
    { href: "#", icon: Github },
    { href: "#", icon: Linkedin },
    { href: "#", icon: Twitter },
    { href: "#", icon: Instagram },
    { href: "mailto:contact@saswatmohanty.com", icon: Mail },
  ],
  quickLinks: [
    { label: "About", to: "/#about" },
    { label: "Experience", to: "/#experience" },
    { label: "Education", to: "/#education" },
    { label: "Skills", to: "/#skills" },
    { label: "Projects", to: "/#projects" },
    { label: "Certifications", to: "/#certifications" },
  ],
  contact: {
    location: "Bhubaneswar, Odisha, India",
    email: "contact@saswatmohanty.com",
    phone: "+91 98765 43210",
  },
  copyright: "© 2025 Saswat Ranjan Mohanty. All rights reserved.",
};
