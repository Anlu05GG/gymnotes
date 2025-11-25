package com.andrei.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.andrei.backend.model.Usuario;
import com.andrei.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public Usuario registrar(Usuario usuario) {
		
		usuario.setEmail(usuario.getEmail().trim().toLowerCase());
		if (usuarioRepository.existsByEmail(usuario.getEmail())) {
			throw new IllegalArgumentException("El email ya está registrado");
		}
		
		String hash = passwordEncoder.encode(usuario.getPassword());
		usuario.setPassword(hash);
		
		return usuarioRepository.save(usuario);
	}
	
	public Usuario login(String email, String rawPassword) {
		
		email = email.trim().toLowerCase();
		Usuario u = usuarioRepository.findByEmail(email);
		if (u == null) {
			throw new IllegalArgumentException("El correo o la contraseña son incorrectos");
		}
		
		boolean ok = passwordEncoder.matches(rawPassword, u.getPassword());
		if (!ok) {
			throw new IllegalArgumentException("El correo o la contraseña son incorrectos");
		}
		
		return u;
	}
	
	public Usuario findByEmail(String email) {
		
		return usuarioRepository.findByEmail(email);
	}
	
}
