import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

export type ModelType = 'gltf' | 'box' | 'sphere' | 'cylinder';

export function loadModelAtPosition(
  type: ModelType, 
  pathOrGeometry: string | THREE.BufferGeometry, 
  position: THREE.Vector3, 
  rotation: THREE.Euler, 
  scale: THREE.Vector3, 
  scene: THREE.Scene,
  materialParams: THREE.MeshStandardMaterialParameters = {color: 0x7561A5} // Default material color
): Promise<THREE.Object3D> {
  return new Promise((resolve, reject) => {
    if (type === 'gltf') {
      const loader = new GLTFLoader();
      loader.load(pathOrGeometry as string, (gltf) => {
        const model: THREE.Object3D = gltf.scene;
        setupModel(model, position, rotation, scale, scene);
        resolve(model);
      }, undefined, (error) => handleError(error, reject));
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
        default:
          reject(new Error('Unsupported geometry type'));
          return;
      }
      
      const material = new THREE.MeshStandardMaterial(materialParams);
      const mesh = new THREE.Mesh(geometry, material);
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
