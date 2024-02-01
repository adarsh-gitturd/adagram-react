import React from 'react'
import ChatPageStyles from '../styles/chat-page-styles.module.css'

import add_user from '../images/chat-page/add-user.png'
import add_group from '../images/chat-page/add-group.png'
import contacts from '../images/chat-page/contacts.png'
import help from '../images/chat-page/help.png'
import messages from '../images/chat-page/messages.png'
import notifs from '../images/chat-page/notifs.png'
import search from '../images/chat-page/search.png'
import settings from '../images/chat-page/settings.png'
import logo from '../images/logo.png'

const ChatPage = () => {
  return (
    <div className={ChatPageStyles.chat_container}>
        <SideBar />
        <ContactsBar />

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
        <div className={`${ChatPageStyles.toggle} ${ChatPageStyles.toggle_messages}`}>
            <img src={messages} alt="" />
            <span className={ChatPageStyles.side_text}>Messages</span>
        </div>
        <div className={ChatPageStyles.toggle}>
            <img src={notifs} alt="" />
            <span className={ChatPageStyles.side_text}>Notifs</span>
        </div>
        <div className={ChatPageStyles.toggle}>
            <img src={contacts} alt="" />
            <span className={ChatPageStyles.side_text}>Contacts</span>
        </div>
        
        <div className={`${ChatPageStyles.toggle} ${ChatPageStyles.toggle_settings}`}>
            <img src={settings} alt="" />
            <span className={ChatPageStyles.side_text}>Settings</span>
        </div>
        <div className={ChatPageStyles.toggle}>
            <img src={help} alt="" />
            <span className={ChatPageStyles.side_text}>Help</span>
        </div>
    </div>
    )
}

function ContactsBar(){
    return(
        <div className={ChatPageStyles.contacts_bar}>

            <div className={ChatPageStyles.divdiv}>
                <span className={ChatPageStyles.cb_title}>Messages</span>
                <img src={add_user} alt="" className={ChatPageStyles.addContact} />
                <img src={add_group} alt="" className={ChatPageStyles.addContact} />
            </div>

            <div className={ChatPageStyles.search_set}>
                <input type="text" placeholder='Search for new Chat'className={ChatPageStyles.searchh}/>
                <img src={search} alt="" className={ChatPageStyles.searchimg}/>
            </div>

            <div className={ChatPageStyles.direct_or_group}>
                <div className={ChatPageStyles.direct}>Direct</div>
                <div className={ChatPageStyles.group}>Groups</div>
            </div>

            <DirectChatsList />
            <GroupChatsList />
        </div>
    )
}

function DirectChatsList(){
    return(
        <div  className={ChatPageStyles.directs}>
            hello
        </div>
    )
}

function GroupChatsList(){
    return(
        <div className={ChatPageStyles.groups}>

        </div>
    )
}

function AddNewContact(){
    return(
        <div>

        </div>
    )
}

export default ChatPage