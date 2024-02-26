import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import emptyHeart from "../img/emptyHeart.png";
import filledHeart from "../img/filledHeart.png";

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
        <p>Date Posted: {formatDate(detail.date_posted)}</p>
        <p>Posted Time: {detail.posted_time}</p>
        <p>{detail.content}</p>
        <p>Likes: {detail.likes}</p>
        <button
          onClick={toggleLike}
          style={{ background: "none", border: "none" }}
        >
          <img src={isLiked ? filledHeart : emptyHeart} alt="Like" />
        </button>
      </div>
      <CommentForm noticeId={id}/>
      <Comment noticeId={id} />
    </>
  );
};

export default NoticeDetail;
