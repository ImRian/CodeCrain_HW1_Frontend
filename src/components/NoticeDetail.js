/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import emptyHeart from "../img/emptyHeart.png";
import filledHeart from "../img/filledHeart.png";
import Divider from "./Divider";
import { css } from "@emotion/react";

const pageContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 40px 250px 0px 250px;
  max-width: 1920px;
  min-width: 480px;
`;

const likeStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px 0  24px 0;
  border-bottom: 2px solid #006CFF;
  margin-bottom: 40px;
`;

const backToListBtnStyle = css`
  padding: 8px 24px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: transparent;
  color: #2776e1;
  cursor: pointer;
  font-size: 19px;
  transition: all 0.3s;
  color: black;
  font-weight: medium;
  font-family: Pretendard;

  &:hover {
    background-color: #2776e1;
    color: white;
  }
`;

const likeButtonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 8px;
  width: 24px;
  height: 24px;
`;

const likesCountStyle = css`
  font-size: 16px;
  margin-right: 10px;
  color: #8b8e91;
`;

const titleStyle = css`
  font-size: 22px;
  margin-right: 10px;
  color: #23282e;
  font-weight: bold;
  font-family: Pretendard;
  margin-bottom: 12px;
`;

const dateStyle = css`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.01em;
  padding: 20px 0;
  border-bottom: 1px solid #d5d6d7;
`;

const NoticeDetail = () => {
  const [detail, setDetail] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4005/api/notices/${id}`)
      .then((response) => response.json())
      .then((data) => setDetail(data))
      .catch((error) => console.error("Error:", error));
    const likedNotices = JSON.parse(
      localStorage.getItem("likedNotices") || "{}"
    );
    setIsLiked(!!likedNotices[id]);
  }, [id]);

  const toggleLike = () => {
    const updatedLikes = !isLiked;
    setIsLiked(updatedLikes);

    fetch(`http://localhost:4005/api/notices/${id}/likes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ increment: updatedLikes }),
    })
      .then((response) => response.text())
      .then(() => {
        setDetail((prevDetail) => ({
          ...prevDetail,
          likes: prevDetail.likes + (updatedLikes ? 1 : -1),
        }));
        const likedNotices = JSON.parse(
          localStorage.getItem("likedNotices") || "{}"
        );
        if (updatedLikes) {
          likedNotices[id] = true;
        } else {
          delete likedNotices[id];
        }
        localStorage.setItem("likedNotices", JSON.stringify(likedNotices));
      })
      .catch((error) => console.error("Error:", error));
  };

  if (!detail) return <div>Loading...</div>;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3.$1.$2");
  };

  return (
    <>
      <div css={pageContainerStyle}>
        <Divider />
        <div>
          <div css={titleStyle}> {detail.title}</div>
          <p css={dateStyle}>
            {formatDate(detail.date_posted)} {detail.posted_time}
          </p>
          <p>
            {detail.content.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <p css={likeStyle}>
            <button onClick={toggleLike} css={likeButtonStyle}>
              <img src={isLiked ? filledHeart : emptyHeart} alt="Like" />
            </button>
            <span css={likesCountStyle}>{detail.likes}</span>{" "}
            <button css={backToListBtnStyle} onClick={() => navigate("/")}>
              목록으로 돌아가기
            </button>{" "}
          </p>
        </div>
        <Comment noticeId={id} />
      </div>
    </>
  );
};

export default NoticeDetail;
