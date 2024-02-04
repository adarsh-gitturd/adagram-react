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

            stomp.subscribe(`/topic/test`, (message) => {
                console.log('Received message from da bludonius serva:', message.body);
                // Handle the received message as needed
            });
    
            stomp.send(`/app/chat-test`, {}, JSON.stringify({ content: "boss yo" }));

        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
                console.log('Disconnected from WebSocket yoo');
            }
        };
    }, []);

    return (
        <div>
            {/* react stuff */}
        </div>
    );
};

export default WebSocketComponent;
