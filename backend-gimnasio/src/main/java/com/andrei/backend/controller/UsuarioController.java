package com.andrei.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andrei.backend.model.Usuario;
import com.andrei.backend.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	// Buscar por email
	@GetMapping("/email/{email}")
	public Usuario getByEmail(@PathVariable String email) {
		return usuarioService.findByEmail(email);
	}
	
	// Registrar
	@PostMapping
	public Usuario registrar(@RequestBody Usuario usuario) {
		return usuarioService.save(usuario);
	}

}
