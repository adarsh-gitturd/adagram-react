package com.wilson.adarsh.adagram.backend.serious_hello;

public class Message {

    // private MessageType type;
    private String content;
    private String sender;
    private String recipient;

    // Constructors
    public Message() {}

    public Message(String sender, String content, String recipient) {
        // this.type = type;
        this.content = content;
        this.sender = sender;
        this.recipient = recipient;
    }

    // public MessageType getType() {
    //     return type;
    // }

    // public void setType(MessageType type) {
    //     this.type = type;
    // }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }



    public enum MessageType {
        CHAT, JOIN, LEAVE
    }
}
