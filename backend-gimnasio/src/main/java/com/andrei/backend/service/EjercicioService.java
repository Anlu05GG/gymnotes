package com.andrei.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.andrei.backend.model.Ejercicio;
import com.andrei.backend.repository.EjercicioRepository;

@Service
public class EjercicioService {

    @Autowired
    private EjercicioRepository ejercicioRepository;

    // Devuelve todos los ejercicios ordenados por nombre
    public List<Ejercicio> findAll() {
        return ejercicioRepository.findAll(Sort.by("nombre").ascending());
    }

    // Buscar por id
    public Optional<Ejercicio> findById(Long id) {
        return ejercicioRepository.findById(id);
    }

    // Buscar por contenido de nombre ignorando mayúsculas
    public List<Ejercicio> buscarPorNombre(String q) {
        return ejercicioRepository.findByNombreContainingIgnoreCaseOrderByNombreAsc(q);
    }

    // Lista de grupos musculares sin repetidos
    public List<String> listarGrupos() {
        return ejercicioRepository.findDistinctGrupoMuscular();
    }

    // Filtrados por grupo muscular
    public List<Ejercicio> listarPorGrupo(String grupo) {
        return ejercicioRepository.findByGrupoMuscularOrderByNombreAsc(grupo);
    }
}
