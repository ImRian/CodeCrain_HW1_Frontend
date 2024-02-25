// import React, { useState, useEffect } from 'react';

// const NoticeDetail = ({ notice }) => {
//   const [isLiked, setIsLiked] = useState(false);

//   // 공지사항의 좋아요 상태를 로컬 스토리지에서 로드
//   useEffect(() => {
//     const likedStatus = localStorage.getItem(`noticeLiked-${notice.id}`);
//     setIsLiked(likedStatus === 'true');
//   }, [notice.id]);

//   // 좋아요 토글 함수
//   const toggleLike = () => {
//     const newLikedStatus = !isLiked;
//     setIsLiked(newLikedStatus);
//     localStorage.setItem(`noticeLiked-${notice.id}`, newLikedStatus.toString());
//   };

//   return (
//     <div>
//       <h2>{notice.title}</h2>
//       {/* 기타 정보 표시 */}
//       <button onClick={toggleLike}>
//         {isLiked ? '❤️' : '🤍'} 좋아요
//       </button>
//     </div>
//   );
// };

// export default NoticeDetail;
