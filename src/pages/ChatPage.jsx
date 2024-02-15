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

    const [groupMembers, setGroupMembers] = useState([]);
    const [display, setDisplay] = useState([]);

    const [groupName, setGroupName] = useState('');

    const [_groups, _setGroups] = useState([]);
    const [_groupNames, _setGroupNames] = useState([]);

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
        setGroupMembers([]);
        // setDisplay(prev => prev.map(() => true));
        setDisplay(prev => (
            Array(_contacts.length).fill(true)
          ));

        setGroupMembers(prev => (
            Array(_contacts.length).fill('$')
          ));
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
                setDisplay(prev => [...prev, true]);
                setGroupMembers(prev => [...prev, '$']);
                _contacts.push(form.username);
                setDirectOrGroupsDisplay('directs');
                // console.log(_contacts);
                cancelAddContact();
        }
      };
    
    function openChat(e){
        let chat = e.nativeEvent.target.innerHTML;
        setActiveChat(chat);
    }

    function displayDirects(){
        setDirectOrGroupsDisplay('directs')
    }

    function displayGroups(){
        setDirectOrGroupsDisplay('groups')
    }

    function addGroupMember(index){

        setGroupMembers(prevGroupMembers => {
            const updatedMembers = [...prevGroupMembers]; // Create a copy of the array
        
            if(typeof updatedMembers[index] === 'string' && updatedMembers[index].startsWith('$')){
                updatedMembers[index] = updatedMembers[index].substring(1);
                updatedMembers[index] = _contacts[index];
                // console.log("XDXD")
            }
            else if (typeof updatedMembers[index] === 'string' && updatedMembers[index].endsWith('$')) {
                // Remove "$" from the member
                // console.log('lmao')
                updatedMembers[index] = updatedMembers[index].slice(0, -1);
            } else {
                // Add a new element at the index
                // console.log('lol')
                updatedMembers.splice(index, 0, _contacts[index]);
            }
            
        
            return updatedMembers;
          });

        setDisplay(prev => (
            prev.map((item, i) => (i === index ? false : prev[i]))
          ));
        // console.log(groupMembers);
    }

    function removeFromGroup(index){
        setGroupMembers(prevGroupMembers => {
            const updatedGroupMembers = [...prevGroupMembers]; // Create a copy of the array
            updatedGroupMembers[index] += '$'; // Append "$" to the element at the specified index
            return updatedGroupMembers; // Return the updated array
          });


        setDisplay(prev => {
            const updatedDisplay = [...prev]; // Create a copy of the array
            updatedDisplay[index] = true; // Update the value at the specified index
            return updatedDisplay; 

          });
    }

    function updateGroupName(e){
        setGroupName(e.target.value);
    }

    function createGroup() {
        if (groupName) {
            setShowAddGroup(false);
            setDirectOrGroupsDisplay('groups');
    
            const nonDollarMembers = groupMembers.filter(member => !member.includes('$'));

            _setGroups(prev => {
                if (prev.length === 0) {
                    _setGroupNames([groupName]);
                    console.log("IGHT")
                    return [nonDollarMembers];
                } else {
                    const newGroup = [...prev];
                    // const lastRowIndex = newGroup.length - 1;
                    newGroup.push(nonDollarMembers);
                    _setGroupNames([..._groupNames, groupName]);
                    return newGroup;
                }
            });
    
            setGroupMembers([]);
            setDisplay(Array(_contacts.length).fill(true));
            setGroupMembers(Array(_contacts.length).fill('$'));

        }
    }

    // useEffect(()=>{
    //     console.log(_groupNames);
    // }, [_groupNames])

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
                <div onClick={displayDirects} className={ChatPageStyles.direct}>Friends</div>
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
                    <input onChange={e=>updateGroupName(e)}className={ChatPageStyles.y} value={groupName} type="text" placeholder='Group Name'/>
                    
                <div>
                    <div className={ChatPageStyles.addedmembers}>
                        {groupMembers.map((member, index) => {
                        if (!member.includes('$')) {
                            return (
                            <span onClick={() => removeFromGroup(index)} className={ChatPageStyles.contactt} key={index}>
                                {member}
                            </span>
                            );
                        } else {
                            // If member contains "$", do nothing
                            return null;
                        }
                    })}
                    </div>
                </div>

                    <div className={ChatPageStyles.xdd}>
                        <label style={{marginBottom: '14px'}} htmlFor="addmember">Search :</label>
                        <input style={{marginBottom: '14px'}} type="text" />
                        <div className={ChatPageStyles.userslistforgroup}>
                            {_contacts.map((item, index) => (
                                display[index] && (
                                    <div onClick={() => addGroupMember(index)} className={ChatPageStyles.contact} key={index}>
                                        <span>{index + 1}</span>
                                        <span name={item}>{item}</span>
                                    </div>
                                )
                            ))}
                        </div>

                    </div>
                    <div className={ChatPageStyles.xd} style={{position: 'absolute', marginTop: '550px'}}>
                        <span onClick={createGroup} style={{marginRight: '90px'}}>Create Group</span>
                        <span onClick={cancelAddGroup}>Cancel</span>
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

            {directsOrGroupsDisplay==='groups' && (
                <div className={ChatPageStyles.directs}>
                    {/* {console.log({_contacts})} */}
                    {_groups.map((item, index) => (
                        <React.Fragment key={index}>
                            {_groupNames[index]}
                            <div name={item}>{item}</div>
                            <hr />
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