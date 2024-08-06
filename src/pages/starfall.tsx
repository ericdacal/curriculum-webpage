import React, {FC, memo} from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Starfall: FC = memo(() => {
  return (
    <div className="crt-starfall">
      <Carousel>
        <Carousel.Item>
          <img alt="Presentation slide" src="slides/starfall/1.png"></img>
          <Carousel.Caption>
            <h1>Starfall Rebellion</h1>
            <p>Master's Degree Project, where we develop a  Lego Star Wars game<a href="https://starfall-rebellion.vercel.app/" target="_blank">(Web)</a><a href="https://github.com/Horizons-Games/Axolotl-Engine" target="_blank">(Github)</a></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img alt="First slide" src="slides/starfall/slide1.webp"></img>
          <Carousel.Caption>
            <h1>Art Director and Programmer</h1>
            <p>In this project I worked as Art Director and Programmer</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img alt="Second slide" src="slides/starfall/slide2.png"></img>
          <Carousel.Caption>
            <h1>Character Concept & Design</h1>
            <p>I conceptualize and design one of the main characters Bix</p>
          </Carousel.Caption>  
        </Carousel.Item>
        <Carousel.Item>
          <img alt="Third slide" src="slides/starfall/slide3.png"></img>
          <Carousel.Caption>
            <h1>Characters Modelling & Texturing</h1>
            <p>I model and texture some characters of the game</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img alt="Fourth slide" src="slides/starfall/slide4.png"></img>
          <Carousel.Caption>
            <h1>Props Modelling & Texturing</h1>
            <p>I model and texture some props and enviroment models</p>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <div className="carousel-background">
            <img alt="Fifth slide" src="slides/starfall/slide_base.png" className="background-image"></img>
            <img alt="Character 1" src="slides/starfall/bith_animation.gif" className="overlay-gif" style={{ width: '409px', height: '220px', top: "35%", left:"-3%" }} ></img>
            <img alt="Character 2" src="slides/starfall/human_animation.gif" className="overlay-gif" style={{  width: "409px",height:"220px",top: "35%",left:"30%" }}></img>
            <img alt="Character 2" src="slides/starfall/bix_animation.gif" className="overlay-gif" style={{  width: "320px",height:"264px",top: "25%", left: "64%" }}></img>
          </div>
          <Carousel.Caption>
            <h1>Animated Characters</h1>
            <p>Creation of animation for Character</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-background">
            <img alt="Sixth slide" src="slides/starfall/slide_6.png" className="background-image"></img>
            <img alt="Character 1" src="slides/starfall/animation1.gif" className="overlay-gif" style={{  width: "390px",height:"164px",top: "42%", left: "40%" }}></img>
            <img alt="Character 2" src="slides/starfall/animation2.gif" className="overlay-gif" style={{ width: "390px",height:"164px",top: "15%",left: "10%"}}></img>
          </div>
          <Carousel.Caption>
            <h1>Animated Characters</h1>
            <p>Creation of animation for Character</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-background">
            <img alt="Sixth slide" src="slides/starfall/slide_6.png" className="background-image"></img>
            <img alt="Allura VFX" src="slides/starfall/alura_vfx.gif" className="overlay-gif" style={{ width: "370px",height:"244px",top: "10%",left: "8%"}}></img>
            <img alt="Bix VFX" src="slides/starfall/bix_vfx.gif" className="overlay-gif" style={{  width: "390px",height:"264px",top: "40%", left: "55%" }}></img>
          </div>
          <Carousel.Caption>
            <h1>VFX for main character</h1>
            <p>Creation and design of VFX for some skill of main characters</p>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <div className="carousel-background">
            <img alt="Sixth slide" src="slides/starfall/slide_6.png" className="background-image"></img>
            <img alt="Skybox" src="slides/starfall/skybox.gif" className="overlay-gif" style={{ width: "345px",height:"146px",top: "15%",left: "6%" }}></img>
            <img alt="Skybox Image" src="slides/starfall/skybox_select.png" className="overlay-gif" style={{ width: "345px",height:"146px",top: "48%",left: "50%" }}></img>
          </div>
          <Carousel.Caption>
            <h1>Engine Skybox System</h1>
            <p>Working in a system to can change between diferent Skybox in scene</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-background">
            <img alt="Sixth slide" src="slides/starfall/slide_6.png" className="background-image"></img>
            <img alt="Skybox" src="slides/starfall/cubemap.gif" className="overlay-gif" style={{ width: "710px",height:"232px",top: "20%",left: "5%" }}></img>
          </div>
          <Carousel.Caption>
            <h1>Engine Cubemap System</h1>
            <p>Working in a system to can change between diferent Cubemaps in scene</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-background">
            <img alt="Sixth slide" src="slides/starfall/slide_6.png" className="background-image"></img>
            <img alt="Emission Map" src="slides/starfall/emission.webp" className="overlay-gif" style={{ width: "690px",height:"212px",top: "20%",left: "8%" }}></img>
          </div>
          <Carousel.Caption>
            <h1>Emisson Map</h1>
            <p>Working in Emission Map integration in Engine</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-background">
            <img alt="Sixth slide" src="slides/starfall/slide_6.png" className="background-image"></img>
            <img alt="Emission Map" src="slides/starfall/slide0.webp" className="overlay-gif" style={{ width: "690px",height:"312px",top: "15%",left: "8%" }}></img>
          </div>
          <Carousel.Caption>
            <h1>Texture Compression Integration</h1>
            <p>Implementation of Texture Compression in Engine</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-background">
            <img alt="Sixth slide" src="slides/starfall/slide_6.png" className="background-image"></img>
            <video loop autoPlay muted src="slides/starfall/videocomponent.mp4" className="overlay-gif" style={{ width: "680px",height:"216px",top: "20%",left: "0%" }}></video>
          </div>
          <Carousel.Caption>
            <h1>Integration of Video Component in Engine</h1>
            <p>Implementation of Video Component in Engine to can reproduce Cutscenes</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <style>
      {`
          a {
              color: yellow; 
              text-decoration: none;
          }
      `}
      </style>
    </div>
  );
});
export default Starfall;
