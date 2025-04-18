import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
// Import OrbitControls correctly
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface CosmicSphereProps {
    className?: string;
}

const CosmicSphere: React.FC<CosmicSphereProps> = ({ className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    useEffect(() => {
        if (!containerRef.current) return;

        let renderer: THREE.WebGLRenderer;
        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let sphereBg: THREE.Mesh;
        let nucleus: THREE.Mesh;
        let stars: THREE.Points;
        let controls: OrbitControls;
        let clock: THREE.Clock;
        let animationFrameId: number;

        let timeout_Debounce: number;
        const cameraSpeed = 0;
        const blobScale = 3;
        let delta = 0;
        const noise3D = createNoise3D();

        // Initialize scene
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(55, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.01, 1000);
        camera.position.set(0, 0, 230);

        const directionalLight = new THREE.DirectionalLight("#fff", 1);
        directionalLight.position.set(0, 50, -20);
        scene.add(directionalLight);

        let ambientLight = new THREE.AmbientLight("#ffffff", 1);
        ambientLight.position.set(0, 20, 20);
        scene.add(ambientLight);

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        clock = new THREE.Clock();

        // OrbitControls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;
        controls.autoRotateSpeed = 4;
        controls.maxDistance = 350;
        controls.minDistance = 150;
        controls.enablePan = false;

        // Load textures
        const loader = new THREE.TextureLoader();
        const textureSphereBg = loader.load('https://i.ibb.co/HC0vxMw/sky2.jpg');
        const texturenucleus = loader.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');
        const textureStar = loader.load("https://i.ibb.co/ZKsdYSz/p1-g3zb2a.png");
        const texture1 = loader.load("https://i.ibb.co/F8by6wW/p2-b3gnym.png");
        const texture2 = loader.load("https://i.ibb.co/yYS2yx5/p3-ttfn70.png");
        const texture4 = loader.load("https://i.ibb.co/yWfKkHh/p4-avirap.png");

        // Nucleus
        texturenucleus.anisotropy = 16;
        let icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
        let lambertMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
        nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
        scene.add(nucleus);

        // Sphere Background
        textureSphereBg.anisotropy = 16;
        let geometrySphereBg = new THREE.SphereGeometry(150, 40, 40);
        let materialSphereBg = new THREE.MeshBasicMaterial({
            side: THREE.BackSide,
            map: textureSphereBg,
        });
        sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
        scene.add(sphereBg);

        // Function to create random points on a sphere
        function randomPointSphere(radius: number): THREE.Vector3 {
            let theta = 2 * Math.PI * Math.random();
            let phi = Math.acos(2 * Math.random() - 1);
            let dx = 0 + (radius * Math.sin(phi) * Math.cos(theta));
            let dy = 0 + (radius * Math.sin(phi) * Math.sin(theta));
            let dz = 0 + (radius * Math.cos(phi));
            return new THREE.Vector3(dx, dy, dz);
        }

        // Moving Stars
        interface ExtendedVector3 extends THREE.Vector3 {
            velocity?: number;
            startX?: number;
            startY?: number;
            startZ?: number;
        }

        // Create stars geometry
        const starsGeometry = new THREE.BufferGeometry();
        const starPositions: number[] = [];
        const starVelocities: number[] = [];
        const starStartPositions: number[] = [];

        for (let i = 0; i < 50; i++) {
            const star = randomPointSphere(150);
            const velocity = THREE.MathUtils.randInt(50, 200);

            starPositions.push(star.x, star.y, star.z);
            starVelocities.push(velocity);
            starStartPositions.push(star.x, star.y, star.z);
        }

        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));

        // Store velocities and start positions
        const velocities: number[] = starVelocities;
        const startPositions: number[] = starStartPositions;

        const starsMaterial = new THREE.PointsMaterial({
            size: 5,
            color: "#ffffff",
            transparent: true,
            opacity: 0.8,
            map: textureStar,
            blending: THREE.AdditiveBlending,
        });

        starsMaterial.depthWrite = false;
        stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);

        // Fixed Stars
        function createStars(texture: THREE.Texture, size: number, total: number) {
            const positions: number[] = [];

            for (let i = 0; i < total; i++) {
                const radius = THREE.MathUtils.randInt(149, 70);
                const particles = randomPointSphere(radius);
                positions.push(particles.x, particles.y, particles.z);
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

            const material = new THREE.PointsMaterial({
                size,
                map: texture,
                blending: THREE.AdditiveBlending,
            });

            return new THREE.Points(geometry, material);
        }

        scene.add(createStars(texture1, 15, 20));
        scene.add(createStars(texture2, 5, 5));
        scene.add(createStars(texture4, 7, 5));

        // Animation function
        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            delta += clock.getDelta();

            if (delta > 1 / 60) {
                // Stars Animation
                const positions = stars.geometry.attributes.position.array as Float32Array;

                for (let i = 0; i < positions.length; i += 3) {
                    const vIndex = i / 3;

                    // Move stars toward center
                    positions[i] += (0 - positions[i]) / velocities[vIndex];
                    positions[i + 1] += (0 - positions[i + 1]) / velocities[vIndex];
                    positions[i + 2] += (0 - positions[i + 2]) / velocities[vIndex];

                    velocities[vIndex] -= 0.3;

                    // Reset stars that are too close to center
                    if (
                        positions[i] <= 5 && positions[i] >= -5 &&
                        positions[i + 2] <= 5 && positions[i + 2] >= -5
                    ) {
                        positions[i] = startPositions[i];
                        positions[i + 1] = startPositions[i + 1];
                        positions[i + 2] = startPositions[i + 2];
                        velocities[vIndex] = THREE.MathUtils.randInt(50, 300);
                    }
                }

                stars.geometry.attributes.position.needsUpdate = true;

                // Nucleus Animation (different approach for newer THREE.js)
                const time = Date.now();
                const nucleusGeometry = nucleus.geometry as THREE.IcosahedronGeometry;
                const nucleusPositions = nucleusGeometry.attributes.position.array as Float32Array;

                for (let i = 0; i < nucleusPositions.length; i += 3) {
                    const x = nucleusPositions[i];
                    const y = nucleusPositions[i + 1];
                    const z = nucleusPositions[i + 2];

                    const length = Math.sqrt(x * x + y * y + z * z);
                    const nx = x / length;
                    const ny = y / length;
                    const nz = z / length;

                    const distance = 30 + noise3D(
                        nx + time * 0.0005,
                        ny + time * 0.0003,
                        nz + time * 0.0008
                    ) * blobScale;

                    nucleusPositions[i] = nx * distance;
                    nucleusPositions[i + 1] = ny * distance;
                    nucleusPositions[i + 2] = nz * distance;
                }

                nucleusGeometry.attributes.position.needsUpdate = true;
                nucleus.geometry.computeVertexNormals();
                nucleus.rotation.y += 0.002;

                // Sphere Background Animation
                sphereBg.rotation.x += 0.002;
                sphereBg.rotation.y += 0.002;
                sphereBg.rotation.z += 0.002;

                controls.update();
                renderer.render(scene, camera);

                delta = delta % (1 / 60);
            }
        }

        // Handle window resize
        const handleResize = () => {
            if (!containerRef.current) return;

            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };

        window.addEventListener('resize', () => {
            clearTimeout(timeout_Debounce);
            timeout_Debounce = window.setTimeout(handleResize, 80);
        });

        // Start animation
        animate();

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeout_Debounce);
            cancelAnimationFrame(animationFrameId);

            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }

            // Proper cleanup for Three.js objects
            renderer.dispose();

            // Clean up geometries and materials
            nucleus.geometry.dispose();
            (nucleus.material as THREE.Material).dispose();

            sphereBg.geometry.dispose();
            (sphereBg.material as THREE.Material).dispose();

            stars.geometry.dispose();
            (stars.material as THREE.Material).dispose();

            // Three.js Scene doesn't have a dispose method, so we remove all objects
            while (scene.children.length > 0) {
                const object = scene.children[0];
                scene.remove(object);
            }
        };
    }, []);

    // Fullscreen toggle handler
    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    return (

        <div className={`w-full h-screen relative bg-cover ${className || ''}`} style={{
            backgroundImage: "url('https://user-images.githubusercontent.com/26748614/96337246-f14d4580-1085-11eb-8793-a86d929e034d.jpg')",
            backdropFilter: "brightness(50%)"
        }}>
            <div id="canvas_container" ref={containerRef} className="w-full h-screen"></div>

        </div>
    );
};

export default CosmicSphere;