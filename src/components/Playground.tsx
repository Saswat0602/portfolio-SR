import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { routes } from '@/lib/config';

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
  const [activeCategory, setActiveCategory] = useState<'games' | 'worlds'>('games');

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <m.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Playground</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore interactive 3D worlds and games created with Three.js and WebGL technologies
          </p>
        </m.div>

        {/* Category Selector */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-800 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setActiveCategory('games')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeCategory === 'games'
                  ? 'bg-tech-blue text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Games
            </button>
            <button
              onClick={() => setActiveCategory('worlds')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeCategory === 'worlds'
                  ? 'bg-tech-purple text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              3D Worlds
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeItems.map((item, index) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleItemClick(item.route)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${activeCategory === 'games' ? 'text-tech-blue' : 'text-tech-purple'}`}>
                  {item.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {item.description}
                </p>
                <button 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeCategory === 'games'
                      ? 'bg-tech-blue hover:bg-blue-700 text-white'
                      : 'bg-tech-purple hover:bg-purple-700 text-white'
                  }`}
                >
                  Explore
                </button>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playground;
