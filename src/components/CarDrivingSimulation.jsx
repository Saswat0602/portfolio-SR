import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CarDrivingSimulation = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x242426, 20, 600);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 600);
    camera.position.z = 90;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x242426);
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Add renderer to DOM
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xEBF7FD, 0xEBF7FD, 0.2);
    hemiLight.position.set(0, 20, 20);
    scene.add(hemiLight);

    // Helper function to create noise texture
    function noiseMap(size = 256, intensity = 60, repeat = 0) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = canvas.width = size;
      const height = canvas.height = size;

      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      const n = pixels.length;
      let i = 0;

      while (i < n) {
        pixels[i++] = pixels[i++] = pixels[i++] = Math.sin(i * i * i + (i / n) * Math.PI) * intensity;
        pixels[i++] = 255;
      }
      ctx.putImageData(imageData, 0, 0);

      const texture = new THREE.Texture(canvas);
      if (repeat) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(repeat, repeat);
      }
      texture.needsUpdate = true;
      return texture;
    }

    // Animation helper (replacement for gsap)
    function animateValue(obj, prop, start, end, duration, callback = null) {
      let startTime = null;
      
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        obj[prop] = start + progress * (end - start);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else if (callback) {
          callback();
        }
      }
      
      window.requestAnimationFrame(step);
    }

    // Car class
    class Car extends THREE.Object3D {
      constructor() {
        super();
        
        // Car body
        const carGeometry = new THREE.BoxGeometry(20, 10, 3);
        const carMaterial = new THREE.MeshPhongMaterial({
          color: 0xB74242,
          shininess: 100,
          emissive: 0xFF0000,
          emissiveIntensity: 0.6,
        });
        
        const carBody = new THREE.Mesh(carGeometry, carMaterial);
        carBody.castShadow = true;
        carBody.receiveShadow = true;
        this.add(carBody);
        
        // Car top
        const carTopGeometry = new THREE.BoxGeometry(12, 8, 5);
        const carTopMaterial = new THREE.MeshPhongMaterial({
          color: 0xB74242,
          shininess: 100,
          emissive: 0x990000,
          emissiveIntensity: 0.7
        });
        
        const carTop = new THREE.Mesh(carTopGeometry, carTopMaterial);
        carTop.position.x -= 2;
        carTop.position.z += 3.5;
        carTop.castShadow = true;
        carTop.receiveShadow = true;
        this.add(carTop);
        
        this.castShadow = true;
        this.receiveShadow = true;
        
        // Interior light
        const light = new THREE.PointLight(0xFFFFFF, 1, 0);
        light.position.z = 25;
        light.position.x = 5;
        light.castShadow = true;
        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 50;
        light.shadow.bias = 0.1;
        light.shadow.radius = 5;
        light.power = 3;
        this.add(light);
        
        // Wheels
        const wheelGeometry = new THREE.CylinderGeometry(3, 3, 1, 6);
        const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        
        this.wheels = Array(4).fill(null).map((_, i) => {
          const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
          wheel.position.y = (i < 2 ? 6 : -6);
          wheel.position.x = (i % 2 ? 6 : -6);
          wheel.position.z = -3;
          this.add(wheel);
          return wheel;
        });
        
        // Headlights
        this.lights = Array(2).fill(null).map((_, i) => {
          const light = new THREE.SpotLight(0xffffff);
          light.position.x = 11;
          light.position.y = (i < 1 ? -3 : 3);
          light.position.z = -3;
          light.angle = Math.PI / 3.5;
          light.castShadow = true;
          light.shadow.mapSize.width = 512;
          light.shadow.mapSize.height = 512;
          light.shadow.camera.near = 1;
          light.shadow.camera.far = 400;
          light.shadow.camera.fov = 40;
          
          light.target.position.y = (i < 1 ? -0.5 : 0.5);
          light.target.position.x = 35;
          
          this.add(light.target);
          this.add(light);
          
          return light;
        });
        
        // Properties
        this.maxspeed = 3;
        this.speed = 0;
        this.angle = 0;
        this.steering = 0;
        this.lightsOn = true;
        this.lightToggleInProgress = false;
      }
      
      update(keys) {
        const prev = {
          x: this.position.x,
          y: this.position.y,
          rot: this.rotation.z
        };
        
        const steerPower = 0.0006;
        
        // Steering controls
        if (keys[39] || keys[68]) { // Right arrow or D
          this.steering += (this.steering > -0.01) ? steerPower : 0;
        } else if (keys[37] || keys[65]) { // Left arrow or A
          this.steering -= (this.steering < 0.01) ? steerPower : 0;
        } else {
          this.steering *= 0.92;
        }
        
        // Acceleration controls
        if (keys[38] || keys[87]) { // Up arrow or W
          this.speed += (this.speed < this.maxspeed) ? 0.04 : 0;
        } else if (keys[40] || keys[83]) { // Down arrow or S
          this.speed -= (this.speed > -this.maxspeed / 2) ? 0.04 : 0;
        } else {
          this.speed *= 0.96;
        }
        
        this.speed *= 1 - Math.abs(this.steering / 2);
        this.angle += this.steering * this.speed;
        
        // Animate wheels
        if (this.wheels) {
          this.wheels.forEach(wheel => {
            wheel.rotation.y += 0.1 * this.speed;
          });
        }
        
        const xdir = this.speed * Math.cos(this.angle);
        const ydir = this.speed * Math.sin(this.angle);
        
        this.position.x += xdir;
        this.position.y += -ydir;
        this.rotation.z = -this.angle;
        
        // Update headlights
        if (this.lights) {
          this.lights.forEach((light, i) => {
            light.rotation.z = this.angle;
            light.target.position.clone(this.position);
            light.target.position.x += 10;
            light.target.position.y += (i < 1 ? -0.5 : 0.5);
            light.target.updateMatrixWorld();
          });
          
          // Toggle lights with L key
          if (keys[76] && !this.lightToggleInProgress) { // L key
            keys[76] = false;
            this.lightsOn = !this.lightsOn;
            this.lightToggleInProgress = true;
            
            // Animate light intensity
            this.lights.forEach((light, i) => {
              // Stagger the animation slightly for each light
              setTimeout(() => {
                animateValue(
                  light, 
                  'intensity', 
                  this.lightsOn ? 0 : 1, 
                  this.lightsOn ? 1 : 0, 
                  300,
                  i === this.lights.length - 1 ? () => this.lightToggleInProgress = false : null
                );
              }, i * 20);
            });
          }
        }
        
        // Limit position
        this.position.x = (this.position.x > 990 || this.position.x < -990 ? prev.x : this.position.x);
        this.position.y = (this.position.y > 990 || this.position.y < -990 ? prev.y : this.position.y);
        
        // Update camera
        camera.position.x += (this.position.x - camera.position.x) * 0.1;
        camera.position.y = (this.position.y - 40 - (this.speed * 10));
        
        camera.lookAt(new THREE.Vector3(
          this.position.x,
          this.position.y,
          0
        ));
      }
    }
    
    // Create snowy ground
    function createSnowyGround() {
      const noise = noiseMap(256, 20, 30);
      const geometry = new THREE.PlaneGeometry(2000, 2000, 40, 45);
      
      // Use vertices for older Three.js compatibility
      if (geometry.vertices) {
        for (let i = 0; i < geometry.vertices.length; i++) {
          geometry.vertices[i].x += (Math.cos(i * i) + 1/2) * 2;
          geometry.vertices[i].y += (Math.cos(i) + 1/2) * 2;
          geometry.vertices[i].z = (Math.sin(i * i * i) + 1/2) * -4;
        }
        
        geometry.verticesNeedUpdate = true;
        geometry.normalsNeedUpdate = true;
        geometry.computeFaceNormals();
      } else {
        // For newer Three.js versions that use BufferGeometry by default
        const positionAttribute = geometry.attributes.position;
        
        for (let i = 0; i < positionAttribute.count; i++) {
          const x = positionAttribute.getX(i);
          const y = positionAttribute.getY(i);
          
          positionAttribute.setX(i, x + (Math.cos(i * i) + 1/2) * 2);
          positionAttribute.setY(i, y + (Math.cos(i) + 1/2) * 2);
          positionAttribute.setZ(i, (Math.sin(i * i * i) + 1/2) * -4);
        }
        
        positionAttribute.needsUpdate = true;
        geometry.computeVertexNormals();
      }
      
      const material = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        shininess: 80,
        bumpMap: noise,
        bumpScale: 0.15
      });
      
      const plane = new THREE.Mesh(geometry, material);
      plane.receiveShadow = true;
      plane.position.z = -5;
      
      return plane;
    }
    
    // Add ground to scene
    scene.add(createSnowyGround());
    
    // Create car
    const car = new Car();
    scene.add(car);
    
    // Keyboard controls
    const keys = [];
    
    const handleKeyDown = (e) => {
      keys[e.keyCode] = true;
      e.preventDefault();
    };
    
    const handleKeyUp = (e) => {
      keys[e.keyCode] = false;
      e.preventDefault();
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let count = 3;
    
    const animate = () => {
      requestAnimationFrame(animate);
      count += 0.03;
      
      car.update(keys);
      
      renderer.toneMappingExposure = Math.pow(0.91, 5.0);
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <div className="relative w-full h-screen">
      <div ref={containerRef} className="w-full h-full"></div>
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10 text-xs text-white opacity-60">
        <p>Use arrow keys or WASD to drive. L to toggle headlights.</p>
      </div>
    </div>
  );
};

export default CarDrivingSimulation;