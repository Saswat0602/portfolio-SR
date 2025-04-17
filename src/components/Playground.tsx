import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import RubiksCube from './RubiksCube';
import RubiksCubeController from './RubiksCubeController';

const Playground = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl md:text-2xl font-bold text-dark">
              Saswat<span className="text-tech-blue">.dev</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-tech-blue transition-colors">
                Home
              </Link>
              <Link to="/globe" className="text-gray-700 hover:text-tech-blue transition-colors">
                Globe
              </Link>
              <Link to="/playground" className="text-gray-700 hover:text-tech-blue transition-colors">
                Game
              </Link>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
          {isOpen && (
            <div className="md:hidden pt-4 pb-2 animate-fade-in">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="text-gray-700 hover:text-tech-blue transition-colors py-2" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <Link to="/globe" className="text-gray-700 hover:text-tech-blue transition-colors py-2" onClick={() => setIsOpen(false)}>
                  Globe
                </Link>
                <Link to="/playground" className="text-gray-700 hover:text-tech-blue transition-colors py-2" onClick={() => setIsOpen(false)}>
                  Game
                </Link>
                <Button className="bg-tech-blue hover:bg-tech-purple text-white w-full">Contact</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Game */}
      <div className="py-4">
        <RubiksCube />
        <RubiksCubeController />
      </div>
    </div>
  );
};

export default Playground;
