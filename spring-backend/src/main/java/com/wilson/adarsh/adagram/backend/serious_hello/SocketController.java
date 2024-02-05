package com.wilson.adarsh.adagram.backend.serious_hello;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:3000") //connect to react 's port'
@Controller
public class SocketController {
    private final Logger logger = LoggerFactory.getLogger(SocketController.class);

    @MessageMapping("/chat") // from client
    @SendTo("/topic/message") // to client
    public String chat(Message message) {
        return "AYO";
    }

    @MessageMapping("/chat-test") // from client
    @SendTo("/topic/test") // to client
    public Message test(Message message) {
        message.setContent("HELLO CLIENT FROM DA BOSS");
        return message;
    }

    // ONE TO ONE STUFF YKNOW

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat-send")
    public void sendMessage(@Payload Message chatMessage) {
        // Include both sender and recipient in the destination path
        String destination = "/user/" + chatMessage.getRecipient() + "/topic/private/";

        // Forward the message to the specified destination
        messagingTemplate.convertAndSend(destination, chatMessage);
    }
    

}
