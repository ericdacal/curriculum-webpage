import React, {FC, memo} from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Starfall: FC = memo(() => {
  return (
    <div className="crt-starfall">
      <Carousel>
        <Carousel.Item>
          <img alt="Presentation slide" src="slides/starfall/slide0.webp"></img>
          <Carousel.Caption>
            <h1>Starfall Rebellion</h1>
            <p>Master's Degree Project, where we develop a Lego Star Wars game</p>
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
          <img alt="Fourth slide" src="slides/starfall/slide0.webp"></img>
          <Carousel.Caption>
            <h1>Second Level</h1>
            <p>Desing, modelling and animation second level items</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img alt="Fifth slide" src="slides/starfall/slide0.webp"></img>
          <Carousel.Caption>
            <h1>Other Models</h1>
            <p>Another models</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
});
export default Starfall;
