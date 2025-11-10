package com.example.backend.dto;

import java.time.LocalDateTime;

public class UserDTO {
    public Integer id;
    public String firstName;
    public String lastName;
    public String password;
    public String email;
    public String role; // buyer, seller, notary
    public String phone;
    public String company;
    public String licenseNumber;
    public boolean verified;
    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;
}
