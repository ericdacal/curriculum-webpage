import React, {FC, Fragment, memo, useEffect} from 'react';
import {Unity, useUnityContext} from 'react-unity-webgl';

const Portfolio: FC = memo(() => {
  const unityConfig = React.useMemo(() => ({
    loaderUrl: 'PortfolioWeb/Build/PortfolioWeb.loader.js',
    dataUrl: 'PortfolioWeb/Build/PortfolioWeb.data.br',
    frameworkUrl: 'PortfolioWeb/Build/PortfolioWeb.framework.js.br',
    codeUrl: 'PortfolioWeb/Build/PortfolioWeb.wasm.br',
  }), []);

  const {unityProvider, requestFullscreen, requestPointerLock} = useUnityContext(unityConfig);

  const unityStyle = React.useMemo(() => ({
    height: 600, 
    width: 800
  }), []);

  useEffect(() => {
    document.addEventListener('click', requestPointerLock);
    return () => {
      document.removeEventListener('click', requestPointerLock);
    };
  }, [requestPointerLock]);

  function handleClickEnterFullscreen() {
    requestFullscreen(true);
  }

  return (
    <Fragment>
      <div className="center-container">
        <Unity style={unityStyle} unityProvider={unityProvider} />
        <button onClick={handleClickEnterFullscreen}>Enter Fullscreen</button>
      </div>
    </Fragment>
  );
});

export default Portfolio;