import React, {FC, memo,useEffect, useRef, useState} from 'react';
import * as THREE from 'three';

import {animateCameraToPosition,loadModelAtPosition,ModelType} from '../utils/three-utils';

import crtVertShader from '../utils/shaders/crt-vert.glsl'
import crtFragShader from '../utils/shaders/crt-frag.glsl'

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Portfolio: FC = memo(() => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const isOrbitingRef = useRef(true);

  // /////// HTML HANDLERS ///////
  //  // Handler for the left arrow click
  // const handleLeftArrowClick = () => {
  //   console.log('Left arrow clicked');
  //   // Implement what happens when the left arrow is clicked
  //   // For example, rotate the scene, move the camera, etc.
  // };

  // // Handler for the right arrow click
  // const handleRightArrowClick = () => {
  //   console.log('Right arrow clicked');
  //   // Implement what happens when the right arrow is clicked
  //   // For example, rotate the scene, move the camera, etc.
  // };
  // ////////////////////////////

  
  useEffect(() => {
    const currentRef = mountRef.current;
     /////// Loading Text ///////
    const loadingText = document.querySelector('.loading-text h1');
    if (loadingText) {
      const handleAnimationEnd = () => setIsAnimationDone(true);
      loadingText.addEventListener('animationend', handleAnimationEnd);
    }
    ////////////////////////////////

    /////// THREE.JS related EVENTS ///////
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = () => {
      animateCameraToPosition(renderer, scene, camera, new THREE.Vector3(0, 0.47, 0.17), new THREE.Euler(0, 0, 0),new THREE.Vector3(0, 0, -1), 2000 )
      isOrbitingRef.current = false
      //animateCameraToFrontView();
      if (currentRef) {
        currentRef.addEventListener('click', onClickRaycast); 
        currentRef.removeEventListener('click', onClick);
      }
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

    const onClickRaycast = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
    
      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children, true);
      let isArcadeMachineClicked = false
      for (const intersect of intersects) {
        isArcadeMachineClicked = isArcadeMachineClicked || intersect.object.name === 'ArcadeMachine'
      }
      if (!isArcadeMachineClicked) {
        animateCameraToPosition(renderer, scene, camera, new THREE.Vector3(0, 1, 1), new THREE.Euler(), new THREE.Vector3(0, 0, 0), 1000 )
        isOrbitingRef.current = true;
        if (currentRef) {
          currentRef.addEventListener('click', onClick); 
          currentRef.removeEventListener('click', onClickRaycast);
        }
      }
    };
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
    renderer.shadowMap.enabled = true;


    // const pmremGenerator = new THREE.PMREMGenerator(renderer);
    // scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    ////////////////////////////

  
    const initialTexture = new THREE.TextureLoader().load('starfall-rebellion\\1.png');
    const uniforms = {
      tDiffuse: {value: initialTexture},
      scanlineIntensity: { value: 1 }
    };
    ////////////////////////////

  
    
    const materialParams = {color: 0xbcbcbc, roughness: 0.1, metalness: 0}
    const modelType: ModelType = 'gltf';
    const boxType: ModelType = 'box';
    const planeType: ModelType = 'plane';
    /////// MODELS LOAD  ///////
    const modelsToLoad = [
      {type: modelType, path: "arcade_machine.glb", position: new THREE.Vector3(0,0,0), rotation: new THREE.Euler(0,(3*Math.PI)/2), scale: new THREE.Vector3(0.1,0.1,0.1), material: materialParams},
      {type: planeType, path: '', position: new THREE.Vector3(-0.02,0.4,0.04), rotation: new THREE.Euler(0,2*Math.PI,0), scale: new THREE.Vector3(0.2,0.17,1), customMaterial: new THREE.ShaderMaterial({
        vertexShader: crtVertShader,
        fragmentShader: crtFragShader,
        uniforms: uniforms
      })},
      {type: boxType, path: '', position: new THREE.Vector3(0, -0.1, 0), rotation: new THREE.Euler(Math.PI/2, 0, 0), scale: new THREE.Vector3(100, 100, 0.1), material: materialParams},
    ];
    Promise.all(modelsToLoad.map(model => loadModelAtPosition(model.type, model.path, model.position, model.rotation, model.scale, scene, model.material, model.customMaterial)))
            .then(() => {
                isOrbitingRef.current = true;
                setIsSceneLoaded(true); // This is set once all models are loaded
                console.log('All models loaded');
            })
            .catch(error => {
                console.error('Error loading models:', error);
      });
    ////////////////////////////


    /////// LIGHTS CONFIG  ///////
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024; // Default is 512
    light.shadow.mapSize.height = 1024; 
    scene.add(light);
    ////////////////////////////

    /////// EQUIRECTANGULAR BACKGROUND ///////
    // const textureLoader = new THREE.TextureLoader();
    // textureLoader.load('background-scene.png', function(texture) {
    //   const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
    //   rt.fromEquirectangularTexture(renderer, texture);
    //   scene.background = rt.texture;
    // });
    ////////////////////////////

    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
      mountRef.current.addEventListener('click', onClick);
    }
    window.addEventListener('resize', onWindowResize);
    



    /////// ANIMATIONS ///////
    // const animateCameraToFrontView = () => {
    //   // Camera Config
    //   isOrbitingRef.current = false; 
    //   const frontViewPosition = new THREE.Vector3(0, 0.47, 0.17); // Example position in front of the object
    //   const lookAtPosition = new THREE.Vector3(0, 0, -1); // Assuming the object is at the origin
    //   const duration = 1000; // Duration of animation in milliseconds
      
    //   const startTime = performance.now();
    
    //   const initialPosition = camera.position.clone();
    //   const initialQuaternion = camera.quaternion.clone();
    //   const targetQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)); // Front view orientatio

    //   function animate() {
    //     const elapsedTime = performance.now() - startTime;
    //     const fraction = elapsedTime / duration;
    
    //     if (fraction < 1) {
    //       // Interpolate position
    //       camera.position.lerpVectors(initialPosition, frontViewPosition, fraction);
    //       // Interpolate rotation
    //       camera.quaternion.slerpQuaternions(initialQuaternion, targetQuaternion, fraction);
    //       requestAnimationFrame(animate);
    //     } else {
    //       // Ensure final position and rotation are set
    //       camera.position.copy(frontViewPosition);
    //       camera.quaternion.copy(targetQuaternion);
    //     }
    //     camera.lookAt(lookAtPosition);
    //     renderer.render(scene, camera);
    //   }
    
    //   animate();
    // };

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
    return () => {
      // Remove event listeners
      window.removeEventListener('resize', onWindowResize);
      if (currentRef) {
        currentRef.removeEventListener('click', onClick);
        currentRef.removeEventListener('click', onClickRaycast);
        // If you appended the renderer's DOM element, remove it
        currentRef.removeChild(renderer.domElement);
      }
  
      // Stop the animation
      // It's important to stop the requestAnimationFrame loop. For this, you can use a flag.
      isOrbitingRef.current = false; // Assuming this stops your animation loop.
  
      // Dispose of Three.js objects here
      // This is an example, adjust based on what objects you've created.
      renderer.dispose();
      //pmremGenerator.dispose();
      // If you have other disposables (textures, geometries, materials), dispose of them here.
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          if (mesh.geometry) {
            mesh.geometry.dispose();
          }
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(material => material.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div className='screen'>
      {/* Conditional rendering of the loading indicator */}
      {!isSceneLoaded || !isAnimationDone ? (
        <div className='crt loading-text'>
          <h1>Loading...</h1>
        </div>
      ) : null}
  
      {/* This div acts as the container for the Three.js scene and is always rendered in the DOM */}
      <div className={`portfolio-container ${!isSceneLoaded || !isAnimationDone ? 'hidden' : ''}`} ref={mountRef}></div>
    </div>
  );
});
export default Portfolio;