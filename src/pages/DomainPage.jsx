import React from 'react'
import user from '../images/user.png'
import "../styles/domain-styles.css"

import insta from '../images/insta.png'
import pinterest from '../images/pinterest.png'
import twitter from '../images/twitter.png'
import fb from '../images/fb.png'

const DomainPage = () => {
  return (
    <div className="domain_container">
        <div className="header">
            <div className="title"><span>adagram</span></div>
            <div className="home-about-contact">
              <a href="#" className="home">Home</a>
              <a href="#" className="about">About</a>
              <a href="#" className="contact">Contact</a>
            </div>
            <a href=""><img src={user} alt="" className="user" /></a>
        </div>

        <div className="central-area">
          <div className="cmdm">
            <span>Connect.</span>
            <span>Meet</span>
            <span>Disover.</span>
            <span>Minimalism.</span>
          </div>

          <div className="wel-desc">
            <span className="welcome">Welcome to <span>
              adagram</span></span>
            <span className="desc">Your one-stop solution to a 
              minimalistic social media experience.</span>
          </div>
        </div>

        <span className="connect"><a href="">C o n n e c t</a></span>

        <div className="footer-socials">
          <a href=""><img src={insta} alt="" className="insta" /></a>
          <a href=""><img src={fb} alt="" className="fb" /></a>
          <a href=""><img src={twitter} alt="" className="twitter" /></a>
          <a href=""><img src={pinterest} alt="" className="pinterest" /></a>
        </div>
    </div>
    
  )
}

export default DomainPage