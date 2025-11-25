package com.andrei.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.andrei.backend.dto.LoginRequest;
import com.andrei.backend.model.Usuario;
import com.andrei.backend.service.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid Usuario nuevo) {
    	
    	try {
    		Usuario u = usuarioService.registrar(nuevo);
            u.setPassword(null);
            
            return ResponseEntity.ok(u);
    	} catch (IllegalArgumentException e) {
    		return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    	}
        
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest req) {
        try {
            Usuario u = usuarioService.login(req.getEmail(), req.getPassword());
            u.setPassword(null);
            
            return ResponseEntity.ok(u);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }
}
