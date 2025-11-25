package com.andrei.backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.andrei.backend.model.Serie;
import com.andrei.backend.model.Sesion;
import com.andrei.backend.repository.SerieRepository;
import com.andrei.backend.repository.SesionRepository;

@Service
public class SesionService {

	private final SesionRepository sesionRepository;
	private final SerieRepository serieRepository;
	
	public SesionService(SesionRepository sesionRepository, SerieRepository serieRepository) {
		this.sesionRepository = sesionRepository;
		this.serieRepository = serieRepository;
	}
	
	public Sesion crearSesion(Long usuarioId) {
        LocalDate hoy = LocalDate.now();
        return sesionRepository
                .findByUsuarioIdAndFecha(usuarioId, hoy)
                .orElseGet(() -> {
                    Sesion s = new Sesion();
                    s.setUsuarioId(usuarioId);
                    s.setFecha(hoy);
                    return sesionRepository.save(s);
                });
    }
	
	public List<Sesion> listarSesiones(Long usuarioId) {
		return sesionRepository.findByUsuarioIdOrderByFechaDesc(usuarioId);
	}
	
	public Optional<Sesion> buscarPorFecha(Long usuarioId, LocalDate fecha) {
	    return sesionRepository.findByUsuarioIdAndFecha(usuarioId, fecha);
	}
	
	public List<Sesion> sesionesEnRango(Long usuarioId, LocalDate desde, LocalDate hasta) {
        return sesionRepository.findByUsuarioIdAndFechaBetweenOrderByFechaAsc(usuarioId, desde, hasta);
    }
	
	public Serie agregarSerie(Long sesionId, Long ejercicioId, Integer repeticiones, Double peso) {
		Serie serie = new Serie();
		serie.setSesionId(sesionId);
		serie.setEjercicioId(ejercicioId);
		serie.setRepeticiones(repeticiones);
		serie.setPeso(peso);
		return serieRepository.save(serie);
	}
	
	public List<Serie> listarSeries(Long sesionId) {
		return serieRepository.findBySesionId(sesionId);
	}
	
}
