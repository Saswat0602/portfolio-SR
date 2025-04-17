import { useState } from 'react';
import RubiksCube from './RubiksCube';
import FullScreenGlobe from './GlobeComponent';

const Playground = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSelection = (type: string) => {
    setSelectedItem(type);
  };

  return (
    <div className="bg-dark text-white">
      {/* Modal */}
      <div className="flex justify-center py-4">
        <div className="flex space-x-8">
          <div
            className="hover:text-tech-blue cursor-pointer transition-all py-2 px-4 rounded-md hover:bg-tech-blue hover:bg-opacity-20"
            onMouseEnter={() => handleSelection('game')}
          >
            Games
          </div>
          <div
            className="hover:text-tech-blue cursor-pointer transition-all py-2 px-4 rounded-md hover:bg-tech-blue hover:bg-opacity-20"
            onMouseEnter={() => handleSelection('world')}
          >
            3D World
          </div>
        </div>
      </div>

      {/* Modal content */}
      {selectedItem === 'game' && (
        <div className="flex justify-center space-x-4 py-4">
          <div
            className="cursor-pointer hover:text-tech-blue transition-all py-2 px-4 rounded-md hover:bg-tech-blue hover:bg-opacity-20"
            onClick={() => setSelectedItem('rubik')}
          >
            Rubik's Cube
          </div>
          <div
            className="cursor-pointer hover:text-tech-blue transition-all py-2 px-4 rounded-md hover:bg-tech-blue hover:bg-opacity-20"
            onClick={() => setSelectedItem('snake')}
          >
            Snake Game {/* Example */}
          </div>
        </div>
      )}
      {selectedItem === 'world' && (
        <div className="flex justify-center space-x-4 py-4">
          <div
            className="cursor-pointer hover:text-tech-blue transition-all py-2 px-4 rounded-md hover:bg-tech-blue hover:bg-opacity-20"
            onClick={() => setSelectedItem('globe')}
          >
            FullScreen Globe
          </div>
        </div>
      )}

      {/* Render based on selection */}
      {selectedItem === 'rubik' && (
        <div className="py-4">
          <RubiksCube />
        </div>
      )}
      {selectedItem === 'globe' && (
        <div>
          <FullScreenGlobe />
        </div>
      )}
    </div>
  );
};

export default Playground;
