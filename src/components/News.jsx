import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { getDoc, collection, doc, setDoc } from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const News = ({ newsData, isLoading }) => {
  // handling favourite buton using firebase db
  const addToFavorites = async (newsItem) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const favoritesCollection = collection(
          db,
          "users",
          user.uid,
          "favorites"
        );
        const existingDocRef = doc(favoritesCollection, newsItem.title);
        const existingDocSnapshot = await getDoc(existingDocRef);
        if (!existingDocSnapshot.exists()) {
          await setDoc(existingDocRef, newsItem);
          toast.success("Added to favorites, visit favourites page");
        } else {
          toast.error("Already in favorites!");
        }
      } catch (error) {
        toast.error("Error in adding");
        console.error("Error adding to favorites:", error);
      }
    } else {
      toast.error("Please log in to add to favorites!");
    }
  };

  return (
    <div className="news">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1>Top News - India</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="news-container">
          {newsData?.map((news, index) => (
            <div>
              <button onClick={() => addToFavorites(news)}>❤️</button>
              <Link to={`/news/${index}`} key={index}>
                <img
                  src={
                    news.urlToImage
                      ? news.urlToImage
                      : "http://i.huffpost.com/gen/4707746/images/o-BREAKING-NEWS-facebook.jpg"
                  }
                  alt={news.title}
                />
                <h4>{news.title}</h4>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
