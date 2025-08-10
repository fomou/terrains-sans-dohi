package com.example.backend.repository;

import com.example.backend.entity.Property;
import com.example.backend.entity.User;
import com.example.backend.entity.VerificationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findById(Integer id);
}

