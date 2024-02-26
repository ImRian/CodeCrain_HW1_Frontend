import React, { useEffect, useState } from 'react';

function Comments({ noticeId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        // 서버로부터 댓글 데이터를 비동기적으로 가져옵니다.
        const response = await fetch(`http://localhost:4005/api/comments?notice_id=${noticeId}`);
        const data = await response.json();
        setComments(data.comments); // 댓글 데이터를 상태에 저장합니다.
      } catch (error) {
        console.error("댓글을 불러오는데 실패했습니다.", error);
      } finally {
        setIsLoading(false); // 로딩 상태를 false로 설정합니다.
      }
    };

    if (noticeId) {
      fetchComments();
    }
  }, [noticeId]); // noticeId가 변경될 때마다 댓글을 다시 불러옵니다.

  if (isLoading) return <p>댓글을 불러오는 중...</p>;
  if (!comments.length) return <p>댓글이 없습니다.</p>;

  return (
    <div>
      <h3>댓글</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p><strong>{comment.nickname}</strong> ({comment.created_date})</p>
            <p>{comment.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;