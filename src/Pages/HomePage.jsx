import React from "react";
import News from "../components/News";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = ({ newsData }) => {
  return (
    <>
      <Navbar />
      <News newsData={newsData} />
      <Footer />
    </>
  );
};

export default HomePage;
