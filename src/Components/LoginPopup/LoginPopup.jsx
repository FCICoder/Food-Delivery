import React, { useContext, useState } from "react";
import "./Loginpopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from 'axios'
const LoginPopup = ({ setShowLogin }) => {
  const [curentState, setCurentState] = useState("Sign Up");
  const [data , setData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const {url , setToken} = useContext(StoreContext);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data)=>({...data, [name]: value }))
  } 

  const onLogin =async (e) => {
    e.preventDefault(); 
    let newUrl = url;
    if(curentState === 'Login'){
      newUrl += `/api/user/login`;
    }else{
      newUrl += `/api/user/register`;
    }
    const response = await axios.post(newUrl, data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setShowLogin(false);
      // toast.success(response.data.message);
    }else{
      alert(response.data.message);
    }
  }
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
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
            <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />
          )}
          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" required />

          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>

        <button type="submit">
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
