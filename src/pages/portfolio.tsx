import React, { FC, memo, useEffect, useRef, useState } from 'react';

import DoesNotCommute from './scenes/doesnotcommutescene';
import StarfallScene from './scenes/starfallscene';
import ArgochamberScene from './scenes/argochamberscene';

const Portfolio: FC = memo(() => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [isStarted, setIsStarted] = useState(false); // Nueva variable de estado para controlar el inicio

  const sceneMusicMap = [
    'audio\\canteen.wav',
    'audio\\canteen.wav',
    'audio\\canteen.wav'
  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const startExperience = () => {
    setIsStarted(true);

    const newAudio = new Audio(sceneMusicMap[currentScene]);
    newAudio.loop = true;
    newAudio.play();
    audioRef.current = newAudio;
  };

  useEffect(() => {
    if (isStarted) {
      // Detener la música actual si existe
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Crear un nuevo elemento de audio y reproducir la nueva pista
      const newAudio = new Audio(sceneMusicMap[currentScene]);
      newAudio.loop = true;
      newAudio.play();
      audioRef.current = newAudio;

      // Limpiar el audio cuando el componente se desmonte
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
    return () => {}
  }, [currentScene, isStarted]);

  const handleLeftArrowClick = () => {
    setIsSceneLoaded(false);
    setCurrentScene((currentScene) => currentScene - 1);
  };

  const handleRightArrowClick = () => {
    setIsSceneLoaded(false);
    setCurrentScene((currentScene) => currentScene + 1);
  };

  if (!isStarted) {
    return (
      <div className="start-screen">
        <button onClick={startExperience}>Start Experience</button>
      </div>
    );
  }

  return (
    <div className="screen">
      {!isSceneLoaded || !isAnimationDone ? (
        <div className="crt loading-text">
          <h1>Loading...</h1>
        </div>
      ) : null}
      {isSceneLoaded && isAnimationDone ? (
        <div>
          {currentScene > 0 && (
            <button className="arrow left-arrow" onClick={handleLeftArrowClick}>
              &lt;
            </button>
          )}
          {currentScene < scenes.length - 1 && (
            <button className="arrow right-arrow" onClick={handleRightArrowClick}>
              &gt;
            </button>
          )}
          <style>
            {`
              .portfolio-container {
                position: relative;
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
