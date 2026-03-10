package com.andrei.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(
	name = "rutina_ejercicios",
	uniqueConstraints = @UniqueConstraint(columnNames = {"rutina_id","orden"})
)
public class RutinaEjercicio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "rutina_id")
	private Rutina rutina;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "ejercicio_id")
	private Ejercicio ejercicio;
	
	@Min(1)
	@NotNull
	private Integer orden;
	
	@Min(1)
	@NotNull
	@Column(name = "series_objetivo", nullable = false)
	private Integer seriesObjetivo;
	
	@Min(1)
	@NotNull
	@Column(name = "repeticiones_objetivo", nullable = false)
	private Integer repeticionesObjetivo;

	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public Rutina getRutina() {
		return rutina;
	}
	public void setRutina(Rutina rutina) {
		this.rutina = rutina;
	}

	public Ejercicio getEjercicio() {
		return ejercicio;
	}
	public void setEjercicio(Ejercicio ejercicio) {
		this.ejercicio = ejercicio;
	}

	public Integer getOrden() {
		return orden;
	}
	public void setOrden(Integer orden) {
		this.orden = orden;
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
