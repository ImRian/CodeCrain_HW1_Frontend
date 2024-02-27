/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import searchIcon from "../img/searchIcon.png";
import cancelIcon from "../img/cancelIcon.png";

const searchBoxStyle = css`
  background-color: #f1f6fe;
  border-radius: 14px;
  padding: 10px;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 40px;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const inputContainerStyle = css`
  width: 30%;
  display: flex;
  align-items: center;
  position: relative;
`;

const inputStyle = css`
  width: 100%;
  padding: 8px 40px;
  border-radius: 4px;
  border: none;
`;

const iconStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const searchIconStyle = css`
  ${iconStyle};
  left: 10px;
`;

const cancelIconStyle = css`
  ${iconStyle};
  right: 10px;
`;

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div css={searchBoxStyle}>
      <div css={inputContainerStyle}>
        <img src={searchIcon} alt="검색" css={searchIconStyle} />
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          css={inputStyle}
          placeholder="검색"
        />
        <img
          src={cancelIcon}
          alt="취소"
          css={cancelIconStyle}
          onClick={handleClear}
        />
      </div>
    </div>
  );
};

export default SearchBox;
