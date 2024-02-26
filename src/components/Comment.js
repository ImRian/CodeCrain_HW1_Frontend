import React, { useEffect, useState } from "react";

function Comments({ noticeId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const formattedDate = `${date.getFullYear()}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    return formattedDate;
  };

  const formatNickname = (nickname) => {
    if (nickname.length > 2) {
      return `${nickname.slice(0, -2)}**`;
    }
    return nickname;
  };

  return (
    <div>
      <h3>댓글 ({comments.length})</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>
              <strong>{comment.nickname}</strong> (
              {formatDate(comment.created_date)})
            </p>
            <p>{comment.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
