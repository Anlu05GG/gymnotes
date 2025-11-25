package com.andrei.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.andrei.backend.model.Serie;

@Repository
public interface SerieRepository extends JpaRepository<Serie, Long> {
	List<Serie> findBySesionId(Long sesionId);
}
