package com.andrei.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrei.backend.model.Rutina;

@Repository
public interface RutinaRepository extends JpaRepository<Rutina, Long> {
	List<Rutina> findByUsuarioIdOrderByNombreAsc(Long usuarioId);
}
