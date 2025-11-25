package com.andrei.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class AddItemRutinaRequest {

	@NotNull
	private Long ejercicioId;
	
	@NotNull @Min(1)
	private Integer seriesObjetivo;
	
	@NotNull @Min(1)
	private Integer repeticionesObjetivo;

	
	public Long getEjercicioId() {
		return ejercicioId;
	}
	public void setEjercicioId(Long ejercicioId) {
		this.ejercicioId = ejercicioId;
	}

	public Integer getSeriesObjetivo() {
		return seriesObjetivo;
	}
	public void setSeriesObjetivo(Integer seriesObjetivo) {
		this.seriesObjetivo = seriesObjetivo;
	}

	public Integer getRepeticionesObjetivo() {
		return repeticionesObjetivo;
	}
	public void setRepeticionesObjetivo(Integer repeticionesObjetivo) {
		this.repeticionesObjetivo = repeticionesObjetivo;
	}
	
}
