package com.andrei.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "series")
public class Serie {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Long sesionId;
	
	private Long ejercicioId;
	
	private Integer repeticiones;
	
	private Double peso;

	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public Long getSesionId() {
		return sesionId;
	}
	public void setSesionId(Long sesionId) {
		this.sesionId = sesionId;
	}

	public Long getEjercicioId() {
		return ejercicioId;
	}
	public void setEjercicioId(Long ejercicioId) {
		this.ejercicioId = ejercicioId;
	}

	public Integer getRepeticiones() {
		return repeticiones;
	}
	public void setRepeticiones(Integer repeticiones) {
		this.repeticiones = repeticiones;
	}

	public Double getPeso() {
		return peso;
	}
	public void setPeso(Double peso) {
		this.peso = peso;
	}
	
}
