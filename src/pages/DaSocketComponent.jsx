import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const DaSocketComponent = (props) => {
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8081/abc');
        const stomp = Stomp.over(socket);

        console.log(`SENDER ${props.sender} +++++ RECIPIENT ${props.recipient}`);

        stomp.connect({}, () => {
            setStompClient(stomp);

            const subscriptionPath = `/user/${props.recipient}/topic/private/${props.sender}`;
            stomp.subscribe(subscriptionPath, msg => {
                console.log(`Received da msg from da server ---> ${msg}`);
                
            });

            // stompClient.send('/app/chat', {}, JSON.stringify({ content: 'Hello, Server!' }));
            const msgToSend = {
                sender: props.sender,
                content: props.mts.mts,
                recipient: props.recipient,
            };

            console.log(`msg to send ${JSON.stringify(msgToSend)}`);
            stomp.send('/app/chat-send', {}, JSON.stringify(msgToSend));
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
                console.log('Disconnected from WebSocket yoo');
            }
        };
    }, [props.sender, props.recipient, props.mts.mts]);

    return (
        <div>
            {/* You can include any JSX content related to this component */}
        </div>
    );
};

export default DaSocketComponent;
