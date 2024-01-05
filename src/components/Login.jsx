import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handling login button as well as login with thw help of firebase
  const login = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (error) {
        console.log(error, "login error");
        toast.error("Invalid auth credentials.");
      }
    } else {
      toast.error("All fields are required.");
    }
  };

  return (
    <div className="main">
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
      <div className="auth">
        <img
          src="https://freepngdesign.com/content/uploads/images/world-globe-1881681472.png"
          alt="logo"
        />
        <h1>LOGIN</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => login(e)}>Login</button>
        <Link className="link" to="/register">
          Don't have an account? Register Here.
        </Link>
      </div>
    </div>
  );
};

export default Login;
