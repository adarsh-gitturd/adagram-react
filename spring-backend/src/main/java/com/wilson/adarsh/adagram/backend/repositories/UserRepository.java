package com.wilson.adarsh.adagram.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wilson.adarsh.adagram.backend.models.User;

public interface UserRepository extends 
    JpaRepository<User, Long>{

    
} 
