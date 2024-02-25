import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styles for the table and pagination container to center them
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 60%; // Adjust based on your preference
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd; // Adds borders to the table cells
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.button`
  background: none;
  border: 1px solid #ddd; // Adds a slight border to make the buttons distinct
  padding: 5px 10px;
  cursor: pointer;
  margin: 0 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0; // Changes background on hover for better interaction visibility
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
    border-color: #ccc;
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

  useEffect(() => {
    fetch(
      `http://localhost:4005/api/notices?page=${currentPage}&limit=${noticesPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNotices(data.notices);
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
              <td>{notice.title}</td>
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
