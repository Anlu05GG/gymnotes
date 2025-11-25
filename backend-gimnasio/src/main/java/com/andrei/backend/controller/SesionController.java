package com.andrei.backend.controller;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.andrei.backend.dto.AddSerieRequest;
import com.andrei.backend.model.Serie;
import com.andrei.backend.model.Sesion;
import com.andrei.backend.service.SesionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/sesiones")
public class SesionController {

    private final SesionService sesionService;

    public SesionController(SesionService sesionService) {
        this.sesionService = sesionService;
    }

    @PostMapping
    public ResponseEntity<Sesion> crear(@RequestParam Long usuarioId) {
        Sesion sesion = sesionService.crearSesion(usuarioId);
        URI location = URI.create("/sesiones/" + sesion.getId());
        return ResponseEntity.created(location).body(sesion);
    }

    @GetMapping
    public List<Sesion> listar(@RequestParam Long usuarioId) {
        return sesionService.listarSesiones(usuarioId);
    }

    @GetMapping("/por-fecha")
    public Sesion porFecha(@RequestParam Long usuarioId,
                           @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return sesionService.buscarPorFecha(usuarioId, fecha)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sin sesión ese día"));
    }

    @GetMapping("/rango")
    public List<Sesion> sesionesEnRango(@RequestParam Long usuarioId,
                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta) {
        return sesionService.sesionesEnRango(usuarioId, desde, hasta);
    }

    @PostMapping("/{sesionId}/series")
    public ResponseEntity<Serie> agregarSerie(@PathVariable Long sesionId,
                                              @Valid @RequestBody AddSerieRequest request) {
        Serie serie = sesionService.agregarSerie(
                sesionId,
                request.getEjercicioId(),
                request.getRepeticiones(),
                request.getPeso()
        );

        URI location = URI.create("/sesiones/" + sesionId + "/series/" + serie.getId());
        return ResponseEntity.created(location).body(serie);
    }

    @GetMapping("/{sesionId}/series")
    public List<Serie> listarSeries(@PathVariable Long sesionId) {
        return sesionService.listarSeries(sesionId);
    }
}
