package com.example.backend.service;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Locale;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Autowired
    private PasswordEncoder pwdEncoder;

    public UserDTO registerUser(UserDTO userDTO) throws Exception {

        User user = userMapper.toEntity(userDTO);
        user.setPassword(pwdEncoder.encode(user.getPassword()));
        user.setRole(user.getRole().toUpperCase(Locale.ROOT));

        return userMapper.toDto(userRepository.save(user));
    }

    public UserDTO loadUserByUserEmail(String email) throws UsernameNotFoundException{
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return userMapper.toDto(user);

    }
    
}
