import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import user from '../images/user.png'

import LoginStyles from '../styles/login-styles.module.css'

import fb from '../images/fb.png'
import insta from '../images/insta.png'
import pinterest from '../images/pinterest.png'
import twitter from '../images/twitter.png'

const LoginPage = () => {

  const navv = useNavigate();

  const [form, setForm] = useState(
    {
        username:'',
        password:'',
    });

  function updateCredentialChecker(e){
      const eventName = e.target.name;
      const eventValue = e.target.value;

      setForm(prev=>({
          ...prev,
          [eventName] : eventValue,
      }));
  }

  const checkValidCredentials = async (e) => {
    e.preventDefault();
    let realUsere = await axios.get("http://localhost:8081/users");
    let realUsers = realUsere.data;
    const huh = realUsers.some(entry =>
        Object.entries(form).every(([key, value]) =>
          entry.hasOwnProperty(key) && entry[key] == value
        )
      );
    if(huh){
      sessionStorage.setItem('loggedInUser', `${form.username}`);
      navv('/chat');
    }
  };

  return (
    <div className={LoginStyles.login_container}>
        <div className={LoginStyles.header}>
            <div className={LoginStyles.title}><Link to="/">adagram</Link></div>
            <Link to="/"><img src={user} alt="" className={LoginStyles.user} /></Link>
        </div>
        
        <div className={LoginStyles.login_area}>
            <div className={LoginStyles.login}>
                <img src={logo} alt="" className={LoginStyles.login_logo} />
                <span className={LoginStyles.login_title}>Log In</span>
                <input onChange={e=>updateCredentialChecker(e)} name="username" type="text" placeholder='Username' className={LoginStyles.login_username} />
                <input onChange={e=>updateCredentialChecker(e)} name="password" type="text" placeholder='Password' className={LoginStyles.login_pass} />
                <button onClick={checkValidCredentials} className={LoginStyles.login_button}>Log In</button>
                <Link to="/register" className={LoginStyles.newmeansreg}>New here? Register</Link>
            </div>
            
            <div alt="" className={LoginStyles.login_bg}></div>
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