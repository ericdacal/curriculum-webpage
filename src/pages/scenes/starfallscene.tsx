import React, { FC, memo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {animateCameraToPosition,loadModelAtPosition,ModelType} from '../../utils/three-utils';
import { setupCssRenderer } from '../../utils/cssRenderer/CssRenderer';

interface StarfallSceneProps {
  isAnimationDone: boolean;
  isSceneLoaded: boolean;
  mountRef: React.RefObject<HTMLDivElement>;
  setIsAnimationDone: (value: boolean) => void;
  setIsSceneLoaded: (value: boolean) => void;

}

const StarfallScene: FC<StarfallSceneProps> = memo(({ isAnimationDone, isSceneLoaded, mountRef, setIsAnimationDone, setIsSceneLoaded }) => {
    const isOrbitingRef = useRef(true);
    const roofVentRef = useRef<THREE.Object3D | null>(null);

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
            if(!isArrowClick) {
            animateCameraToPosition(composer,renderer, scene, camera, new THREE.Vector3(0, 0.47, 0.17), new THREE.Euler(0, 0, 0),new THREE.Vector3(0, 0, -1), 2000, updateCss)
            isOrbitingRef.current = false
            //animateCameraToFrontView();
            if (currentRef) {
                currentRef.addEventListener('click', onClickRaycast); 
                currentRef.removeEventListener('click', onClick);
            }
            }
        }

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
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        
            // Update the picking ray with the camera and mouse position
            raycaster.setFromCamera(mouse, camera);
        
            // Calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects(scene.children, true);
            let isArcadeMachineClicked = false;
            for (const intersect of intersects) {
                isArcadeMachineClicked = isArcadeMachineClicked || intersect.object.name === 'ArcadeMachine';
            }
            if (!isArcadeMachineClicked) {
                animateCameraToPosition(composer, renderer, scene, camera, new THREE.Vector3(0, 1, 1), new THREE.Euler(), new THREE.Vector3(0, 0, 0), 1000, updateCss);
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
        
        const { updateCss, disposeCss } = setupCssRenderer(scene, camera, mountRef.current, 'http://localhost:3000/starfall');
        ////////////////////////////

        /////// ADD CREATE CUSTOM MATERIALS ///////
        /////// GROUND MATERIAL ///////
        const repeatValueGround = 125
        const groundBaseColor =  new THREE.TextureLoader().load('ground\\Ground_basecolor.png')
        groundBaseColor.repeat.set(repeatValueGround,repeatValueGround)
        groundBaseColor.wrapS = groundBaseColor.wrapT = THREE.RepeatWrapping;
        const groundMetallicMap =  new THREE.TextureLoader().load('ground\\Ground_metallic.png')
        groundMetallicMap.repeat.set(repeatValueGround,repeatValueGround)
        groundMetallicMap.wrapS = groundMetallicMap.wrapT = THREE.RepeatWrapping;
        const groundNormalMap =  new THREE.TextureLoader().load('ground\\Ground_normal.png')
        groundNormalMap.repeat.set(repeatValueGround,repeatValueGround)
        groundNormalMap.wrapS = groundNormalMap.wrapT = THREE.RepeatWrapping;
        const groundMaterial = {
            map: groundBaseColor, // base color texture
            metalnessMap: groundMetallicMap, // metallic texture
            normalMap: groundNormalMap, // normal map texture
            receiveShadow: true
        }

        ////////////////////////////

        /////// Wall MATERIAL ///////
        const repeatValueWall = 40
        const wallBaseColor =  new THREE.TextureLoader().load('wall\\BarWall_basecolor.png')
        wallBaseColor.repeat.set(repeatValueWall,2)
        wallBaseColor.wrapS = wallBaseColor.wrapT = THREE.RepeatWrapping;
        const wallMetallicMap =  new THREE.TextureLoader().load('wall\\BarWall_metallic.png')
        wallMetallicMap.repeat.set(repeatValueWall,2)
        wallMetallicMap.wrapS = wallMetallicMap.wrapT = THREE.RepeatWrapping;
        const wallNormalMap =  new THREE.TextureLoader().load('wall\\BarWall_normal.png')
        wallNormalMap.repeat.set(repeatValueWall,2)
        wallNormalMap.wrapS = wallNormalMap.wrapT = THREE.RepeatWrapping;
        const wallMaterial = {
            map: wallBaseColor, // base color texture
            metalnessMap: wallMetallicMap, // metallic texture
            normalMap: wallNormalMap, // normal map texture
            receiveShadow: true
        }
        const emissionMaterialParams = {
            color: 0x00ff00, // Base color of the material
            emissive: 0xff0000, // Emissive color (red in this case)
            emissiveIntensity: 2.5, // Intensity of the emissive effect
        }
        ////////////////////////////
        ////////////////////////////


        //const materialParams = {color: 0xbcbcbc, roughness: 0.1, metalness: 0}
        const materialParams = {color: 0xffffff}
        const modelType: ModelType = 'gltf';
        const boxType: ModelType = 'box';
        //const planeType: ModelType = 'plane';
        const cylinderType: ModelType = 'cylinder';
        
        /////// MODELS LOAD  ///////
        const modelsToLoad = [
            {type: modelType, path: "arcade_machine.glb", position: new THREE.Vector3(0,0,-0.0), rotation: new THREE.Euler(0,(3*Math.PI)/2), scale: new THREE.Vector3(0.1,0.1,0.1), material: materialParams, customMaterial:undefined},
            //{type: planeType, path: '', position: new THREE.Vector3(-0.02,0.4,0.05), rotation: new THREE.Euler(0,2*Math.PI,0), scale: new THREE.Vector3(0.2,0.17,1), material: materialParams, customMaterial: crtMaterial},
            {type: boxType, path: '', position: new THREE.Vector3(0, -0.1, 0), rotation: new THREE.Euler(Math.PI/2, 0, 0), scale: new THREE.Vector3(100, 100, 0.1), material: groundMaterial, customMaterial:undefined},
            {type: boxType, path: '', position: new THREE.Vector3(0, 0.5, -0.7), rotation: new THREE.Euler(0, 0, 0), scale: new THREE.Vector3(15, 1, 1), material: wallMaterial, customMaterial:undefined},
            {type: boxType, path: '', position: new THREE.Vector3(-1.5, 0.5, -0.7), rotation: new THREE.Euler(0, Math.PI/2, 0), scale: new THREE.Vector3(15, 1, 1), material: wallMaterial, customMaterial:undefined},
            {type: cylinderType, path: '', position: new THREE.Vector3(0, 0, -0.183), rotation: new THREE.Euler(0, 0,  Math.PI/2), scale: new THREE.Vector3(0.02, 10, 0.02), material: emissionMaterialParams, customMaterial:undefined},
            {type: cylinderType, path: '', position: new THREE.Vector3(-1, 0, -0.183), rotation: new THREE.Euler(0, Math.PI/2,  Math.PI/2), scale: new THREE.Vector3(0.02, 10, 0.02), material: emissionMaterialParams, customMaterial:undefined},
            {type: modelType, path: "sign\\neon_sign.glb", position: new THREE.Vector3(0,0.6,-0.2), rotation: new THREE.Euler(Math.PI/2, 0, 0), scale: new THREE.Vector3(0.2,0.2,0.2), material: emissionMaterialParams, customMaterial:new THREE.MeshStandardMaterial(emissionMaterialParams)},
            {type: modelType, path: "roof-vent\\roof_vent.glb", position: new THREE.Vector3(0,0.8,1.15), rotation: new THREE.Euler(0,0,0), scale: new THREE.Vector3(0.1,0.1,0.1), material: materialParams, customMaterial:undefined},
            {type: modelType, path: "stool\\stool.glb", position: new THREE.Vector3(0.5,0.1,0), rotation: new THREE.Euler(0,0,0), scale: new THREE.Vector3(0.035,0.035,0.035), material: materialParams, customMaterial:undefined},
            {type: modelType, path: "table\\table.glb", position: new THREE.Vector3(0.69,0.0,0), rotation: new THREE.Euler(0,0,0), scale: new THREE.Vector3(0.07,0.07,0.07), material: materialParams, customMaterial:undefined},
            {type: modelType, path: "pub\\pub.glb", position: new THREE.Vector3(0.895,0.05,0), rotation: new THREE.Euler(0,0,0), scale: new THREE.Vector3(0.07,0.07,0.07), material: materialParams, customMaterial:undefined},
            {type: modelType, path: "stool\\stool.glb", position: new THREE.Vector3(0.1,0.1,0.6), rotation: new THREE.Euler(0,0,0), scale: new THREE.Vector3(0.035,0.035,0.035), material: materialParams, customMaterial:undefined},
            {type: modelType, path: "table\\table.glb", position: new THREE.Vector3(0.29,0.0,0.6), rotation: new THREE.Euler(0,0,0), scale: new THREE.Vector3(0.07,0.07,0.07), material: materialParams, customMaterial:undefined}
        ];
        Promise.all(modelsToLoad.map(model => {
            return loadModelAtPosition(model.type, model.path, model.position, model.rotation, model.scale, scene, model.material, model.customMaterial)
            .then(loadedModel => {
                // Here, you check if the loaded model is the roof vent and set the ref accordingly
                if (model.path.includes("roof-vent")) {
                roofVentRef.current = loadedModel;
                }
                return loadedModel; // Return the loaded model for consistency
            });
        }))
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
            const radius = 1; // Example value, adjust as needed
            const height = 1; // Height from the base, creates a diagonal angle
            const minAngle = -(Math.PI/6);
            const maxAngle = Math.PI/3;
        
        
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
            if (roofVentRef.current) {
            roofVentRef.current.rotation.y += 0.01; // Adjust rotation speed as needed
            }
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
            composer.dispose();
            disposeCss();
        };
        }, []);
    
        return (
            <div className={`portfolio-container ${!isSceneLoaded || !isAnimationDone ? 'hidden' : ''}`} ref={mountRef} />
        );
});

export default StarfallScene;
