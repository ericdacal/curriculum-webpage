import React, {FC, memo} from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Tutorial: FC = memo(() => {
    return (
      <div className='crt-starfall'>
          <Carousel>
          <Carousel.Item>
              <img src='slides/tutorial/tutorial.png'></img>
              <Carousel.Caption>
                <h1>Interactive Portfolio</h1>
                <p>This is an Interactive Portfolio created with Three.js and React</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src='slides/tutorial/tutorial.png'></img>
              <Carousel.Caption>
                <h1>Programmer</h1>
                <p>In this project I worked as a main programmer</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
      </div>
      );
});
export default Tutorial;