import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { auth } from "./firebase";

import Login from "./components/Login";
import HomePage from "./Pages/HomePage";
import Register from "./components/Register";
import NewsDetailPage from "./Pages/NewsDetailPage";
import FavouritesPage from "./Pages/FavouritesPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [newsData, setNewsData] = useState(null);

  //this is to know the user is logged in
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  //fetching API to get the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=d9019beae293414f966d550f4855bcae"
        );
        const data = await response.json();
        setNewsData(data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    return () => fetchData();
  }, []);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={user ? <HomePage newsData={newsData} /> : <Login />}
      />
      <Route
        path="/news/:newsIndex"
        element={user ? <NewsDetailPage newsData={newsData} /> : <Login />}
      />
      <Route
        path="/favorites"
        element={user ? <FavouritesPage /> : <Login />}
      />
    </Routes>
  );
};

export default App;
