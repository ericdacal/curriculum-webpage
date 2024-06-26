import {Camera, Scene, Vector3} from 'three';
import {CSS3DObject, CSS3DRenderer} from 'three/examples/jsm/renderers/CSS3DRenderer';

export const setupCssRenderer = (scene: Scene, camera: Camera, container: HTMLDivElement, src: string, position: Vector3,  scale: Vector3) => {
  /////// Iframe Config ///////
  const iframeElement = document.createElement('iframe');
  iframeElement.src = src;
  iframeElement.style.width = 800 + 'px';
  iframeElement.style.height = 600 + 'px';
  //////////////////////////////////

  // Convert the HTML element into a CSS3DObject and add it to the scene
  const cssObject = new CSS3DObject(iframeElement);
  cssObject.position.copy(position);
  //cssObject.position.set(-0.0153, 0.39, 0.57); // Position as needed
  cssObject.rotation.x = 0;
  cssObject.scale.copy(scale);
  
  //cssObject.scale.set(0.00026, 0.0003, 0.00028);

  scene.add(cssObject);

  // Setup CSS3DRenderer
  const cssRenderer = new CSS3DRenderer();
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.domElement.style.position = 'absolute';
  cssRenderer.domElement.style.top = '0';
  container.appendChild(cssRenderer.domElement);
  container.style.position = 'relative';

  // Function to update the CSS3DRenderer on window resize
  const onWindowResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    cssRenderer.setSize(width, height);
  };
  window.addEventListener('resize', onWindowResize);

  return {
    cssRenderer,
    updateCss: () => cssRenderer.render(scene, camera),
    disposeCss: () => {
      window.removeEventListener('resize', onWindowResize);
      container.removeChild(cssRenderer.domElement);
    },
  };
};
