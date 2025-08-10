package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.SecurityConfiguration;
import com.example.backend.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private  SecurityConfiguration securityConfiguration;


    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private  UserRepository userRepository;

    @Autowired
    private  PasswordEncoder passwordEncoder;

    @Autowired
    private  SecurityConfiguration securityConfig;



    @Autowired
    private UserService userService;
    @GetMapping("/health")
    public  String healthCheck(){
        return "Login and signup controller ok";
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest userDetails){
        try{

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDetails.email,userDetails.password));

            Map<String, String> res = new HashMap<>();
            User user = userRepository.findByEmail(userDetails.email).orElseThrow();
            String dummy_key =  "ma-cle-secrete-tres-longue-et-tres-securisee-1234";
            Key key = new SecretKeySpec(dummy_key.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());

            String token = Jwts.builder()
                            .setSubject(userDetails.email)
                            .claim("firstName", user.getFirstName())
                            .claim("lastName", user.getLastName())
                                    .claim("role", user.getRole())
                                            .claim("id", user.getId().toString())
                                                    .claim("email", user.getEmail())
                                                            .setIssuedAt(new Date())
                                                                    .setExpiration(new Date(System.currentTimeMillis()+3600_000))
                                                                            .signWith(SignatureAlgorithm.HS256,key).compact();


                                                                            res.put("token", token);

            UsernamePasswordAuthenticationToken autheToken = new UsernamePasswordAuthenticationToken(userDetails.email, userDetails.password);
            authenticationManager.authenticate(autheToken);
            SecurityContextHolder.getContext().setAuthentication(autheToken);
            return ResponseEntity.ok(res);
        } catch (AuthenticationException e){
            Map<String, String> res = new HashMap<>();
            res.put("message", "Invalid password or e-mail");
            return ResponseEntity.status(401).body(res);
        }

    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> register(@RequestBody UserDTO userDTO) {


        System.out.println("endpoint hit");
        if (userRepository.existsByEmail(userDTO.email)) {
            Map<String, String> res = new HashMap<>();
            res.put("message", "Email already exists");
            return ResponseEntity.badRequest().body(res);
        }
        try {
            Map<String, String> res = new HashMap<>();


            String dummy_key = "ma-cle-secrete-tres-longue-et-tres-securisee-1234";
            Key key = new SecretKeySpec(dummy_key.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
            userService.registerUser(userDTO);
            UserDTO newuserDto = userService.loadUserByUserEmail(userDTO.email);

            String token = Jwts.builder()
                    .setSubject(newuserDto.email)
                    .claim("firstName", newuserDto.firstName)
                    .claim("lastName", newuserDto.lastName)
                    .claim("role", newuserDto.role)
                    .claim("id", newuserDto.id.toString())
                    .claim("email", newuserDto.email)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 3600_000))
                    .signWith(SignatureAlgorithm.HS256, key)
                    .compact();
            res.put("token", token);
            res.put("message", "User registered successfully");
            UsernamePasswordAuthenticationToken autheToken = new UsernamePasswordAuthenticationToken(newuserDto.email, userDTO.password);
            authenticationManager.authenticate(autheToken);
            SecurityContextHolder.getContext().setAuthentication(autheToken);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            Map<String, String> res = new HashMap<>();
            res.put("message", e.getMessage());
            return ResponseEntity.status(401).body(res);
        }
    }
        @GetMapping("/protected")
        public String protectedEndpoint() {
            return "Protected endpoint accessed by";

    }
}
