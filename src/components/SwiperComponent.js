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
    @media (min-width: 480px) and (max-width: 1920px) {
      max-width: 100%; // 이미지 최대 너비를 100%로 설정하여 여백 문제 해결
    }
  }
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  bottom: 60px;
  left: 60px;
  width: 334px;
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: column;
`;

const ProgressBar = styled.div`
  background-color: gray;
  height: 2px;
  width: 400px;
  position: relative;
  margin-right: 10px;
  @media (min-width: 480px) and (max-width: 1920px) {
    width: 80%; // 반응형으로 조절 가능
  }
`;

const ProgressFill = styled.div`
  background-color: white;
  height: 100%;
  width: ${(props) => props.width}%;
`;

const SlideIndicator = styled.span`
text-align:right;
  &.active {
    font-weight: Medium;
    color: white;
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
    autoplaySpeed: 5000,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
