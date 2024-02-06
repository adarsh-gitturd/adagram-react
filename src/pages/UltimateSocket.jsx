import React, { useEffect, useState } from 'react';
import search from '../images/chat-page/search.png';
import ChatPageStyles from '../styles/chat-page-styles.module.css';

var stompClient = null;

const UltimateSocket = (props) => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    // const [messagesReceived, setMessagesRevy] = useState([]);
    
    useEffect(() => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8081/abc");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, [text])
    
    const onConnected = () => {
        console.log("connected");
        if(stompClient && stompClient.connected){
            stompClient.subscribe(
                "/user/" + props.sender + "/queue/messages",
                onMessageReceived
            );

        }
    };
    
    const onError = (err) => {
        console.log(err);
    };

    const onMessageReceived = (msg) => {
        console.log("Received with love <3:", msg);
        const DADAcontent = JSON.parse(msg.body).content;
        setMessages([...messages, DADAcontent]);
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
        setMessages([...messages, text]);
        setText("");
    };

    return (
        <div className={ChatPageStyles.actualChatArea}>
            <div className={ChatPageStyles.contactName}>
                <div>{props.chatName}</div>
                <img src={search} alt="" />
            </div>

            <div className={ChatPageStyles.actualactualChatArea}>
                {messages.map((item, index) => (
                    <h2 key={index}>{item}</h2>
                ))}
            </div>

            <div className={ChatPageStyles.sendAndMediaArea}>
                <input
                    type="text"
                    value={text}
                    className={ChatPageStyles.messageToSend}
                    onKeyDown={handleMessageSending}
                    onChange={(event) => {
                        setText(event.target.value)
                    }}
                />
            </div>
        </div>
    );
};

export default UltimateSocket;
