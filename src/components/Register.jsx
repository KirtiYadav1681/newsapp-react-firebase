import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // handling signup button as well as sign with thw help of firebase
  const signUp = async (e) => {
    e.preventDefault();
    if (email && password && confirmPassword) {
      if (password.length > 5 && confirmPassword.length > 5) {
        if (password === confirmPassword) {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success("Signup successfull.");
            navigate("/");
          } catch (error) {
            console.log(error, "signup error");
            toast.error("Something went wrong, please try again later!");
          }
        } else {
          toast.error("Password and confirm passwords do not match!");
        }
      } else {
        toast.error("Password should have atleast 6 characters.");
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
        <h1>Register</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter a valid email only."
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          required
          minLength={6}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={(e) => signUp(e)}>Register</button>
        <Link className="link" to="/login">
          Already have an account? Login Here.{" "}
        </Link>
      </div>
    </div>
  );
};

export default Register;
