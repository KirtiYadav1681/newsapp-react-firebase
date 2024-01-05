import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Favourites = () => {
  const user = auth.currentUser;
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const favoritesCollection = collection(
            db,
            "users",
            user.uid,
            "favorites"
          );
          const favoritesSnapshot = await getDocs(favoritesCollection);
          setFavorites(favoritesSnapshot.docs.map((doc) => doc.data()));
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };
    fetchFavorites();
  }, [user]);

  return (
    <div className="favourites">
      <h1>Favorites</h1>
      <Link className="link" to="/">
        Back to Homepage
      </Link>
      {favorites ? (
        favorites?.map((favorite, index) => (
          <div key={index}>
            <a href={favorite.url} target="_blank">
              <span>❤️</span>
              <p>{favorite.title}</p>
              <img src={favorite.urlToImage} alt={favorite.title} />
            </a>
          </div>
        ))
      ) : (
        <div
          style={{
            margin: "50px 0",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>No favorite news yet.</h1>
          <p> Please select a favorite news</p>
          <Link
            to="/"
            style={{
              marginTop: "20px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "5px",
            }}
          >
            See All News
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favourites;
