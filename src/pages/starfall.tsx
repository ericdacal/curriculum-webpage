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
          <img alt="Fifth slide" src="slides/starfall/slide0.webp"></img>
          <Carousel.Caption>
            <h1>Second Level</h1>
            <p>Desing, modelling and animation second level items</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-background">
            <img alt="Fifth slide" src="slides/starfall/slide_base.png" className="background-image"></img>
            <img alt="Character 1" src="slides/starfall/bith_animation.gif" className="overlay-gif gif1"></img>
            <img alt="Character 2" src="slides/starfall/human_animation.gif" className="overlay-gif gif2"></img>
            <img alt="Character 2" src="slides/starfall/bix_animation.gif" className="overlay-gif gif3"></img>
          </div>
          <Carousel.Caption>
            <h1>Animated Characters</h1>
            <p>Creation of animation for Character</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-background">
            <img alt="Sixth slide" src="slides/starfall/slide_5.png" className="background-image"></img>
            <img alt="Bix VFX" src="slides/starfall/bix_vfx.gif" className="overlay-gif gif3"></img>
            <img alt="Allura VFX" src="slides/starfall/alura_vfx.gif" className="overlay-gif gif4"></img>
          </div>
          <Carousel.Caption>
            <h1>VFX for main character</h1>
            <p>Creation and design of VFX for some skill of main characters</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img alt="Seventh slide" src="slides/starfall/slide0.webp"></img>
          <Carousel.Caption>
            <h1>Other Models</h1>
            <p>Another models</p>
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
