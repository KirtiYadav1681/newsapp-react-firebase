import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { auth } from "./firebase";

import Login from "./components/Login";
import HomePage from "./Pages/HomePage";
import Register from "./components/Register";
import NewsDetailPage from "./Pages/NewsDetailPage";
import FavouritesPage from "./Pages/FavouritesPage";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

const App = () => {
  const [user, setUser] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        const response = await fetch(`${apiUrl}${apiKey}`);
        const data = await response.json();
        setNewsData(data.articles);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={user ? <HomePage newsData={newsData} isLoading={isLoading}/> : <Login />}
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
