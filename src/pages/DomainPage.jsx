import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import user from '../images/user.png'
import DomainStyles from "../styles/domain-styles.module.css"

import fb from '../images/fb.png'
import insta from '../images/insta.png'
import pinterest from '../images/pinterest.png'
import themes from '../images/themes.png'
import twitter from '../images/twitter.png'


//export to separate file in the future
var colorThemes = [
  ['#FAF2F2', '#F3E1E1', '#F1D1D1', '#7D5A5A'],
  ['#1E2022', '#F0F5F9', '#C9D6DF', '#52616B'],
  ['#D2EBE9', '#ED8240', '#90303D', '#230444'],
  ['#151515', '#301B3F', '#3C415C', '#B4A5A5'],
  ['#F2F7A1', '#46C2CB', '#6D67E4', '#453C67'],
  ['#F8FAE5', '#B19470', '#43766C', '#76453B'],
  ['#EADEDE', '#F58840', '#B85252', '#000000'],
  ['#BED754', '#E3651D', '#750E21', '#191919'],
  ['#F5F5F5', '#F05454', '#30475E', '#121212'],
  ['#FDE5D4', '#D6CC99', '#445D48', '#001524'],
  ['#F5E8E4', '#F5C7A9', '#D1512D', '#411530'],
  ['#FFF2F2', '#FAD4D4', '#EF9F9F', '#F47C7C'],
  ['#F0F3FF', '#15F5BA', '#836FFF', '#211951'],
  ['#E8D8C4', '#C7B7A3', '#A94438', '#561C24'],
  ['#FFE6C7', '#FFA559', '#FF6000', '#454545'],
  ['#F5EBEB', '#E4D0D0', '#D5B4B4', '#867070'],
  ['#FF0000', '#950101', '#3D0000', '#000000'],
  ['#D7FBE8', '#9DF3C4', '#62D2A2', '#1FAB89'],
  ['#F3F1F5', '#F0D9FF', '#BFA2DB', '#3B0C3B'],
  ['#F1F6F9', '#9BA4B5', '#394867', '#212A3E'],
  ['#EBF400', '#F57D1F', '#F72798', '#000000'],
  ['#9290C3', '#535C91', '#1B1A55', '#070F2B'],
  ['#EEEDEB', '#E0CCBE', '#747264', '#3C3633']
]

const DomainPage = () => {
  const [paletteOptionsVisible, setPaletteOptionsVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(0);

  const openPaletteOptions = () => {
    paletteOptionsVisible? setPaletteOptionsVisible(false) : setPaletteOptionsVisible(true);
  };

  const setTheme = (index) => { 
    setSelectedTheme(index);
    const theme = colorThemes[index];
    document.documentElement.style.setProperty('--v1', theme[0]);
    document.documentElement.style.setProperty('--v2', theme[1]);
    document.documentElement.style.setProperty('--v3', theme[2]);
    document.documentElement.style.setProperty('--v4', theme[3]);
  }

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

              <div key={index} className={DomainStyles.colorRow} onClick={() => setTheme(index)}>
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