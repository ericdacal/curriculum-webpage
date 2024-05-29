import React, { FC, memo, useEffect, useRef, useState } from 'react';

import DoesNotCommute from './scenes/doesnotcommutescene';
import StarfallScene from './scenes/starfallscene';
import ArgochamberScene from './scenes/argochamberscene';

const Portfolio: FC = memo(() => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [isStarted, setIsStarted] = useState(false); 
  const [isAudioPlaying, setIsAudioPlaying] = useState(true); 

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
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  useEffect(() => {
    if (isStarted && isSceneLoaded && isAnimationDone) {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const newAudio = new Audio(sceneMusicMap[currentScene]);
      newAudio.loop = true;
      newAudio.play();
      audioRef.current = newAudio;
      setIsAudioPlaying(true);

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
    return () => {};
  }, [currentScene, isStarted, isSceneLoaded, isAnimationDone]);

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
          <button className="audio-toggle" onClick={toggleAudio}>
            {isAudioPlaying ? '🔊' : '🔇'}
          </button>
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
              .audio-toggle {
                position: fixed;
                top: 10px;
                right: 10px;
                background-color: transparent;
                border: none;
                font-size: 30px;
                cursor: pointer;
                z-index: 10;
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
