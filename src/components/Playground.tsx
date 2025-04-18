import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { routes } from '@/lib/config';
import { useTheme } from '@/lib/ThemeContext';

// Define item types
interface PlaygroundItem {
  id: string;
  title: string;
  description: string;
  route: string;
  image: string;
}

const Playground = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState<'games' | 'worlds'>('games');
  const [forceRender, setForceRender] = useState(0);
  
  // Force re-render when theme changes
  useEffect(() => {
    setForceRender(prev => prev + 1);
  }, [theme]);

  // Game items
  const gameItems: PlaygroundItem[] = [
    {
      id: 'rubiks-cube',
      title: "Rubik's Cube",
      description: "Interactive 3D Rubik's Cube puzzle that you can solve",
      route: routes.games.rubiksCube,
      image: "https://images.unsplash.com/photo-1591991984829-7705b9c39ca7?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 'snake',
      title: "Snake Game",
      description: "Classic snake game with modern controls",
      route: routes.games.snake,
      image: "https://images.unsplash.com/photo-1610337673044-720471f83677?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 'car-game',
      title: "Car Driving Simulation",
      description: "3D car driving simulator with realistic physics",
      route: routes.games.carGame,
      image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  // 3D World items
  const worldItems: PlaygroundItem[] = [
    {
      id: 'globe',
      title: "Interactive Globe",
      description: "Explore an interactive 3D globe of our planet",
      route: routes.worlds.globe,
      image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 'galaxy',
      title: "Galaxy Scene",
      description: "Journey through a 3D galaxy with stars and planets",
      route: routes.worlds.galaxy,
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 'cosmic-sphere',
      title: "Cosmic Sphere",
      description: "Mesmerizing 3D cosmic sphere with particle effects",
      route: routes.worlds.cosmicSphere,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 'cube2',
      title: "Advanced Cube",
      description: "3D cube with advanced animations and effects",
      route: routes.worlds.cube2,
      image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 'cube3',
      title: "Infinite Shuffle",
      description: "Rubik's cube with infinite shuffling animation",
      route: routes.worlds.cube3,
      image: "https://images.unsplash.com/photo-1577374994771-3256cf611862?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  // Get active items based on category
  const activeItems = activeCategory === 'games' ? gameItems : worldItems;

  // Navigate to the selected item
  const handleItemClick = (route: string) => {
    navigate(route);
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-500 ${
        isDark 
          ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
          : 'bg-gradient-to-b from-blue-50 to-gray-100 text-gray-900'
      }`}
      key={`playground-${isDark ? 'dark' : 'light'}-${forceRender}`}
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

      <div className="container mx-auto px-4 py-10 relative z-10">
        <m.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Playground
          </h1>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore interactive 3D worlds and games created with Three.js and WebGL technologies
          </p>
        </m.div>

        {/* Category Selector */}
        <div className="flex justify-center mb-10">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white shadow-md'} p-1 rounded-lg inline-flex transition-colors duration-300`}>
            <button
              onClick={() => setActiveCategory('games')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeCategory === 'games'
                  ? isDark 
                    ? 'bg-tech-blue text-white shadow-lg shadow-tech-blue/20' 
                    : 'bg-tech-blue text-white shadow-lg shadow-tech-blue/20'
                  : isDark 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Games
            </button>
            <button
              onClick={() => setActiveCategory('worlds')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeCategory === 'worlds'
                  ? isDark 
                    ? 'bg-tech-purple text-white shadow-lg shadow-tech-purple/20' 
                    : 'bg-tech-purple text-white shadow-lg shadow-tech-purple/20'
                  : isDark 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              3D Worlds
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {activeItems.map((item, index) => (
              <m.div
                key={`${item.id}-${isDark ? 'dark' : 'light'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${
                  isDark
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200 shadow-md'
                } rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group`}
                onClick={() => handleItemClick(item.route)}
                whileHover={{
                  boxShadow: isDark
                    ? '0 25px 50px -12px rgba(59, 130, 246, 0.25)'
                    : '0 25px 50px -12px rgba(59, 130, 246, 0.15)',
                }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    activeCategory === 'games'
                      ? 'text-tech-blue' 
                      : 'text-tech-purple'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                  <m.button 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                      activeCategory === 'games'
                        ? 'bg-tech-blue hover:bg-blue-700 text-white'
                        : 'bg-tech-purple hover:bg-purple-700 text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore
                  </m.button>
                </div>
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Playground;
