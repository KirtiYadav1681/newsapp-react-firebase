import React from "react";
import News from "../components/News";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = ({ newsData, isLoading }) => {
  return (
    <>
      <Navbar />
      <News newsData={newsData} isLoading={isLoading}/>
      <Footer />
    </>
  );
};

export default HomePage;
