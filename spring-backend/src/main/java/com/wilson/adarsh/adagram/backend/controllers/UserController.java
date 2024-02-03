package com.wilson.adarsh.adagram.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wilson.adarsh.adagram.backend.models.User;
import com.wilson.adarsh.adagram.backend.repositories.UserRepository;

@RestController
@CrossOrigin("http://localhost:3000") //connect to react 's port'
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("user")
    public User uhm(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("users")
    public List<User> uhmm(){
        return userRepository.findAll();
    }
    
}
