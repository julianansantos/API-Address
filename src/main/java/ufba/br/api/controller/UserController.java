package ufba.br.api.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import ufba.br.api.form.UserForm;
import ufba.br.api.model.User;
import ufba.br.api.repository.UserRepository;
import ufba.br.api.service.UserService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("register")
    public ResponseEntity<Object> register(@RequestBody @Valid UserForm user) {
        User newUser = userService.store(user);
        return ResponseEntity.ok(newUser);
    }
    
}
