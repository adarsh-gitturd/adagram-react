import React, { useEffect, useState } from 'react';
import StompJs from 'stompjs';
import send from '../images/chat-page/send.png';

const HelloSocket = () => {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messageToSend, setMessageToSend] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newStompClient = new StompJs.Client({
      brokerURL: 'ws://localhost:8081/gs-guide-websocket',
    });

    newStompClient.onConnect = (frame) => {
      setConnected(true);
      console.log('Connected: ' + frame);
      newStompClient.subscribe('/topic/messages', (message) => {
        receiveMessage(JSON.parse(message.body));
      });
    };

    setStompClient(newStompClient);
    newStompClient.activate();

    return () => {
      // Cleanup on component unmount
      newStompClient.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && messageToSend.trim() !== '') {
      stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify({ content: messageToSend }),
      });

      // Clear the message input after sending
      setMessageToSend('');
    }
  };

  const receiveMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message.content]);
  };

  return (
    <div>
      <div>
        <div>
          {connected ? (
            <div>Connected!</div>
          ) : (
            <div>Connecting...</div>
          )}
        </div>
        <div>
          <input
            type="text"
            className="messageToSend"
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
          />
          <img src={send} alt="" onClick={sendMessage} />
        </div>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelloSocket;
