import React, { useEffect, useState } from 'react';
import search from '../images/chat-page/search.png';
import ChatPageStyles from '../styles/chat-page-styles.module.css';

var stompClient = null;

const UltimateSocket = (props) => {
    const [text, setText] = useState('');
    
    useEffect(() => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8081/abc");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);
    }, [])

    const connect = () => {
        
      };
    
    const onConnected = () => {
        console.log("connected");
        stompClient.subscribe(
          "/user/" + props.sender + "/queue/messages",
          onMessageReceived
        );
    };
    
    const onError = (err) => {
        console.log(err);
    };

    const onMessageReceived = (msg) => {
        console.log("Received with love <3:", msg);
    };

    const sendMessage = (msg) => {
        if (msg.trim() !== "") {
            const message = {
                sender: props.sender,
                content: msg,
                recipient: props.recipient
            };
            stompClient.send("/app/chat", {}, JSON.stringify(message));
        }
    };

    const handleMessageSending = (e) => {
        // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        if(e.code != 'Enter'){
            return;
        }
        sendMessage(text);
        setText("");
    };

    return (
        <div className={ChatPageStyles.actualChatArea}>
            <div className={ChatPageStyles.contactName}>
                <div>{props.chatName}</div>
                <img src={search} alt="" />
            </div>

            <div className={ChatPageStyles.actualactualChatArea}>
                <h1>{text} </h1>
            </div>

            <div className={ChatPageStyles.sendAndMediaArea}>
                <input
                    type="text"
                    className={ChatPageStyles.messageToSend}
                    onKeyDown={handleMessageSending}
                    onChange={(event) => setText(event.target.value)}
                />
            </div>
        </div>
    );
};

export default UltimateSocket;
