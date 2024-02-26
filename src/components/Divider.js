/** @jsxImportSource @emotion/react */
import React from "react";
import homeIcon from "../img/homeIcon.png";
import rightArrowIcon from "../img/rightArrowIcon.png";
import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
  flex-direction: row;
  max-width: 1920px;
  min-width: 480px;
  gap: 4px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
`;

const iconStyle = css`
  width: 24px; // 아이콘 크기 조절
  height: 24px;
`;

const boardTextStyle = css`
  font-size: 16px;
  color: #23282e;
  font-family: "Pretendard";
  font-style: SemiBold;
`;
const noticesTextStyle = css`
  font-size: 16px;
  color: #006cff;
  font-family: "Pretendard";
  font-style: SemiBold;
`;

const Divider = () => {
  return (
    <div css={containerStyle}>
      <img src={homeIcon} css={iconStyle} alt="Home" />
      <img src={rightArrowIcon} css={iconStyle} alt="Right Arrow" />
      <span css={boardTextStyle}>게시판</span>
      <img src={rightArrowIcon} css={iconStyle} alt="Right Arrow" />
      <span css={noticesTextStyle}>공지사항</span>
    </div>
  );
};

export default Divider;
