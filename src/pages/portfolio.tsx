import React, {FC, memo, useRef, useState} from 'react';

import DoesNotCommute from './scenes/doesnotcommutescene';
import StarfallScene from './scenes/starfallscene';
import ArgochamberScene from './scenes/argochamberscene';

const Portfolio: FC = memo(() => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);

  const scenes = [
    {
      component: (
        <StarfallScene
          isAnimationDone={isAnimationDone}
          isSceneLoaded={isSceneLoaded}
          key={1}
          mountRef={mountRef}
          setIsAnimationDone={setIsAnimationDone}
          setIsSceneLoaded={setIsSceneLoaded}
        />
      ),
    },
    {
      component: (
        <DoesNotCommute
          isAnimationDone={isAnimationDone}
          isSceneLoaded={isSceneLoaded}
          key={2}
          mountRef={mountRef}
          setIsAnimationDone={setIsAnimationDone}
          setIsSceneLoaded={setIsSceneLoaded}
        />
      ),
    },
    {
      component: (
        <ArgochamberScene
          isAnimationDone={isAnimationDone}
          isSceneLoaded={isSceneLoaded}
          key={3}
          mountRef={mountRef}
          setIsAnimationDone={setIsAnimationDone}
          setIsSceneLoaded={setIsSceneLoaded}
        />
      ),
    },
  ];

  // /////// HTML HANDLERS ///////
  //  // Handler for the left arrow click
  const handleLeftArrowClick = () => {
    setIsSceneLoaded(false);
    setCurrentScene(currentScene => currentScene - 1);
    // Implement what happens when the left arrow is clicked
    // For example, rotate the scene, move the camera, etc.
  };

  // // Handler for the right arrow click
  const handleRightArrowClick = () => {
    setIsSceneLoaded(false);
    setCurrentScene(currentScene => currentScene + 1);
    // Implement what happens when the right arrow is clicked
    // For example, rotate the scene, move the camera, etc.
  };
  // ////////////////////////////

  return (
    <div className="screen">
      {/* Conditional rendering of the loading indicator */}
      {!isSceneLoaded || !isAnimationDone ? (
        <div className="crt loading-text">
          <h1>Loading...</h1>
        </div>
      ) : null}
      {isSceneLoaded && isAnimationDone ? (
        <div>
          {currentScene > 0 && ( // Check if currentScene is greater than 1
            <button className="arrow left-arrow" onClick={handleLeftArrowClick}>
              &lt;
            </button>
          )}
          {currentScene < (scenes.length-1) && (
              <button className="arrow right-arrow" onClick={handleRightArrowClick}>
              &gt;
            </button>
          )}
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
                font-size: 130px;
                cursor: pointer;
                z-index: 10;
              }
              .left-arrow {
                left: 10px;
              }
              .right-arrow {
                right: 10px;
              }
            `}
          </style>
        </div>
      ) : null}
      {scenes[currentScene].component}
    </div>
  );
});
export default Portfolio;
