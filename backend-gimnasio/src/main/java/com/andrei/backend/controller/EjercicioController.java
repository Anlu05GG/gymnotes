package com.andrei.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

    // Crear o actualizar
    @PostMapping
    public Ejercicio create(@RequestBody Ejercicio ejercicio) {
        return ejercicioService.save(ejercicio);
    }

    // Actualizar
    @PutMapping("/{id}")
    public Ejercicio update(@PathVariable Long id, @RequestBody Ejercicio ejercicio) {
        ejercicio.setId(id);
        return ejercicioService.save(ejercicio);
    }

    // Borrar
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        ejercicioService.delete(id);
    }
}
