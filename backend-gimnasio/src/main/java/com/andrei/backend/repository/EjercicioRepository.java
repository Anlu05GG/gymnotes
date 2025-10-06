package com.andrei.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrei.backend.model.Ejercicio;

@Repository
public interface EjercicioRepository extends JpaRepository<Ejercicio, Long> {}
