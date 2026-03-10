package com.andrei.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.andrei.backend.model.Ejercicio;

@Repository
public interface EjercicioRepository extends JpaRepository<Ejercicio, Long> {
	List<Ejercicio> findByNombreContainingIgnoreCaseOrderByNombreAsc(String q);

    @Query("select distinct e.grupoMuscular from Ejercicio e order by e.grupoMuscular")
    List<String> findDistinctGrupoMuscular();

    List<Ejercicio> findByGrupoMuscularOrderByNombreAsc(String grupo);
}
