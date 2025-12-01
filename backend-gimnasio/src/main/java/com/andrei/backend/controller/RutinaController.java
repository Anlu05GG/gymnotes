package com.andrei.backend.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.andrei.backend.dto.CrearRutinaRequest;
import com.andrei.backend.dto.RutinaItemDTO;
import com.andrei.backend.dto.AddItemRutinaRequest;
import com.andrei.backend.model.Rutina;
import com.andrei.backend.model.RutinaEjercicio;
import com.andrei.backend.service.RutinaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/rutinas")
public class RutinaController {

    private final RutinaService rutinaService;

    public RutinaController(RutinaService rutinaService) {
        this.rutinaService = rutinaService;
    }

    // Listar rutinas de usuario
    @GetMapping
    public List<Rutina> listar(@RequestParam Long usuarioId) {
        return rutinaService.listarPorUsuario(usuarioId);
    }

    // Crear rutina
    @PostMapping
    public ResponseEntity<Rutina> crear(@Valid @RequestBody CrearRutinaRequest dto) {
        Rutina r = new Rutina();
        r.setNombre(dto.getNombre());
        r.setUsuarioId(dto.getUsuarioId());
        Rutina guardada = rutinaService.crearRutina(r);

        URI location = URI.create("/rutinas/" + guardada.getId());
        return ResponseEntity.created(location).body(guardada);
    }

    // Borrar rutina
    @DeleteMapping("/{rutinaId}")
    public ResponseEntity<Void> borrar(@PathVariable Long rutinaId) {
        rutinaService.borrarRutina(rutinaId);
        return ResponseEntity.noContent().build();
    }

    // Listar ejercicios de rutina
    @GetMapping("/{rutinaId}/items")
    public List<RutinaItemDTO> items(@PathVariable Long rutinaId) {
        return rutinaService.listarItems(rutinaId).stream().map(item -> {
            RutinaItemDTO dto = new RutinaItemDTO();
            dto.id = item.getId();
            dto.ejercicioId = item.getEjercicio().getId();
            dto.ejercicioNombre = item.getEjercicio().getNombre();
            dto.seriesObjetivo = item.getSeriesObjetivo();
            dto.repeticionesObjetivo = item.getRepeticionesObjetivo();
            dto.orden = item.getOrden();
            return dto;
        }).toList();
    }

    // Añadir ejercicio a rutina
    @PostMapping("/{rutinaId}/items")
    public ResponseEntity<RutinaItemDTO> addItem(@PathVariable Long rutinaId,
                                                 @Valid @RequestBody AddItemRutinaRequest req) {
        RutinaEjercicio item = rutinaService.addItem(
                rutinaId, req.getEjercicioId(), req.getSeriesObjetivo(), req.getRepeticionesObjetivo()
        );

        URI location = URI.create("/rutinas/" + rutinaId + "/items/" + item.getId());

        RutinaItemDTO dto = new RutinaItemDTO();
        dto.id = item.getId();
        dto.ejercicioId = item.getEjercicio().getId();
        dto.ejercicioNombre = item.getEjercicio().getNombre();
        dto.seriesObjetivo = item.getSeriesObjetivo();
        dto.repeticionesObjetivo = item.getRepeticionesObjetivo();
        dto.orden = item.getOrden();

        return ResponseEntity.created(location).body(dto);
    }

    // Eliminar ejercicio de rutina
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> quitarItem(@PathVariable Long itemId) {
        rutinaService.quitarItem(itemId);
        return ResponseEntity.noContent().build();
    }
}
