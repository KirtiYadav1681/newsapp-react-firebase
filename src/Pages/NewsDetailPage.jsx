import React from "react";
import Navbar from "../components/Navbar";
import NewsDetail from "../components/NewsDetail";
import Footer from "../components/Footer";

const NewsDetailPage = ({ newsData }) => {
  return (
    <>
      <Navbar />
      <NewsDetail newsData={newsData} />
      <Footer />
    </>
  );
};

export default NewsDetailPage;
