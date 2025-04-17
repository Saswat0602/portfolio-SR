// components/FullScreenGlobe.tsx

import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const cities = [
  { lat: 20.2961, lng: 85.8245, name: 'Bhubaneswar' },
  { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
  { lat: 30.0444, lng: 31.2357, name: 'Cairo' },
  { lat: 6.5244, lng: 3.3792, name: 'Lagos' },
  { lat: 40.7128, lng: -74.0060, name: 'New York' },
];

const FullScreenGlobe = () => {
  const globeRef = useRef<any>();
  const [arcs, setArcs] = useState<any[]>([]);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;

    const scene = globe.scene();

    // Set background to black (space)
    scene.background = new THREE.Color(0x000000);

    // Add starfield with twinkling effect
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 10000;
    const positions = new Float32Array(starsCount * 3);
    const starColors = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 3000;
      positions[i3 + 1] = (Math.random() - 0.5) * 3000;
      positions[i3 + 2] = (Math.random() - 0.5) * 3000;
      
      // Slightly different colors for stars
      const color = new THREE.Color();
      color.setHSL(0.6, 0.2, 0.6 + Math.random() * 0.4);
      starColors[i3] = color.r;
      starColors[i3 + 1] = color.g;
      starColors[i3 + 2] = color.b;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
      size: 1.5,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true
    });
    
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 0, 50);
    scene.add(directionalLight);

    // Get globe size for reference
    const globeRadius = globe.getGlobeRadius();
    
    // Create a moon object
    const moonRadius = globeRadius * 0.27; // Moon is ~27% the size of Earth
    const moonGeometry = new THREE.SphereGeometry(moonRadius, 64, 64);
    
    // Create a basic material without textures to avoid shader issues
    const moonMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xcccccc  // Light gray color for the moon
    });
    
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    // Create a basic material for the moon glow
    const moonGlowGeometry = new THREE.SphereGeometry(moonRadius * 1.1, 32, 32);
    const moonGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15
    });
    
    const moonGlow = new THREE.Mesh(moonGlowGeometry, moonGlowMaterial);
    scene.add(moonGlow);

    // Add some small satellites orbiting Earth
    const satellites = [];
    const satelliteCount = 3;
    
    for (let i = 0; i < satelliteCount; i++) {
      const size = globeRadius * (0.03 + Math.random() * 0.02);
      const satelliteGeometry = new THREE.SphereGeometry(size, 16, 16);
      const satelliteMaterial = new THREE.MeshBasicMaterial({
        color: 0xcccccc
      });
      
      const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
      
      // Add solar panel wings to satellites
      const panelGeometry = new THREE.BoxGeometry(size * 4, size * 0.2, size * 1.5);
      const panelMaterial = new THREE.MeshBasicMaterial({
        color: 0x2266ff
      });
      
      const panels = new THREE.Mesh(panelGeometry, panelMaterial);
      satellite.add(panels);
      
      satellites.push({
        mesh: satellite,
        orbitRadius: globeRadius * (1.3 + i * 0.1),
        orbitSpeed: 0.2 + Math.random() * 0.3,
        orbitTilt: Math.random() * Math.PI * 2,
        orbitPhase: Math.random() * Math.PI * 2
      });
      
      scene.add(satellite);
    }

    // Animate moon orbit + simulate phases
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      
      // Orbit parameters for moon
      const orbitRadius = globeRadius * 1.5; // Distance from Earth
      const orbitSpeed = 0.1;
      const orbitTilt = Math.PI / 12; // Slight tilt to the orbit
      
      // Calculate position with tilt
      moon.position.x = Math.cos(elapsed * orbitSpeed) * orbitRadius;
      moon.position.y = Math.sin(elapsed * orbitSpeed) * Math.sin(orbitTilt) * orbitRadius;
      moon.position.z = Math.sin(elapsed * orbitSpeed) * Math.cos(orbitTilt) * orbitRadius;
      
      // Make moon rotate slowly on its axis
      moon.rotation.y = elapsed * 0.05;
      
      // Update moon glow position to match moon
      moonGlow.position.copy(moon.position);
      
      // Animate satellites
      satellites.forEach((sat) => {
        const satElapsed = elapsed + sat.orbitPhase;
        
        sat.mesh.position.x = Math.cos(satElapsed * sat.orbitSpeed) * sat.orbitRadius;
        sat.mesh.position.y = Math.sin(satElapsed * sat.orbitSpeed) * Math.sin(sat.orbitTilt) * sat.orbitRadius;
        sat.mesh.position.z = Math.sin(satElapsed * sat.orbitSpeed) * Math.cos(sat.orbitTilt) * sat.orbitRadius;
        
        // Rotate satellite to face the Earth
        sat.mesh.lookAt(0, 0, 0);
        
        // Rotate the solar panels to face the light
        sat.mesh.children[0].rotation.y = satElapsed * 0.2;
      });
    };
    
    animate();
  }, []);

  useEffect(() => {
    // Create fewer arcs for better performance
    const generatedArcs: any[] = [];
    cities.forEach((start, i) => {
      // Connect to only a few cities for cleaner visualization
      const endIndices = [
        (i + 1) % cities.length, 
        (i + 3) % cities.length
      ];
      
      endIndices.forEach(j => {
        if (i !== j) {
          generatedArcs.push({
            startLat: start.lat,
            startLng: start.lng,
            endLat: cities[j].lat,
            endLng: cities[j].lng,
            arcAlt: 0.3 + Math.random() * 0.2 // Varying arc heights
          });
        }
      });
    });
    setArcs(generatedArcs);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        arcsData={arcs}
        arcStartLat={(d: any) => d.startLat}
        arcStartLng={(d: any) => d.startLng}
        arcEndLat={(d: any) => d.endLat}
        arcEndLng={(d: any) => d.endLng}
        arcAlt={(d: any) => d.arcAlt}
        arcColor={() => ['#00ffff', '#ff00ff']}
        arcDashLength={0.4}
        arcDashGap={2}
        arcDashInitialGap={() => Math.random() * 2}
        arcDashAnimateTime={4000}
        pointsData={cities}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={() => '#ff0000'}
        pointAltitude={0.01}
        pointRadius={0.5}
        pointsMerge={true}
        onPointClick={(marker: any) => alert(`You clicked on ${marker.name}`)}
        showAtmosphere={true}
        atmosphereColor="#3a228a"
        atmosphereAltitude={0.25}
      />
    </div>
  );
};

export default FullScreenGlobe;