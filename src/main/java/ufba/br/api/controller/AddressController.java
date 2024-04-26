package ufba.br.api.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import ufba.br.api.model.Address;
import ufba.br.api.model.User;
import ufba.br.api.repository.AddressRepository;
import ufba.br.api.repository.UserRepository;
import ufba.br.api.service.UserDetailsServiceImpl;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/address")
public class AddressController {
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping
    public ResponseEntity<Object> store(Authentication authentication, @RequestBody  @Valid Address entity) {
        // get current logged user
        UserDetailsServiceImpl userDetailsServiceImpl = new UserDetailsServiceImpl(userRepository);
        User user = (User) userDetailsServiceImpl.loadUserByUsername(authentication.getName());
        if (!(user instanceof User)) {
            throw new UsernameNotFoundException("User not found");
        }
        entity.setUser(user);
        addressRepository.save(entity);

        // Create a Map representing the response
        Map<String, Long> response = new HashMap<>();
        response.put("id", entity.getId());
        return ResponseEntity.ok(response);
        
    }
    
}
