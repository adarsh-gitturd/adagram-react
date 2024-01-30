import React from 'react'
import bgbg from '../images/bgbg.jpg'
import user from '../images/user.png'
import logo from '../images/logo.png'

import LoginStyles from '../styles/login-styles.module.css'

import fb from '../images/fb.png'
import insta from '../images/insta.png'
import pinterest from '../images/pinterest.png'
import twitter from '../images/twitter.png'

const LoginPage = () => {
  return (
    <div className={LoginStyles.login_container}>
        <div className={LoginStyles.header}>
            <div className={LoginStyles.title}><a href="/">adagram</a></div>
            <a href=""><img src={user} alt="" className={LoginStyles.user} /></a>
        </div>
        
        <div className={LoginStyles.login_area}>
            <div className={LoginStyles.login}>
                <img src={logo} alt="" className={LoginStyles.login_logo} />
                <span className={LoginStyles.login_title}>Log In</span>
                <input type="text" placeholder='Username' className={LoginStyles.login_username} />
                <input type="text" placeholder='Password' className={LoginStyles.login_pass} />
                <button className={LoginStyles.login_button}>Log In</button>
                <a href="./chat" className={LoginStyles.newmeansreg}>New here? Register</a>
            </div>
            
            <img src={bgbg} alt="" className={LoginStyles.login_bg} />
        </div>

    
        <div className={LoginStyles.footer_socials}>
          <a href=""><img src={insta} alt="" className={LoginStyles.insta} /></a>
          <a href=""><img src={fb} alt="" /></a>
          <a href=""><img src={twitter} alt="" /></a>
          <a href=""><img src={pinterest} alt="" /></a>
        </div>
    </div>

  )
}

export default LoginPage