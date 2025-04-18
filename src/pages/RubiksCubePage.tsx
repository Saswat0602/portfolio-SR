import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import React from 'react';
import RubiksCube from './RubiksCube'; // Your cube logic component

const RubiksCubePage = () => {
  const {
    leftCW, leftCCW,
    rightCW, rightCCW,
    frontCW, frontCCW,
    backCW, backCCW,
    topCW, topCCW,
    bottomCW, bottomCCW,
  } = useControls('Cube', {
    'Left CW': button(() => rotateSlice('left', 'cw')),
    'Left CCW': button(() => rotateSlice('left', 'ccw')),
    'Right CW': button(() => rotateSlice('right', 'cw')),
    'Right CCW': button(() => rotateSlice('right', 'ccw')),
    'Front CW': button(() => rotateSlice('front', 'cw')),
    'Front CCW': button(() => rotateSlice('front', 'ccw')),
    'Back CW': button(() => rotateSlice('back', 'cw')),
    'Back CCW': button(() => rotateSlice('back', 'ccw')),
    'Top CW': button(() => rotateSlice('top', 'cw')),
    'Top CCW': button(() => rotateSlice('top', 'ccw')),
    'Bottom CW': button(() => rotateSlice('bottom', 'cw')),
    'Bottom CCW': button(() => rotateSlice('bottom', 'ccw')),
  });

  function rotateSlice(face: string, direction: 'cw' | 'ccw') {
    // Hook up to your actual cube logic here
    console.log(`Rotate ${face.toUpperCase()} ${direction.toUpperCase()}`);
  }

  return (
    <div className="rubiks-cube-wrapper">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <RubiksCube />
        <OrbitControls />
      </Canvas>
      <Leva collapsed />
    </div>
  );
};

export default RubiksCubePage;
