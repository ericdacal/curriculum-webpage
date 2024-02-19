import React, {FC, memo,useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Portfolio: FC = memo(() => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isOrbitingRef = useRef(true);

  /////// HTML HANDLERS ///////
   // Handler for the left arrow click
  const handleLeftArrowClick = () => {
    console.log('Left arrow clicked');
    // Implement what happens when the left arrow is clicked
    // For example, rotate the scene, move the camera, etc.
  };

  // Handler for the right arrow click
  const handleRightArrowClick = () => {
    console.log('Right arrow clicked');
    // Implement what happens when the right arrow is clicked
    // For example, rotate the scene, move the camera, etc.
  };
  ////////////////////////////
  
  
  useEffect(() => {
    
    
    /////// THREE.JS related EVENTS ///////
    const onClick = () => {
      // Call the function to animate the camera
      animateCameraToFrontView();
    }
    function onWindowResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
  
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  
      renderer.setSize(width, height);
      // If you're using a composer, uncomment the next line
      // composer.setSize(width, height);
    }
    ////////////////////////////
    
    /////// SCENE SETUP ///////
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    ////////////////////////////
   

    
    /////// RENDERER SETUP ///////
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ReinhardToneMapping;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    ////////////////////////////



    /////// EQUIRECTANGULAR BACKGROUND ///////
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('background-scene.png', function(texture) {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt.texture;
    });
    ////////////////////////////

    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
      mountRef.current.addEventListener('click', onClick);
    }
    window.addEventListener('resize', onWindowResize);
    


    const loader = new THREE.ObjectLoader();
    loader.load(
      'scene.json', // The path to your exported scene file
      function (object) {
        scene.add(object);
        //controls.target.copy(object.position);
        //controls.update();
        // Hide the loading screen once the scene is fully loaded
        setTimeout(() => {
          setIsLoading(false); // Hide loader after loading is complete
        }, 20000); 
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        console.log('An error happened', error);
      }
    );
    // Camera position
    camera.position.set(0, 0.2, 1);



    /////// ANIMATIONS ///////
    const animateCameraToFrontView = () => {
      // Camera Config
      isOrbitingRef.current = false; 
      const frontViewPosition = new THREE.Vector3(0, 0.75, 0.25); // Example position in front of the object
      const lookAtPosition = new THREE.Vector3(0, 0, 0); // Assuming the object is at the origin
      const duration = 1000; // Duration of animation in milliseconds
      
      const startTime = performance.now();
    
      const initialPosition = camera.position.clone();
      const initialQuaternion = camera.quaternion.clone();
      const targetQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)); // Front view orientatio

      function animate() {
        const elapsedTime = performance.now() - startTime;
        const fraction = elapsedTime / duration;
    
        if (fraction < 1) {
          // Interpolate position
          camera.position.lerpVectors(initialPosition, frontViewPosition, fraction);
          // Interpolate rotation
          camera.quaternion.slerpQuaternions(initialQuaternion, targetQuaternion, fraction);
          requestAnimationFrame(animate);
        } else {
          // Ensure final position and rotation are set
          camera.position.copy(frontViewPosition);
          camera.quaternion.copy(targetQuaternion);
        }
        camera.lookAt(lookAtPosition);
        renderer.render(scene, camera);
      }
    
      animate();
    };

    let angle = 0; // Initial angle
    let angleIncrement = 0.001; // Speed of the orbit

    const animateOrbitCamera = function () {
      requestAnimationFrame(animateOrbitCamera);
      const radius = 1; // Example value, adjust as needed
      const height = 1; // Height from the base, creates a diagonal angle
      const minAngle = 0; // Minimum angle, could be 0 or any other value
      const maxAngle = Math.PI/2; // Maximum angle, half orbit, adjust as needed
  
    
      if (isOrbitingRef.current) {
        // Update the angle for the orbit
        angle += angleIncrement;
    
        // Reverse direction at limits
        if (angle <= minAngle || angle >= maxAngle) {
          angleIncrement = -angleIncrement; // Reverse the increment direction
        }
    
        camera.position.x = radius * Math.sin(angle);
        camera.position.z = radius * Math.cos(angle);
        camera.position.y = height;
        camera.lookAt(scene.position);
      }
    
      renderer.render(scene, camera);
    };
    ////////////////////////////

    animateOrbitCamera();
  }, []);

  return (
    <div>
      {/* Loading screen element */}
      {isLoading && (
        <div className={`loader-screen ${!isLoading ? 'fade-out' : ''}`}>
          <h2>Portfolio</h2>
          <div className="slider"></div>
        </div>
      )}


      {/* The container for the Three.js scene */}
      <div className="portfolio-container" ref={mountRef}></div>
      <button className="arrow left-arrow" onClick={handleLeftArrowClick}>&lt;</button>
      <button className="arrow right-arrow" onClick={handleRightArrowClick}>&gt;</button>
      <style>
        {`
          .portfolio-container {
            position: relative;
            /* Your container styles */
          }
          .arrow {
            position: fixed;
            top: 50%;
            background-color: transparent;
            border: none;
            font-size: 72px;
            cursor: pointer;
            z-index: 10;
          }
          .left-arrow {
            left: 25%;
          }
          .right-arrow {
            right: 25%;
          }
        `}
      </style>
    </div>
  );
});

export default Portfolio;
