package com.andrei.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrei.backend.model.RutinaEjercicio;

@Repository
public interface RutinaEjercicioRepository extends JpaRepository<RutinaEjercicio, Long> {
    List<RutinaEjercicio> findByRutinaIdOrderByOrdenAsc(Long rutinaId);

    long countByRutinaId(Long rutinaId);
    
    void deleteByRutinaId(Long rutinaId);

    Optional<RutinaEjercicio> findByRutinaIdAndEjercicioId(Long rutinaId, Long ejercicioId);
    
    Optional<RutinaEjercicio> findTopByRutinaIdOrderByOrdenDesc(Long rutinaId);
    
    List<RutinaEjercicio> findByRutinaIdAndOrdenGreaterThanOrderByOrdenAsc(Long rutinaId, Integer orden);
}
