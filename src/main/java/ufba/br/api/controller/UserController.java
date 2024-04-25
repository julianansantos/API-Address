package ufba.br.api.controller;

import org.springframework.web.bind.annotation.RestController;

import ufba.br.api.form.UserForm;
import ufba.br.api.model.User;
import ufba.br.api.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("register")
    public User register(@RequestBody UserForm user) {
        User newUser = new User();
        newUser.setName(user.name());
        newUser.setPassword(passwordEncoder.encode(user.password()));
        return userRepository.save(newUser);
    }
    
}
