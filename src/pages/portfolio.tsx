import React, { FC, useEffect, useRef, memo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Portfolio: FC = memo(() => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0); // Set the position of the orbit target (the point the camera looks at)
    controls.update(); // Required if controls.enableDamping or controls.autoRotate are set to true

    const loader = new THREE.ObjectLoader();
    loader.load(
      'scene.json', // The path to your exported scene file
      function (object) {
        scene.add(object);
        // Optionally, adjust controls to focus on this object or its position
        controls.target.copy(object.position);
        controls.update();
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        console.log('An error happened', error);
      }
    );

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    // Camera position
    camera.position.set(0, 0.2, 1); // Adjust as needed

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      controls.update(); // Only required if controls.enableDamping = true, or if controls.autoRotate = true
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div ref={mountRef} className="portfolio-container"></div>
  );
});

export default Portfolio;