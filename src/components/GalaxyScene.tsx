import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GalaxyContents = () => {
  const group = useRef<THREE.Group>(null);

  useFrame(({ mouse }) => {
    if (group.current) {
      group.current.rotation.y = mouse.x * 0.5;
      group.current.rotation.x = -mouse.y * 0.5;
    }
  });

  return (
    <group ref={group}>
      <Stars
        radius={100}
        depth={50}
        count={10000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </group>
  );
};

const GalaxyScene = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }} className="w-full h-full">
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <GalaxyContents />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default GalaxyScene;
