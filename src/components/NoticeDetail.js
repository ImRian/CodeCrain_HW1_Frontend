import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NoticeDetail = ({ noticeId }) => {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4005/api/notices/${id}`) // noticeId 대신 id 사용
      .then((response) => response.json())
      .then((data) => setDetail(data))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  if (!detail) return <div>Loading...</div>;

  // Convert ISO string to readable date format
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3.$1.$2') 
    + ', ' + date.toLocaleTimeString("en-US", {
      hour12: false, // 24-hour format
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };


  return (
    <div>
      <h2>{detail.title}</h2>
      <p>Date Posted: {formatDate(detail.date_posted)}</p>
      <p>Posted Time: {detail.posted_time}</p>
      <p>{detail.content}</p>
      <p>Likes: {detail.likes}</p>
      {/* Additional detail fields can be added here */}
    </div>
  );
};

export default NoticeDetail;
