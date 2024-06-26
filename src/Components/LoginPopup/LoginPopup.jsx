import React, { useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets';
const LoginPopup = ({setShowLogin}) => {
    const [curentState , setCurentState] = useState('Sign Up');
  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
            <h2>{curentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            <input type="text" placeholder='Your name'  required/>

            <input type="email" placeholder='Your Email' required />

            <input type="password" placeholder='Password' required />
        </div>

        <button>{curentState==='Sign Up' ? 'Create account':'Login' }</button>
      </form>
    </div>
  )
}

export default LoginPopup
