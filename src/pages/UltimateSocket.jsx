import React, { useEffect, useState } from 'react';
import search from '../images/chat-page/search.png';
import ChatPageStyles from '../styles/chat-page-styles.module.css';

var stompClient = null;

/*
    problems : 
        1) no duplicates - ironic spam control?

*/

const UltimateSocket = (props) => {
    const [text, setText] = useState('');
    // const [messages, setMessages] = useState([]);
    const [hh, setHh] = useState(false);

    const [daMessages, setDaMessages] = useState([]);

    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    SockJS = new SockJS("http://localhost:8081/abc");
    stompClient = Stomp.over(SockJS);
    useEffect(() => {
        stompClient.connect({}, onConnected, onError);

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, [hh, daMessages]);

    // useEffect(()=>{
    //     if (stompClient.connected) {
    //         stompClient.subscribe(
    //             "/user/" + props.sender + "/queue/messages" + props.recipient,
    //             onMessageReceived
    //         );
    //     }
    // }, [])

    const onConnected = () => {
        console.log("connected");
        if (stompClient.connected) {
            stompClient.subscribe(
                "/user/" + props.sender + "/queue/messages" + props.recipient,
                onMessageReceived
            );
        }
    };

    const onError = (err) => {
        console.log(err);
    };

    const onMessageReceived = (msg) => {

        console.log("Received with love <3:", msg);
        setHh(true);
        const DADAcontent = JSON.parse(msg.body).content;

        // setMessages([...messages, DADAcontent]);
        // messages.push(DADAcontent);

        setDaMessages(prevMessages => {
        const previousMessages = prevMessages[props.recipient] || [];
        const shouldAddContent = previousMessages.length === 0 || previousMessages[previousMessages.length - 1] !== DADAcontent;

        if (shouldAddContent) {
            return {
                ...prevMessages,
                [props.recipient]: [...previousMessages, DADAcontent]
            };
        } else {
            return prevMessages;
        }

        // setDaMessages(prevMessages => ({
        //     ...prevMessages,
        //     [props.recipient]: [...(prevMessages[props.recipient] || []), DADAcontent]
        // }));

});

    };

    const sendMessage = (msg) => {
        if (msg.trim() !== "") {
            const message = {
                sender: props.sender,
                content: msg,
                recipient: props.recipient
            };
            setHh(false);
            stompClient.send("/app/chat", {}, JSON.stringify(message));
        }
    };

    const handleMessageSending = (e) => {
        if (e.code !== 'Enter') {
            return;
        }
        if (daMessages.length == 0) {
            setHh(true);
        }
        // setMessages([...messages, text]);

        setDaMessages(prevMessages => ({
            ...prevMessages,
            [props.recipient]: [...(prevMessages[props.recipient] || []),  `YOU : ${text}`]
        }));

        sendMessage(text);
        setText("");
    };

    
// (456) ['XD', 'XD', '?', 'LOL']

// (adarshdesu) ['yo desu', 'ho buddy']

    return (
        <div className={ChatPageStyles.actualChatArea}>
            <div className={ChatPageStyles.contactName}>
                <div>{props.recipient}</div>
                <img src={search} alt="" />
            </div>

            <div className={ChatPageStyles.actualactualChatArea}>
                {console.log(daMessages)} 
                {/* {messages.map((item, index) => (
                    <h2 key={index}>
                        {hh ? `${props.sender} --- ${item}` : `${props.recipient} --- ${item}`}
                    </h2>
                ))} */}

                {daMessages[props.recipient]?.map((message, index) => (
                    <h2 key={index}>
                    {/* {hh ? props.sender : props.recipient} == {message} */}
                    {message}
                </h2>
                ))}

            </div>

            <div className={ChatPageStyles.sendAndMediaArea}>
                <input
                    type="text"
                    value={text}
                    className={ChatPageStyles.messageToSend}
                    onKeyDown={handleMessageSending}
                    onChange={(event) => {
                        setText(event.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default UltimateSocket;
