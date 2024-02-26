/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import NoticeDetail from "./NoticeDetail";
import SwiperComponent from "./SwiperComponent";
import Divider from "./Divider";
import SearchBox from "./SearchBox";

const PageContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 250px 40px 250px;
  max-width: 1920px;
  min-width: 480px;
`;

// 테이블 스타일
const Table = styled.table`
  width: 100%;
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
  margin-top: 50px;
  margin-bottom: 60px;
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
  const [searchTerm, setSearchTerm] = useState(""); // 검색 용어 상태 관리
  const totalPages = Math.ceil(totalNotices / noticesPerPage);
  const [selectedNoticeId] = useState(null);
  const navigate = useNavigate();
  const handleRowClick = (noticeId) => {
    navigate(`/notice/${noticeId}`);
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
    <>
      <SwiperComponent />
      <PageContainerStyle>
        <Divider />
        <SearchBox onSearch={setSearchTerm} />
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
              <tr key={notice.id} onClick={() => handleRowClick(notice.id)}>
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
        {selectedNoticeId && <NoticeDetail noticeId={selectedNoticeId} />}
      </PageContainerStyle>
    </>
  );
};

export default NoticeList;
