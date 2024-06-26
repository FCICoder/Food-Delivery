import React, { useState } from "react";
import "./Loginpopup.css";
import { assets } from "../../assets/assets";
const LoginPopup = ({ setShowLogin }) => {
  const [curentState, setCurentState] = useState("Sign Up");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{curentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {curentState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your name" required />
          )}
          <input type="email" placeholder="Your Email" required />

          <input type="password" placeholder="Password" required />
        </div>

        <button>
          {curentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {curentState === "Login" ? (
          <p>
            Create a new account? <span onClick={()=>setCurentState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={()=>setCurentState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
