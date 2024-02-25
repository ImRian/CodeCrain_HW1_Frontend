import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoticeDetail from "../components/NoticeDetail";
import NoticeList from "../components/NoticeList";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoticeList />} />
        <Route path="/notice/:id" element={<NoticeDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
