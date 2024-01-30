import React from 'react'
import ChatPageStyles from '../styles/chat-page-styles.module.css'

import logo from '../images/logo.png'

const ChatPage = () => {
  return (
    <div className={ChatPageStyles.chat_container}>
        <SideBar />

        <div className={ChatPageStyles.contacts_bar}></div>
        <div className={ChatPageStyles.chat_bar}></div>
    </div>
  )
}

/* SideBar Components:
    -> Logo
    -> Messages
    -> Notifications
    -> Contacts
    -> Settings
    -> Logout
    -> Help
*/
function SideBar(){
    return(
    <div className={ChatPageStyles.side_bar}>
        <img src={logo} alt="" className="logo" />
        <div className={ChatPageStyles.messages_toggle}>
            <button className={ChatPageStyles.side_button}></button>
            <span className={ChatPageStyles.side_text}>Messages</span>
        </div>
        <div className={ChatPageStyles.notifs_toggle}>
            <button className={ChatPageStyles.side_button}></button>
            <span className={ChatPageStyles.side_text}>Notifs</span>
        </div>
        <div className={ChatPageStyles.contacts_toggle}>
            <button className={ChatPageStyles.side_button}></button>
            <span className={ChatPageStyles.side_text}>Contacts</span>
        </div>
        
        <div className={ChatPageStyles.settings_toggle}>
            <button className={ChatPageStyles.side_button}></button>
            <span className={ChatPageStyles.side_text}>Settings</span>
        </div>
        <div className={ChatPageStyles.help_toggle}>
            <button className={ChatPageStyles.side_button}></button>
            <span className={ChatPageStyles.side_text}>Help</span>
        </div>
    </div>
    )
}

export default ChatPage