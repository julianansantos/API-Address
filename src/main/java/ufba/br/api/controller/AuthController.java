package ufba.br.api.controller;

import org.springframework.web.bind.annotation.RestController;

import ufba.br.api.service.AuthenticationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
public class AuthController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("auth")
    public String authenticate(
        Authentication authentication) {
        return authenticationService.authenticate(authentication);
    }
    
}
