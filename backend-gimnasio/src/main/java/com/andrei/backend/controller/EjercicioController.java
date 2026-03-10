package com.andrei.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.andrei.backend.model.Ejercicio;
import com.andrei.backend.service.EjercicioService;

@RestController
@RequestMapping("/ejercicios")
public class EjercicioController {

    @Autowired
    private EjercicioService ejercicioService;

    // Listar todos
    @GetMapping
    public List<Ejercicio> getAll() {
        return ejercicioService.findAll();
    }

    // Buscar por id
    @GetMapping("/{id}")
    public Optional<Ejercicio> getById(@PathVariable Long id) {
        return ejercicioService.findById(id);
    }
    
    // Buscar por nombre
    @GetMapping("/search")
    public List<Ejercicio> search(@RequestParam String q) {
        return ejercicioService.buscarPorNombre(q);
    }

    // Listar grupos
    @GetMapping("/grupos")
    public List<String> grupos() {
        return ejercicioService.listarGrupos();
    }

    // Listar por grupo
    @GetMapping("/grupo/{g}")
    public List<Ejercicio> porGrupo(@PathVariable String g) {
        return ejercicioService.listarPorGrupo(g);
    }
    
}
