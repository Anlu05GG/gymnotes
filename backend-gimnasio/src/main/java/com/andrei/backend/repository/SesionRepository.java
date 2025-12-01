package com.andrei.backend.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrei.backend.model.Sesion;

@Repository
public interface SesionRepository extends JpaRepository<Sesion, Long> {
	List<Sesion> findByUsuarioIdOrderByFechaDesc(Long usuarioId);
	
	Optional<Sesion> findByUsuarioIdAndFecha(Long usuarioId, LocalDate fecha);
	
    List<Sesion> findByUsuarioIdAndFechaBetweenOrderByFechaAsc(Long usuarioId, LocalDate desde, LocalDate hasta);
}
