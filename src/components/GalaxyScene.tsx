import React, { memo } from 'react';
import '@/styles/galaxy-background.css';

const GalaxyScene = memo(() => {
  return (
    <div className="galaxy-background w-full h-full absolute inset-0" />
  );
});

GalaxyScene.displayName = 'GalaxyScene';

export default GalaxyScene;