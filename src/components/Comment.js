/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import CommentBox from "./CommentBox";

const formStyle = css`
  background-color: #eef2f8;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 24px;
  border-radius: 12px;
  border: 1px solid #f1f1f1;
  margin-top: 32px;
  margin-bottom: 18px;
`;

const commentInputStyle = css`
  display: block;
  align-items: center;
  width: 100%;
  height: 119px;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;

  &::placeholder {
    color: #8b8e91;
    font-family: "Pretendard";
    font-style: bold;
    font-size: 18px;
  }
`;

const nicknameInputStyle = css`
  display: block;
  width: 40%;
  margin: 8px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;

  &::placeholder {
    color: #8b8e91;
    font-family: "Pretendard";
    font-style: normal;
    font-size: 14px;
  }
`;

const buttonStyle = css`
  background-color: #2776e1;
  color: white;
  padding: 8px 16px;
  width: 60px;
  height: 32px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 12px;
  display: flex;

  &:hover {
    background-color: #1e5bb8;
  }

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: -0.01em;
`;

const spacebetweenStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const commentText = css`
  color: black;
  font-weight: bold;
  font-family: Pretendard;
  font-size: 28px;
  margin-right: 10px;
`;

const commentNumeric = css`
  color: #2776e1;
  font-weight: bold;
  font-family: Pretendard;
  font-size: 28px;
`;

const componentMargin = css`
  padding-bottom: 18px;
`;
const commentBoxStyle = css`
  background-color: #fcfcfc;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 20px;
  border-radius: 12px;
  border: 1px solid #e8e9e9;
  margin-top: 18px;
  margin-bottom: 18px;
`;

const rowDivider = css`
  border-bottom: 1px solid #e8e9e9;
  padding: 10px 0 8px 0;
`;
function Comments({ noticeId, onCommentAdded }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
          created_date: new Date().toISOString().slice(0, 10),
          created_time: new Date().toISOString().slice(11, 19),
        }),
      });
      if (response.ok) {
        setNickname("");
        setComment("");
        if (typeof onCommentAdded === "function") {
          onCommentAdded();
        }
      } else {
        alert("댓글을 추가하는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글을 추가하는 과정에서 오류가 발생했습니다.", error);
      alert("댓글을 추가하는 과정에서 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:4005/api/comments?notice_id=${noticeId}`
        );
        const data = await response.json();

        const sortedComments = data.comments.sort((a, b) => {
          if (a.created_date === b.created_date) {
            return a.created_time.localeCompare(b.created_time);
          }
          return a.created_date.localeCompare(b.created_date);
        });

        setComments(sortedComments);
      } catch (error) {
        console.error("댓글을 불러오는데 실패했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (noticeId) {
      fetchComments();
    }
  }, [noticeId]);

  if (isLoading) return <p>댓글을 불러오는 중...</p>;
  if (!comments.length) return <p>댓글이 없습니다.</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return formattedDate;
  };

  const formatNickname = (nickname) => {
    return `${nickname.slice(0, -2)}**`;
  };

  return (
    <div>
      <span css={commentText}>댓글</span>
      <span css={commentNumeric}>({comments.length})</span>
      <div css={componentMargin} />
      <form onSubmit={handleSubmit} css={formStyle}>
        <div>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            css={commentInputStyle}
            placeholder="소중한 댓글을 남겨주세요"
          />
        </div>
        <div css={spacebetweenStyle}>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            maxLength="10"
            css={nicknameInputStyle}
            placeholder="닉네임을 입력해주세요"
          />

          <button type="submit" css={buttonStyle}>
            등록
          </button>
        </div>
      </form>

      <div>
        {comments.map((comment) => (
          <div key={comment.id} css={commentBoxStyle}>
            <p css={rowDivider}>{comment.comment}</p>
            <p>
              {formatNickname(comment.nickname)} (
              {formatDate(comment.created_date)})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
