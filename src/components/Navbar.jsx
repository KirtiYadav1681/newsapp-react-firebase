import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const navigate = useNavigate();

  const signout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    navigate("/login");
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img
          src="https://freepngdesign.com/content/uploads/images/world-globe-1881681472.png"
          alt="logo"
        />
      </Link>
      <div>
        <button className="fav-button" onClick={() => navigate("/favorites")}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/210/210545.png"
            alt="favorites"
          />
        </button>
        <button onClick={(e) => signout(e)}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/4436/4436954.png"
            className="logout-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
