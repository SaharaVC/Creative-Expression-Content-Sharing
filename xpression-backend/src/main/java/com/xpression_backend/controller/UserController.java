package com.xpression_backend.controller;

import com.xpression_backend.model.User;
import com.xpression_backend.service.UserService;
import com.xpression_backend.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        User savedUser = userService.createUser(user);
        String token = jwtUtil.generateToken(savedUser.getEmail());
        return ResponseEntity.ok(Map.of("token", token, "user", savedUser));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User found = userService.findByEmail(user.getEmail());
        if (found != null && new BCryptPasswordEncoder()
                .matches(user.getPassword(), found.getPassword())) {
            String token = jwtUtil.generateToken(found.getEmail());
            return ResponseEntity.ok(Map.of("token", token, "user", found));
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}