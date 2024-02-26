/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import banner1 from "../img/banner1.png";
import banner2 from "../img/banner2.png";
import banner3 from "../img/banner3.png";

const ImageContainer = styled.div`
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressBar = styled.div`
  background-color: #ccc;
  height: 2px;
  width: 100px;
  position: relative;
  margin-right: 10px;
`;

const ProgressFill = styled.div`
  background-color: #000;
  height: 100%;
  width: ${(props) => props.width}%;
`;

const SlideIndicator = styled.span`
  color: #ccc;
  &.active {
    font-weight: Bold;
    color: #000;
  }
`;

const SwiperComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  return (
    <Slider {...settings}>
      {[banner1, banner2, banner3].map((banner, index) => (
        <ImageContainer key={index}>
          <img src={banner} alt={`Banner ${index + 1}`} />
          <ProgressBarContainer>
            <ProgressBar>
              <ProgressFill
                width={
                  (currentSlide === index ? (index + 1) / totalSlides : 0) * 100
                }
              />
            </ProgressBar>
            <SlideIndicator className={currentSlide === index ? "active" : ""}>
              {`< ${index + 1} / ${totalSlides} >`}
            </SlideIndicator>
          </ProgressBarContainer>
        </ImageContainer>
      ))}
    </Slider>
  );
};

export default SwiperComponent;
