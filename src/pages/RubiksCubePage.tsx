import React from 'react';
import { Button } from '@/components/ui/button';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import RubiksCube from '@/components/RubiksCube';

interface CubeControls {
  [key: string]: () => void;
}

const RubiksCubePage: React.FC = () => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const rotateSlice = (face: string, direction: 'cw' | 'ccw') => {
    if (isAnimating) return;
    setIsAnimating(true);
    // Add your rotation logic here
    setTimeout(() => setIsAnimating(false), 500);
  };

  const controls: CubeControls = {
    'Left CW': () => rotateSlice('left', 'cw'),
    'Left CCW': () => rotateSlice('left', 'ccw'),
    'Right CW': () => rotateSlice('right', 'cw'),
    'Right CCW': () => rotateSlice('right', 'ccw'),
    'Front CW': () => rotateSlice('front', 'cw'),
    'Front CCW': () => rotateSlice('front', 'ccw'),
    'Back CW': () => rotateSlice('back', 'cw'),
    'Back CCW': () => rotateSlice('back', 'ccw'),
    'Top CW': () => rotateSlice('top', 'cw'),
    'Top CCW': () => rotateSlice('top', 'ccw'),
    'Bottom CW': () => rotateSlice('bottom', 'cw'),
    'Bottom CCW': () => rotateSlice('bottom', 'ccw')
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-4xl p-4">
        <RubiksCube />
        <div className="grid grid-cols-2 gap-2 mt-4">
          {Object.entries(controls).map(([label, action]) => (
            <Button
              key={label}
              onClick={action}
              disabled={isAnimating}
              className="w-full"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RubiksCubePage;
