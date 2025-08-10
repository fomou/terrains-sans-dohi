package com.example.backend.security;


import com.example.backend.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.nio.charset.StandardCharsets;


import java.io.IOException;

@Component
public class JwtFiler extends OncePerRequestFilter {





    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        if(header != null && header.startsWith("Bearer ") ){
            String key =  "ma-cle-secrete-tres-longue-et-tres-securisee-1234";;

            try{
                String token = header.substring(7);
                Claims clain = Jwts.parser()
                        .setSigningKey(key)
                        .parseClaimsJwt(token)
                        .getBody();

                request.setAttribute("email", clain.get("email"));
                request.setAttribute("firstName", clain.get("firstName"));
                request.setAttribute("lastName", clain.get("lastName"));
                request.setAttribute("role", clain.get("role"));

            }catch(JwtException e){
                System.out.println(e.toString());
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return;
            }

        }

        filterChain.doFilter(request, response);
    }
}
