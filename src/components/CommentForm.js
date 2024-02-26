import React, { useState } from "react";

function CommentsForm({ noticeId, onCommentAdded }) {
  const [nickname, setNickname] = useState("");
  const [comment, setComment] = useState("");

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 닉네임 길이 검증
    if (nickname.length < 4 || nickname.length > 10) {
      alert("닉네임은 최소 4글자에서 최대 10글자 사이여야 합니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4005/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notice_id: noticeId,
          nickname,
          comment,
          created_date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD 형식
          created_time: new Date().toISOString().slice(11, 19), // HH:MM:SS 형식
        }),
      });
      if (response.ok) {
        setNickname("");
        setComment("");
        if (typeof onCommentAdded === "function") {
          onCommentAdded(); // 함수가 맞을 경우에만 호출
        }
      } else {
        alert("댓글을 추가하는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글을 추가하는 과정에서 오류가 발생했습니다.", error);
      alert("댓글을 추가하는 과정에서 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nickname">닉네임: </label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={handleNicknameChange}
          maxLength="10"
        />
      </div>
      <div>
        <label htmlFor="comment">댓글: </label>
        <textarea id="comment" value={comment} onChange={handleCommentChange} />
      </div>
      <button type="submit">댓글 등록</button>
    </form>
  );
}

export default CommentsForm;
