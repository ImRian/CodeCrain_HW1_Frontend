import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import emptyHeart from "../img/emptyHeart.png";
import filledHeart from "../img/filledHeart.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const likeStyle = css`
  display: flex;
  align-items: center; // 요소들을 수직 방향으로 가운데 정렬합니다.
  justify-content: flex-end; // 요소들을 컨테이너의 오른쪽 끝으로 정렬합니다.
  gap: 10px; // 요소들 사이에 일정한 간격을 추가합니다.
  margin-top: 10px; // 위쪽 요소와의 간격을 조정합니다.
`;

const backToListBtnStyle = css`
  padding: 8px 16px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: transparent;
  color: #2776e1;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
  color: black;
  font-weight: normal;

  &:hover {
    background-color: #2776e1;
    color: white;
  }
`;

// 좋아요 버튼 스타일
const likeButtonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
`;

// 좋아요 수 스타일
const likesCountStyle = css`
  font-size: 16px; // 크기를 조정하여 다른 요소들과 균형을 맞춥니다.
  margin-right: 5px; // 오른쪽 요소와의 간격을 조정합니다.
`;

const NoticeDetail = () => {
  const [detail, setDetail] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();

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
    return (
      date
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, "$3.$1.$2") +
      ", " +
      date.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  };

  return (
    <>
      <div>
        <h2>{detail.title}</h2>
        <p>{formatDate(detail.date_posted)}</p>
        <p>{detail.posted_time}</p>
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
          {/* 이 부분이 수정되었습니다. */}
          <button css={backToListBtnStyle}>목록으로 돌아가기</button>{" "}
          {/* 이 부분이 수정되었습니다. */}
        </p>
      </div>
      <CommentForm noticeId={id} />
      <Comment noticeId={id} />
    </>
  );
};

export default NoticeDetail;
