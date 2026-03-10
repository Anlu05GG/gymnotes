package com.andrei.backend.dto;


import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class AddSerieRequest {

	@NotNull
	private Long ejercicioId;
	
	@NotNull @Min(1)
	private Integer repeticiones;
	
	@DecimalMin(value = "0.0", inclusive = true)
	private Double peso;

	
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
