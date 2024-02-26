// /** @jsxImportSource @emotion/react */
// import React, { useState } from "react";
// import { css } from "@emotion/react";
// import Comment from "./Comment"

// const formStyle = css`
//   background-color: #eef2f8;
//   padding: 24px;
//   border-radius: 12px;
//   border: 1px solid #F1F1F1;
//   margin-bottom: 18px;
// `;

// const commentInputStyle = css`
//   display: block;
//   width: calc(100% - 72px);
//   margin: 8px 0;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 10px;
//   box-sizing: border-box;

//   &::placeholder {
//     color: #8b8e91;
//     font-family: "Pretendard";
//     font-style: bold;
//     font-size: 18px;
//   }
// `;

// const nicknameInputStyle = css`
//   display: block;
//   width: 40%;
//   margin: 8px 0;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 10px;
//   box-sizing: border-box;

//   &::placeholder {
//     color: #8b8e91;
//     font-family: "Pretendard";
//     font-style: normal;
//     font-size: 14px;
//   }
// `;

// const buttonStyle = css`
//   background-color: #2776e1;
//   color: white;
//   padding: 8px 16px;
//   width: 60px;
//   height: 32px;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
//   margin-top: 12px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   &:hover {
//     background-color: #1e5bb8;
//   }

//   font-family: "Pretendard";
//   font-style: normal;
//   font-weight: 600;
//   font-size: 12px;
//   letter-spacing: -0.01em;
// `;

// const spacebetweenStyle = css`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   padding: 0;
//   width: 892px;
//   height: 32px;
//   flex: none;
//   order: 1;
//   flex-grow: 0;
// `;

// function CommentsForm({ noticeId, onCommentAdded }) {
//   const [nickname, setNickname] = useState("");
//   const [comment, setComment] = useState("");

//   const handleNicknameChange = (event) => {
//     setNickname(event.target.value);
//   };

//   const handleCommentChange = (event) => {
//     setComment(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (nickname.length < 4 || nickname.length > 10) {
//       alert("닉네임은 최소 4글자에서 최대 10글자 사이여야 합니다.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:4005/api/comments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           notice_id: noticeId,
//           nickname,
//           comment,
//           created_date: new Date().toISOString().slice(0, 10),
//           created_time: new Date().toISOString().slice(11, 19),
//         }),
//       });
//       if (response.ok) {
//         setNickname("");
//         setComment("");
//         if (typeof onCommentAdded === "function") {
//           onCommentAdded();
//         }
//       } else {
//         alert("댓글을 추가하는 데 실패했습니다.");
//       }
//     } catch (error) {
//       console.error("댓글을 추가하는 과정에서 오류가 발생했습니다.", error);
//       alert("댓글을 추가하는 과정에서 오류가 발생했습니다.");
//     }
//   };

//   return (
//     // 이 자리에    <h3>댓글 ({comments.length})</h3> 넣고 싶어
//     <form onSubmit={handleSubmit} css={formStyle}>
//       <div>
//         <textarea
//           id="comment"
//           value={comment}
//           onChange={handleCommentChange}
//           css={commentInputStyle}
//           placeholder="소중한 댓글을 남겨주세요"
//         />
//       </div>
//       <div css={spacebetweenStyle}>
//         <input
//           type="text"
//           id="nickname"
//           value={nickname}
//           onChange={handleNicknameChange}
//           maxLength="10"
//           css={nicknameInputStyle}
//           placeholder="닉네임을 입력해주세요"
//         />

//         <button type="submit" css={buttonStyle}>
//           등록
//         </button>
//       </div>
//     </form>
//   );
// }

// export default CommentsForm;
