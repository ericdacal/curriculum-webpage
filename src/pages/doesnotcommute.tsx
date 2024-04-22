import React, {FC, memo} from 'react';
import Carousel from 'react-bootstrap/Carousel';

const DoesNotCommute: FC = memo(() => {
  return (
    <div className="crt-starfall">
      <Carousel>
        <Carousel.Item>
          <img alt="Presentation slide" src="slides/starfall/slide1.webp"></img>
          <Carousel.Caption>
            <h1>Does not commute</h1>
            <p>Bachelor Degree's project where we create a Does not commute game using Unity</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img alt="First slide" src="slides/starfall/slide1.webp"></img>
          <Carousel.Caption>
            <h1>Programmer</h1>
            <p>In this project I worked as a main programmer</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
});
export default DoesNotCommute;
