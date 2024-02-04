import SockJsClient from 'react-stomp';

<SockJsClient url='http://localhost:8080/websocket-chat/'
   topics={['/topic/user']}
   onConnect={() => {
       console.log("connected");
   }}
   onDisconnect={() => {
       console.log("Disconnected");
   }}
   onMessage={(msg) => {
       console.log(msg);
   }}
   ref={(client) => {
       this.clientRef = client
}}/>
