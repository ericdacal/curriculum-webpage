import * as THREE from 'three';

export const createColorMaterial = (color: number, emissive?: number, emissiveIntensity?: number) => {
    return new THREE.MeshStandardMaterial({color:color, emissive: emissive, emissiveIntensity: emissiveIntensity});
}

export const createTextureMaterial = (albedoMapPath: string, metalnessMapPath: string, normalMapPath:string, receiveShadow: boolean, repeatX: number, repeatY: number) => {
  const textureBaseColor = new THREE.TextureLoader().load(albedoMapPath);
  textureBaseColor.repeat.set(repeatX, repeatY)
  textureBaseColor.wrapS = textureBaseColor.wrapT = THREE.RepeatWrapping;

  const textureMetalMap = new THREE.TextureLoader().load(metalnessMapPath);
  textureMetalMap.repeat.set(repeatX, repeatY)
  textureMetalMap.wrapS = textureMetalMap.wrapT = THREE.RepeatWrapping;

  const textureNormalMap = new THREE.TextureLoader().load(normalMapPath);
  textureNormalMap.repeat.set(repeatX, repeatY)
  textureNormalMap.wrapS = textureNormalMap.wrapT = THREE.RepeatWrapping;

  const textureMaterialParams = {
    map: textureBaseColor, // base color texture
    metalnessMap: textureMetalMap, // metallic texture
    normalMap: textureNormalMap, // normal map texture
    receiveShadow: receiveShadow
  }

  return new THREE.MeshBasicMaterial(textureMaterialParams);
};

export const createShaderMaterial = (vertexShaderMat: string, fragmentShaderMat: string, uniformsMat: { [uniform: string]: THREE.IUniform<any>}) => {
    return new THREE.ShaderMaterial({vertexShader: vertexShaderMat, fragmentShader: fragmentShaderMat, uniforms: uniformsMat})
};