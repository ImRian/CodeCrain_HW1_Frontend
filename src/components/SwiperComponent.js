/** @jsxImportSource @emotion/react */
import React from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import banner1 from "../img/banner1.png";
import banner2 from "../img/banner2.png";
import banner3 from "../img/banner3.png";

const ImageContainer = styled.div`
  position: relative;
  img {
    width: 100%; // 변경된 부분: max-width를 width로 변경하여 항상 부모의 크기에 맞춤
    height: auto;
    min-width: 480px; // 최소 너비 유지
    max-width: 1920px; // 최대 너비 유지
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
  width: 100%;
  position: relative;
`;

const ProgressFill = styled.div`
  background-color: white;
  height: 100%;
  width: ${(props) => props.width}%;
`;

const SlideIndicator = styled.span`
  text-align: right;
  &.active {
    font-weight: bold; // 변경된 부분: 'Medium'을 'bold'로 변경하여 실제 작동하는 속성 값으로 수정
    color: white;
  }
`;

const SwiperComponent = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
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
