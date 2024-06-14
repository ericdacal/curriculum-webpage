import React, {FC, memo, useEffect,useRef} from 'react';
import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import {setupCssRenderer} from '../../utils/cssRenderer/CssRenderer';
import {animateCameraToPosition, loadModelAtPosition, ModelType} from '../../utils/three-utils';

interface ArgochamberSceneProps {
  isAnimationDone: boolean;
  isSceneLoaded: boolean;
  mountRef: React.RefObject<HTMLDivElement>;
  setIsAnimationDone: (value: boolean) => void;
  setIsSceneLoaded: (value: boolean) => void;
}

const ArgochamberScene: FC<ArgochamberSceneProps> = memo(
  ({isAnimationDone, isSceneLoaded, mountRef, setIsAnimationDone, setIsSceneLoaded}) => {
    const isOrbitingRef = useRef(true);
    const mixerRef = useRef<THREE.AnimationMixer | undefined>(undefined);
    const lastOrbitPositionRef = useRef<THREE.Vector3>(new THREE.Vector3());

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

      const onClick = (event: MouseEvent) => {
        const isArrowClick = (event.target as HTMLElement).classList.contains('arrow');
        if (!isArrowClick) {
          lastOrbitPositionRef.current = camera.position.clone();
          animateCameraToPosition(
            composer,
            renderer,
            scene,
            camera,
            new THREE.Vector3(0, 0.47, 0.85),
            new THREE.Euler(0, 0, 0),
            new THREE.Vector3(0, 0, -1),
            2000,
            updateCss,
            mixerRef.current
          );
          isOrbitingRef.current = false;
          //animateCameraToFrontView();
          if (currentRef) {
            currentRef.addEventListener('click', onClickRaycast);
            currentRef.removeEventListener('click', onClick);
          }
        }
      };

      function onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        composer.setSize(width, height);
      }

      const onClickRaycast = (event: MouseEvent) => {
        // Check if the click was on the lateral arrows
        const isArrowClick = (event.target as HTMLElement).classList.contains('arrow');

        if (!isArrowClick) {
          // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

          // Update the picking ray with the camera and mouse position
          raycaster.setFromCamera(mouse, camera);

          // Calculate objects intersecting the picking ray
          const intersects = raycaster.intersectObjects(scene.children, true);
          let isArcadeMachineClicked = false;
          for (const intersect of intersects) {
            isArcadeMachineClicked = isArcadeMachineClicked || intersect.object.name === 'ArcadeMachine';
          }
          if (!isArcadeMachineClicked) {
            animateCameraToPosition(
              composer,
              renderer,
              scene,
              camera,
              lastOrbitPositionRef.current,
              new THREE.Euler(),
              new THREE.Vector3(0, 0, 0),
              1000,
              updateCss,
              mixerRef.current
            );
            isOrbitingRef.current = true;
            if (currentRef) {
              currentRef.addEventListener('click', onClick);
              currentRef.removeEventListener('click', onClickRaycast);
            }
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
      renderer.toneMappingExposure = 2.3;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.shadowMap.enabled = true;
      ////////////////////////////

      /////// ADD EFFECTS ///////
      const composer = new EffectComposer(renderer);
      composer.setSize(window.innerWidth, window.innerHeight);

      // Add RenderPass
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85); // Adjust parameters as needed
      composer.addPass(bloomPass);
      ////////////////////////////

      /////// SETUP CSS3DRenderer /////
      if (mountRef.current === null) {
        console.error('Mount ref is null.');
        return;
      }

      const {updateCss, disposeCss} = setupCssRenderer(
        scene,
        camera,
        mountRef.current,
        'https://eric-dacal.vercel.app/doesnotcommute',
        new THREE.Vector3(-0.0153, 0.39, 0.57)
      );
      ////////////////////////////


      /////// EQUIRECTANGULAR BACKGROUND ///////
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load('space.png', function (texture) {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
        rt.fromEquirectangularTexture(renderer, texture);
        scene.background = rt.texture;
      });
      ////////////////////////////
      
      
      ////////////////////////////
      //const materialParams = {color: 0xbcbcbc, roughness: 0.1, metalness: 0}
      const materialParams = {color: 0xffffff};
      const modelType: ModelType = 'gltf';
      //const boxType: ModelType = 'box';
      //const planeType: ModelType = 'plane';
      //const cylinderType: ModelType = 'cylinder';

      /////// MODELS LOAD  ///////
      const modelsToLoad = [
        {
          type: modelType,
          path: 'models\\argochamber\\argochamber_wall.glb',
          position: new THREE.Vector3(-0.9, 0.34, -0.3),
          rotation: new THREE.Euler(0, 0, 0),
          scale: new THREE.Vector3(0.2, 0.2, 0.2),
          material: materialParams,
          customMaterial: undefined,
        },
        {
          type: modelType,
          path: 'futuristic_computer.glb',
          position: new THREE.Vector3(0, 0.016, 0.65),
          rotation: new THREE.Euler(0, (3 * Math.PI) / 2),
          scale: new THREE.Vector3(0.08, 0.08, 0.08),
          material: materialParams,
          customMaterial: undefined,
        },
        //{type: planeType, path: '', position: new THREE.Vector3(-0.02,0.4,0.05), rotation: new THREE.Euler(0,2*Math.PI,0), scale: new THREE.Vector3(0.2,0.17,1), material: materialParams, customMaterial: crtMaterial},
        // {
        //   type: boxType,
        //   path: '',
        //   position: new THREE.Vector3(0, 0.5, -0.7),
        //   rotation: new THREE.Euler(0, 0, 0),
        //   scale: new THREE.Vector3(15, 1, 1),
        //   material: wallMaterial,
        //   customMaterial: undefined,
        // },
        // {
        //   type: boxType,
        //   path: '',
        //   position: new THREE.Vector3(-1.5, 0.5, -0.7),
        //   rotation: new THREE.Euler(0, Math.PI / 2, 0),
        //   scale: new THREE.Vector3(15, 1, 1),
        //   material: wallMaterial,
        //   customMaterial: undefined,
        // },
        // {
        //   type: cylinderType,
        //   path: '',
        //   position: new THREE.Vector3(0, 0, -0.183),
        //   rotation: new THREE.Euler(0, 0, Math.PI / 2),
        //   scale: new THREE.Vector3(0.02, 10, 0.02),
        //   material: emissionMaterialParams,
        //   customMaterial: undefined,
        // },
      ];
      Promise.all(
        modelsToLoad.map(model => {
          return loadModelAtPosition(
            model.type,
            model.path,
            model.position,
            model.rotation,
            model.scale,
            scene,
            model.material,
            model.customMaterial,
          ).then(loadedModel => {
            // Here, you check if the loaded model is the roof vent and set the ref accordingly
            // if (model.path.includes('roof-vent')) {
            //   roofVentRef.current = loadedModel;
            // }
            return loadedModel; // Return the loaded model for consistency
          });
        }),
      )
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
      // const light = new THREE.DirectionalLight(0xffffff, 0.4);
      // light.position.set(0, 9, 6);
      // light.castShadow = true;
      // light.shadow.mapSize.width = 1024; // Default is 512
      // light.shadow.mapSize.height = 1024;
      // // light.shadow.camera.left = -5;
      // // light.shadow.camera.right = 5;
      // // light.shadow.camera.top = 5;
      // // light.shadow.camera.bottom = -5;
      // // light.shadow.camera.near = 0.5;
      // // light.shadow.camera.far = 500;
      // scene.add(light);

      // const light = new THREE.HemisphereLight(0xffffff, 0xfffffff,0.4);
      // light.castShadow = true;
      // scene.add(light);

      const pointLight = new THREE.PointLight(0xffffff, 1, 0, 3);
      pointLight.position.set(-0.1, 1.3, 1.9);
      pointLight.castShadow = true;
      pointLight.shadow.camera.far = 500;
      pointLight.shadow.mapSize.width = 1024; // Default is 512
      pointLight.shadow.mapSize.height = 1024;
      pointLight.shadow.bias = -0.0001;
      scene.add(pointLight);

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
        const center = new THREE.Vector3(0, 0, 0.55); 
        const radius = 1; // Example value, adjust as needed
        const height = 1; // Height from the base, creates a diagonal angle
        const minAngle = -(Math.PI / 6);
        const maxAngle = Math.PI / 3;

        if (isOrbitingRef.current) {
          // Update the angle for the orbit
          angle += angleIncrement;

          // Reverse direction at limits
          if (angle <= minAngle || angle >= maxAngle) {
            angleIncrement = -angleIncrement; // Reverse the increment direction
          }

          camera.position.x = center.x + radius * Math.sin(angle);
          camera.position.z = center.z + radius * Math.cos(angle);
          camera.position.y = height;
          camera.lookAt(center);
        }
        // if (roofVentRef.current) {
        //   roofVentRef.current.rotation.y += 0.01; // Adjust rotation speed as needed
        // }
        mixerRef.current?.update(0.01)
        renderer.render(scene, camera);
        composer.render();
        updateCss();
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
        scene.traverse(object => {
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
        composer.dispose();
        disposeCss();
      };
    }, [mountRef, setIsAnimationDone, setIsSceneLoaded]);

    return (
      <div className={`portfolio-container ${!isSceneLoaded || !isAnimationDone ? 'hidden' : ''}`} ref={mountRef} />
    );
  },
);

export default ArgochamberScene;
