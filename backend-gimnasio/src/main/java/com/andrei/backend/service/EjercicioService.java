package com.andrei.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andrei.backend.model.Ejercicio;
import com.andrei.backend.repository.EjercicioRepository;

@Service
public class EjercicioService {

    @Autowired
    private EjercicioRepository ejercicioRepository;

    // Listar todos
    public List<Ejercicio> findAll() {
        return ejercicioRepository.findAll();
    }

    // Buscar por id
    public Optional<Ejercicio> findById(Long id) {
        return ejercicioRepository.findById(id);
    }

    // Guardar o actualizar
    public Ejercicio save(Ejercicio ejercicio) {
        return ejercicioRepository.save(ejercicio);
    }

    // Borrar por id
    public void delete(Long id) {
        ejercicioRepository.deleteById(id);
    }
    
}
