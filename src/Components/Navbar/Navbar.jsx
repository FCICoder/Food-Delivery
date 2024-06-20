import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className="log" />
        <ul className="nabar-menu">
            <li>home</li>
            <li>menu</li>
            <li>mobile-app</li>
            <li>contact us</li>
        </ul>

        <dav className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>
            </div>
            <button> sign in</button>
        </dav>
    </div>
  )
}

export default Navbar
