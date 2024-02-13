import axios from 'axios';
import React, { useState } from 'react';
import ChatPageStyles from '../styles/chat-page-styles.module.css';

import add_group from '../images/chat-page/add-group.png';
import add_user from '../images/chat-page/add-user.png';
import contacts from '../images/chat-page/contacts.png';
import help from '../images/chat-page/help.png';
import messages from '../images/chat-page/messages.png';
import notifs from '../images/chat-page/notifs.png';
import search from '../images/chat-page/search.png';
import settings from '../images/chat-page/settings.png';
import logo from '../images/logo.png';
import UltimateSocket from './UltimateSocket';


const ChatPage = () => {
  return (
    <div className={ChatPageStyles.chat_container}>
        <SideBar />
        <ContactsBar />

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

var _contacts = [];

function ContactsBar(){
    const [showAddContact, setShowAddContact] = useState(false);
    const [form, setForm] = useState(
        {
            phone:'',
            username:'',
        });
    const [newUserAdded, setNewUserAdded] = useState(false);
    const [activeChat, setActiveChat] = useState(false);

    const [directsOrGroupsDisplay, setDirectOrGroupsDisplay] = useState('directs');
    const [showAddGroup, setShowAddGroup] = useState(false);


    function handleAddNewContact(){
        setShowAddContact(true);
    }
    function cancelAddContact(){
        setShowAddContact(false);
    }

    function handleAddNewGroup(){
        setShowAddGroup(true);
    }
    function cancelAddGroup(){
        setShowAddGroup(false);
    }

    function handleAddContactChange(e){
        const eventName = e.target.id;
        const eventValue = e.target.value;

        setForm(prev=>({
            ...prev,
            [eventName] : eventValue,
        }));
    };

    const checkValidContactToAdd = async (e) => {
        e.preventDefault();
        let realUsere = await axios.get("http://localhost:8081/users");
        let realUsers = realUsere.data;
        const huh = realUsers.some(entry =>
            Object.entries(form).every(([key, value]) =>
              entry.hasOwnProperty(key) && entry[key] == value
            )
          );
        if(huh){
            setNewUserAdded(true);
            _contacts.push(form.username);
            setDirectOrGroupsDisplay('directs');
            // console.log(_contacts);
            cancelAddContact();
        }
      };
    
    function openChat(e){
        // console.log(e.nativeEvent.target.innerHTML);
        let chat = e.nativeEvent.target.innerHTML;
        setActiveChat(chat);
    }

    function displayDirects(){
        setDirectOrGroupsDisplay('directs')
    }

    function displayGroups(){
        setDirectOrGroupsDisplay('groups')
    }

    return(
        <div className={ChatPageStyles.contacts_bar}>
            <div className={ChatPageStyles.divdiv}>
                <span className={ChatPageStyles.cb_title}>Messages</span>
                <h2>{sessionStorage.getItem('loggedInUser')}</h2>
                <img src={add_user} alt="" className={ChatPageStyles.addContact} onClick={handleAddNewContact}/>
                <img src={add_group} alt="" className={ChatPageStyles.addGroup} onClick={handleAddNewGroup} />
            </div>

            <div className={ChatPageStyles.search_set}>
                <input type="text" placeholder='Search for chat'className={ChatPageStyles.searchh}/>
                <img src={search} alt="" className={ChatPageStyles.searchimg}/>
            </div>

            <div className={ChatPageStyles.direct_or_group}>
                <div onClick={displayDirects} className={ChatPageStyles.direct}>Direct</div>
                <div onClick={displayGroups} className={ChatPageStyles.group}>Groups</div>
            </div>

            {/* add a new contact */}
            {showAddContact && (
                <div className={ChatPageStyles.addnewcontact}>
                    <span>Add a new Contact</span>
                    <form  onSubmit={checkValidContactToAdd}>
                        <label htmlFor="phone">Phone No.</label>
                        <input id="phone" type="text" onChange={e=>handleAddContactChange(e)}/>
                        <br />
                        <label htmlFor="username">Username </label>
                        <input id="username" type="text" onChange={e=>handleAddContactChange(e)}/>
                        <div>
                            <button type="submit">Add</button>
                            <button onClick={cancelAddContact}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            {/*  */}

            {/* add a new group */}
            
            {showAddGroup && (
                <div className={ChatPageStyles.addnewgroup}>
                    <span className={ChatPageStyles.x}>Create a new group</span>
                    <input className={ChatPageStyles.y} type="text" placeholder='Group Name'/>
                    
                    <div className={ChatPageStyles.addedmembers}>
                        <span className={ChatPageStyles.addedmember}>hey i was added  </span>
                    </div>

                    <div className={ChatPageStyles.xdd}>
                        <label style={{marginBottom: '14px'}} htmlFor="addmember">Search :</label>
                        <input style={{marginBottom: '14px'}} type="text" />
                        <div className={ChatPageStyles.userslistforgroup}>
                            {_contacts.map((item, index) => (
                                <div className={ChatPageStyles.contact} key={index}>
                                    <span>{index+1}</span>
                                    <span name={item}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={ChatPageStyles.xd} style={{position: 'absolute', marginTop: '350px'}}>
                        <span style={{marginRight: '90px'}}>Create Group</span>
                        <span onClick={() => setShowAddGroup(false)}>Cancel</span>
                    </div>
                </div>
            )}

            {/*  */}
            {newUserAdded && directsOrGroupsDisplay==='directs' && (
                <div className={ChatPageStyles.directs}>
                    {/* {console.log({_contacts})} */}
                    {_contacts.map((item, index) => (
                        <React.Fragment key={index}>
                        <div name={item} className={ChatPageStyles.individualContact} onClick={e=>openChat(e)}>{item}</div>
                        </React.Fragment>
                    ))}
                </div>
            )}

            {activeChat ? (
                <UltimateSocket
                    recipient={activeChat}
                    sender={sessionStorage.getItem('loggedInUser')}
                />
            ) : null}


        </div>
    )
}


export default ChatPage