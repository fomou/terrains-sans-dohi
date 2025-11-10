package com.example.backend.mapper;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    
    public UserDTO toDto(User user) {
        UserDTO dto = new UserDTO();
        dto.id = user.getId();
        dto.firstName = user.getFirstName();
        dto.lastName = user.getLastName();
        dto.email = user.getEmail();
        dto.role = user.getRole();
        dto.phone = user.getPhone();
        dto.company = user.getCompany();
        dto.licenseNumber = user.getLicenseNumber();
        dto.verified = user.isVerified();
        return dto;
    }

    public User toEntity(UserDTO dto) {
        User user = new User();
        user.setId(dto.id);
        user.setFirstName(dto.firstName);
        user.setLastName(dto.lastName);
        user.setEmail(dto.email);
        user.setRole(dto.role);
        user.setPhone(dto.phone);
        user.setCompany(dto.company);
        user.setLicenseNumber(dto.licenseNumber);
        user.setVerified(dto.verified);
        user.setPassword(dto.password);
        return user;
    }
}
