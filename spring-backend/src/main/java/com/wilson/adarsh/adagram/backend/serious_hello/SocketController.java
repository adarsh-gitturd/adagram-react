package com.wilson.adarsh.adagram.backend.serious_hello;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {

    @MessageMapping("/chat") // from client
    @SendTo("/topic/message") // to client
    public Message chat(Message message) {
        return message;
    }
}
