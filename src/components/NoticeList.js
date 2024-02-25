import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const Table = styled.table`
width: "940px",
  border-collapse: collapse;

  td {
    border-bottom: 1px solid #ddd;
    padding: 16px;
    text-align: center;
  }

  .title-cell {
    text-align: left;
  }

  th {
    padding: 8px;
    border-bottom: 2px solid #000;
    border-top: 2px solid #000;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  margin: 0 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  color: #000;
  &:hover {
    background-color: #2776e1;
    border-radius: 100px;
    color: #ffffff;
  }

  &:disabled {
    color: #000;
    cursor: not-allowed;
    border-color: #ccc;
  }

  &:not(:hover) {
    background-color: transparent;
  }

  &:focus {
    outline: none;
  }
`;

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [totalNotices, setTotalNotices] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [noticesPerPage] = useState(4);
  const totalPages = Math.ceil(totalNotices / noticesPerPage);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const handleNoticeClick = (noticeId) => {
    // 주어진 ID와 일치하는 공지사항을 찾습니다.
    const noticeDetails = notices.find((notice) => notice.id === noticeId);
    // 찾은 공지사항으로 상태를 업데이트합니다.
    setSelectedNotice(noticeDetails);
  };

  useEffect(() => {
    fetch(
      `http://localhost:4005/api/notices?page=${currentPage}&limit=${noticesPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNotices(data.notices.reverse()); // 데이터를 역순으로 정렬
        setTotalNotices(data.totalNotices);
      })
      .catch((error) => console.error("Error:", error));
  }, [currentPage, noticesPerPage]);

  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
      <PageNumber
        key={number}
        id={number}
        onClick={handlePageClick}
        disabled={number === currentPage}
      >
        {number}
      </PageNumber>
    ));
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td>{notice.id}</td>
              <td className="title-cell">{notice.title}</td>
              <td>{notice.date_posted.split("T")[0].replace(/-/g, ".")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationContainer>
        <PageNumber
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </PageNumber>
        <PageNumber
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </PageNumber>
        {renderPageNumbers()}
        <PageNumber
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          {">"}
        </PageNumber>
        <PageNumber
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          {">>"}
        </PageNumber>
      </PaginationContainer>
    </Container>
  );
};

export default NoticeList;
