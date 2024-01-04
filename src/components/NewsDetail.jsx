import React from "react";
import { useParams, Link } from "react-router-dom";

const NewsDetail = ({ newsData }) => {
  // using useParams hook to know the id from url
  const { newsIndex } = useParams();
  let news = newsData[newsIndex];

  return (
    <div className="news-detail">
      <Link className="link" to="/">
        Back to Homepage
      </Link>
      <h1>{news?.title}</h1>
      <img src={news?.urlToImage} alt={news?.title} />
      <p>
        {news?.description}
        <a target="_blank" href={news?.url}>
          {" "}
          ... Click here to know more.
        </a>
      </p>
    </div>
  );
};

export default NewsDetail;
