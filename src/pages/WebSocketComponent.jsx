import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const WebSocketComponent = (props) => {
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8081/abc');
        const stomp = Stomp.over(socket);

        stomp.connect({}, () => {
            console.log('Connected to WebSocket yoo');
            setStompClient(stomp);
            console.log(`STOMP CLIENT ---> ${stomp}`);

            const subscriptionPath = `/user/${props.recipient}/topic/private/${props.sender}`; // Replace DEF with the actual recipient and ABC with the sender

            stomp.subscribe(subscriptionPath, (message) => {
                console.log('Received private message:', message.body);
                // Handle the received message as needed
                // You can update the state in ChatPage.jsx to display the received message
            });
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
                console.log('Disconnected from WebSocket yoo');
            }
        };
    }, [props.sender]); // Move the dependency array here

    useEffect(() => {
        // This useEffect is intended for sending messages
        if (stompClient) {
            const chatMessage = {
                sender: props.sender,
                content: props.mts,
                recipient: props.recipient,
                type: 'CHAT'
            };
            stompClient.send(`/app/chat.send`, {}, JSON.stringify(chatMessage));
        } else {
            console.error('Stomp client is not initialized.');
        }
    }, [stompClient, props.mts, props.recipient]); // Dependencies for sending messages

    return (
        <div>
            umm hello
            {/* react stuff */}
        </div>
    );
};

export default WebSocketComponent;
