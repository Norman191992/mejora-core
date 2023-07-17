import React from 'react';
import { Carousel, Button } from 'antd';

const Slider = () => {
    const carouselSettings = {
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Carousel {...carouselSettings}>
                <div>
                    <img src="slide3.jpg" alt="Imagen 1" />
                </div>
                <div>
                    <img src="slide4.jpg" alt="Imagen 2" />
                </div>
                <div>
                    <img src="slide1.jpg" alt="Imagen 3" />
                </div>
            </Carousel>
        </div>
    );
};

export default Slider;