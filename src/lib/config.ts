export const colors = {
  primary: '#2563eb', // tech-blue
  secondary: '#6366f1', // tech-purple
  dark: '#171923',
  light: '#FFFFFF',
  gray: {
    100: '#f7fafc',
    200: '#edf2f7',
    300: '#e2e8f0',
    400: '#cbd5e0',
    500: '#a0aec0',
    600: '#718096',
    700: '#4a5568',
    800: '#2d3748',
    900: '#1a202c',
  },
  playground: {
    game: '#2563eb',
    world: '#6366f1',
    card: {
      bg: 'rgba(37, 99, 235, 0.1)',
      hoverBg: 'rgba(37, 99, 235, 0.2)',
      border: 'rgba(37, 99, 235, 0.3)',
      text: '#2563eb',
    }
  },
  theme: {
    light: {
      background: '#ffffff',
      text: '#1a202c',
      secondaryText: '#4a5568',
      card: '#f7fafc',
      border: '#e2e8f0',
      hover: '#edf2f7',
      navbar: 'rgba(255, 255, 255, 0.9)',
    },
    dark: {
      background: '#1a202c',
      text: '#f7fafc',
      secondaryText: '#cbd5e0',
      card: '#2d3748',
      border: '#4a5568',
      hover: '#4a5568',
      navbar: 'rgba(26, 32, 44, 0.9)',
    }
  }
};

export const animations = {
  fadeIn: 'animate-fade-in',
  navbarTransition: 'transition-all duration-300 ease-in-out',
  cardHover: 'transition-all duration-300 ease-in-out hover:scale-105',
  pageTransition: 'transition-all duration-500 ease-in-out',
  performant: {
    // Use these for smoother animations that won't cause lag
    transform: 'will-change-transform',
    opacity: 'will-change-opacity',
    hardware: 'transform translate3d(0,0,0)',
  },
};

export const routes = {
  home: '/',
  playground: '/playground',
  games: {
    rubiksCube: '/cube',
    snake: '/snake',
    carGame: '/CarGame',
  },
  worlds: {
    globe: '/globe',
    galaxy: '/gala',
    cosmicSphere: '/CosmicSphere',
    cube2: '/Cube2',
    cube3: '/Cube3',
  }
};

export const sections = {
  home: 'home',
  about: 'about',
  experience: 'experience',
  education: 'education',
  skills: 'skills',
  projects: 'projects',
  contact: 'contact',
  playground: 'playground',
};

export default {
  colors,
  animations,
  routes,
  sections
}; 