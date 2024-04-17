import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { Scene, Camera } from 'three';

export const setupCssRenderer = (scene: Scene, camera: Camera, container: HTMLDivElement, src: string) => {

    /////// Iframe Config ///////
    const iframeElement = document.createElement('iframe');
    iframeElement.src = src;
    iframeElement.style.width = (420000 * 0.0007) + 'px';
    iframeElement.style.height = (100000 * 0.0015) + 'px';
    //////////////////////////////////

    // Convert the HTML element into a CSS3DObject and add it to the scene
    const cssObject = new CSS3DObject(iframeElement);
    cssObject.position.set(-0.0155, 0.39, 0.02); // Position as needed
    cssObject.rotation.x = 0;
    cssObject.scale.set(0.0007,0.0015,0.001);

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
        // cssRenderer.setSize(container.offsetWidth, container.offsetHeight);

        // // Update iframe scale to maintain aspect ratio
        // const aspectRatio = iframeElement.offsetWidth / iframeElement.offsetHeight;
        // const newWidth = container.offsetWidth;
        // const newHeight = newWidth / aspectRatio;
        // iframeElement.style.width = `${newWidth}px`;
        // iframeElement.style.height = `${newHeight}px`;

        // // Adjust CSS3DObject scale accordingly
        // const scaleX = newWidth / parseFloat(width);
        // const scaleY = newHeight / parseFloat(height);
        // cssObject.scale.set(scaleX, scaleY, cssObject.scale.z); // Preserve original z scale
    };
    window.addEventListener('resize', onWindowResize);

    return {
        cssRenderer,
        updateCss: () => cssRenderer.render(scene, camera),
        disposeCss: () => {
            window.removeEventListener('resize', onWindowResize);
            container.removeChild(cssRenderer.domElement);
        }
    };
};