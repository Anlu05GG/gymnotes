package com.andrei.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andrei.backend.model.Usuario;
import com.andrei.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	// Buscar por email
	public Usuario findByEmail(String email) {
		return usuarioRepository.findByEmail(email);
	}
	
	// Registrar
	public Usuario save(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}
	
}
