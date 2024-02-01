import React from 'react'
import { Link } from 'react-router-dom'
import user from '../images/user.png'
import DomainStyles from "../styles/domain-styles.module.css"

import fb from '../images/fb.png'
import insta from '../images/insta.png'
import pinterest from '../images/pinterest.png'
import twitter from '../images/twitter.png'

const DomainPage = () => {
  return (
    <div className={DomainStyles.domain_container}>
        <div className={DomainStyles.header}>
            <div className={DomainStyles.title}><span>adagram</span></div>
            <div className={DomainStyles.home_about_contact}>
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
            <a href=""><img src={user} alt="" className={DomainStyles.user} /></a>
        </div>

        <div className={DomainStyles.central_area}>
          <div className={DomainStyles.cmdm}>
            <span>Connect.</span>
            <span>Meet</span>
            <span>Disover.</span>
            <span>Minimalism.</span>
          </div>

          <div className={DomainStyles.wel_desc}>
            <span className={DomainStyles.welcome}>Welcome to <span>
              adagram</span></span>
            <span className={DomainStyles.desc}>Your one-stop solution to a 
              minimalistic social media experience.</span>
          </div>
        </div>

        <span className={DomainStyles.connect}><Link to="/login">Connect</Link></span>

        <div className={DomainStyles.footer_socials}>
          <a href=""><img src={insta} alt="" className={DomainStyles.insta} /></a>
          <a href=""><img src={fb} alt="" className={DomainStyles.fb} /></a>
          <a href=""><img src={twitter} alt="" className={DomainStyles.twitter} /></a>
          <a href=""><img src={pinterest} alt="" className={DomainStyles.pinterest} /></a>
        </div>
    </div>
    
  )
}

export default DomainPage