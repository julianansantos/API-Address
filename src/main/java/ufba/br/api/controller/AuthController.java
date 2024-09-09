package ufba.br.api.controller;

import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import ufba.br.api.dto.LoginForm;
import ufba.br.api.model.User;
import ufba.br.api.service.JwtService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import ufba.br.api.dto.AuthResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.security.core.Authentication;



@RestController
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;


    @PostMapping("auth")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody @Valid LoginForm body) {
        if (body == null) {
            throw new IllegalArgumentException("Authentication is required");
        }
        var usernamePassword = new UsernamePasswordAuthenticationToken(body.name(), body.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = jwtService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new AuthResponse((User) auth.getPrincipal(), token));
    }
    
}
