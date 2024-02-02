import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import user from '../images/user.png';

import RegisterStyles from '../styles/register-styles.module.css';


/*
    name
    email
    phone
    username 
    password
    avatar
*/

const RegisterPage = () => {
    const [form, setForm] = useState(
        {name:' ', 
        email:' ', 
        phone:' ',
        username:' ', 
        password:' ', });

    let navigateToHome = useNavigate();

    function handleChande(e){
        const eventName = e.target.id;
        const eventValue = e.target.value;

        setForm(prev=>({
            ...prev,
            [eventName] : eventValue
        }));
    };

    const submit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8081/user", form);
        navigateToHome("/");
    };  

  return (
    <div className={RegisterStyles.register_container}>
        <div className={RegisterStyles.header}>
            <div className={RegisterStyles.title}><a href="/">adagram</a></div>
            <Link to="/"><img src={user} alt="" className={RegisterStyles.user} /></Link>
        </div>
    
        <div className={RegisterStyles.reg_area_header}>
            <h1>Sign Up</h1>
            <img src={logo} alt="" />
        </div>

        <div className={RegisterStyles.reg_area}>

            <form onSubmit={(e)=>submit(e)} className={RegisterStyles.reg_form}>
                <div className={RegisterStyles.ew}>
                    <label htmlFor="name">Name        </label>
                    <input id="name" type="text" onChange={(e)=>handleChande(e)}/>
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email"  type="text" onChange={(e)=>handleChande(e)}/>
                </div>

                <div>
                    <label htmlFor="phone">Phone No.   </label>
                    <input id="phone" type="text" onChange={(e)=>handleChande(e)}/>
                </div>

                <div>
                    <label htmlFor="username">Username    </label>
                    <input id="username" type="text" onChange={(e)=>handleChande(e)}/>
                </div>

                <div>
                    <label htmlFor="password">Password    </label>
                    <input id="password" type="password" onChange={(e)=>handleChande(e)}/>
                </div>

                <button type='submit'>Sign Up</button>
            </form>

        </div>

    </div>
  )
}

export default RegisterPage