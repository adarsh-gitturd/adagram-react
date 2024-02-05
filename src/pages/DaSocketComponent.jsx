import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const DaSocketComponent = (props) => {
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8081/abc');
        const stomp = Stomp.over(socket);

        stomp.connect({}, () => {
            setStompClient(stomp);

            const subscriptionPath = `/user/${props.sender}/topic/private/${props.recipient}`;
            
            stomp.subscribe(subscriptionPath, msg => {
                console.log(`Received da msg from da server ---> ${msg}`);
            });

            const info = {
                sender: props.sender,
                content: props.mts.mts,
                recipient: props.recipient,
            };

            stomp.send('/app/chat-send', {}, JSON.stringify(info));
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
            {/* You can include any JSX content related to this component */}
        </div>
    );
};

export default DaSocketComponent;
