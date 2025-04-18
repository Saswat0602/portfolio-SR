import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import useMousePosition from '@/hooks/useMousePosition';

const GalaxyContents = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = elapsed * 0.02 + mouse.x * 0.3;
      group.current.rotation.x = Math.sin(elapsed * 0.1) * 0.05 - mouse.y * 0.3;
    }
  });

  return (
    <group ref={group}>
      <Stars
        radius={100}
        depth={40}
        count={15000}
        factor={6}
        saturation={0.8}
        fade
        speed={1}
      />
    </group>
  );
};

const GalaxyScene = () => {
  const mouse = useMousePosition();

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }} className="w-full h-full">
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <GalaxyContents mouse={mouse} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default GalaxyScene;
