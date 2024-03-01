import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

export type ModelType = 'gltf' | 'box' | 'sphere' | 'cylinder' | 'plane';


export function loadModelAtPosition(
  type: ModelType,
  pathOrGeometry: string | THREE.BufferGeometry,
  position: THREE.Vector3,
  rotation: THREE.Euler,
  scale: THREE.Vector3,
  scene: THREE.Scene,
  materialParams: THREE.MeshStandardMaterialParameters = {color: 0x7561A5}, // Default material color
  customMaterial?: THREE.Material // Optional custom material parameter
): Promise<THREE.Object3D> {
  return new Promise((resolve, reject) => {
    if (type === 'gltf') {
      const loader = new GLTFLoader();
      loader.load(
        pathOrGeometry as string,
        (gltf) => {
          const model: THREE.Object3D = gltf.scene;
          setupModel(model, position, rotation, scale, scene);
          resolve(model);
        },
        undefined,
        (error) => handleError(error, reject)
      );
    } else {
      let geometry: THREE.BufferGeometry;
      switch (type) {
        case 'box':
          geometry = new THREE.BoxGeometry(1, 1, 1);
          break;
        case 'sphere':
          geometry = new THREE.SphereGeometry(0.5, 32, 32);
          break;
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
          break;
        case 'plane':
          geometry = new THREE.PlaneGeometry(1, 1); // Create a plane geometry
          break;
        default:
          reject(new Error('Unsupported geometry type'));
          return;
      }
      console.log(customMaterial)
      // Use custom material if provided, otherwise create a new material
      const material = customMaterial ? customMaterial : new THREE.MeshStandardMaterial(materialParams);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      setupModel(mesh, position, rotation, scale, scene);
      resolve(mesh);
    }
  });
}

function setupModel(model: THREE.Object3D, position: THREE.Vector3, rotation: THREE.Euler, scale: THREE.Vector3, scene: THREE.Scene) {
    model.position.copy(position);
    model.rotation.copy(rotation);
    model.scale.copy(scale);
    model.traverse((node: THREE.Object3D) => {
        if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        }
    });
    scene.add(model);
}


function handleError(err: unknown, reject: (reason?: unknown) => void) {
    if (err instanceof ErrorEvent) {
        console.error('An error happened during the model loading:', err.message);
    } else {
        console.error('An unexpected error happened during the model loading:', err);
    }
    reject(err);
}

export function animateCameraToPosition(composer: EffectComposer,renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, targetPosition: THREE.Vector3, targetEuler: THREE.Euler, lookAtPosition: THREE.Vector3, duration: number) {
  // Assume isOrbitingRef.current is available in your context for disabling orbiting
  
  const startTime = performance.now();

  // Create a dummy object to interpolate the lookAt position
  const dummyTarget = new THREE.Object3D();
  scene.add(dummyTarget);
  dummyTarget.position.copy(camera.position); // Start at the camera's current position
  
  const initialPosition = camera.position.clone();
  const initialQuaternion = camera.quaternion.clone();
  const targetQuaternion = new THREE.Quaternion().setFromEuler(targetEuler);

  function animate() {
    const elapsedTime = performance.now() - startTime;
    const fraction = elapsedTime / duration;

    if (fraction < 1) {
      // Interpolate camera position and rotation
      camera.position.lerpVectors(initialPosition, targetPosition, fraction);
      camera.quaternion.slerpQuaternions(initialQuaternion, targetQuaternion, fraction);

      // Interpolate dummy object's position towards the target lookAt position
      dummyTarget.position.lerpVectors(camera.position, lookAtPosition, fraction);
      camera.lookAt(dummyTarget.position); // Make the camera look at the dummy object
      
      requestAnimationFrame(animate);
    } else {
      // Ensure final position, rotation, and lookAt are set
      camera.position.copy(targetPosition);
      camera.quaternion.copy(targetQuaternion);
      camera.lookAt(lookAtPosition);
      scene.remove(dummyTarget); // Clean up dummy object
    }

    // Update the scene
    renderer.render(scene, camera);
    composer.render();
  }
  
  animate();
}
