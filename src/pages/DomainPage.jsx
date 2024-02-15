import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import user from '../images/user.png'
import DomainStyles from "../styles/domain-styles.module.css"

import { colorThemes, setTheme } from './theme'

import fb from '../images/fb.png'
import insta from '../images/insta.png'
import pinterest from '../images/pinterest.png'
import themes from '../images/themes.png'
import twitter from '../images/twitter.png'

const DomainPage = () => {
  const [paletteOptionsVisible, setPaletteOptionsVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(0);

  const openPaletteOptions = () => {
    paletteOptionsVisible? setPaletteOptionsVisible(false) : setPaletteOptionsVisible(true);
  };

  useEffect(()=>{
    // console.log(sessionStorage.getItem('THEMEE'))
    if(sessionStorage.getItem('THEMEINDEX'))
      setTheme(setSelectedTheme, sessionStorage.getItem('THEMEINDEX'));
  }, [])

  return (
    <div className={DomainStyles.domain_container}>
        <div className={DomainStyles.header}>
            <div className={DomainStyles.title}><span>projectAdagram</span></div>
            <div className={DomainStyles.home_about_contact}>
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
            <a href=""><img src={user} alt="" className={DomainStyles.user} /></a>
            <img onClick={openPaletteOptions} src={themes} alt="" className={DomainStyles.themes} />

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

        {paletteOptionsVisible && (
          <div className={DomainStyles.igh}>
            <h1>Choose theme</h1>
            
            <div className={DomainStyles.colorPalette}>
            {colorThemes.map((theme, index) => (

              <div key={index} className={DomainStyles.colorRow} onClick={() => setTheme(setSelectedTheme, index)}>
                {theme.map((color, idx) => (
                  <div key={idx} 
                  className={DomainStyles.colorCircle} 
                  style={{ marginRight: '10px', borderRadius: '50%', display:'inline-block', width: '50px', height: '50px', backgroundColor: color }}>

                  </div>
                ))}
                <hr />
              </div>
            ))}
            <div className={DomainStyles.close} onClick={()=>{
                            setPaletteOptionsVisible(false);
                    }}>Close</div>
          </div>

          </div>
        )}

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