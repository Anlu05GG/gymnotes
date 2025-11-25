package com.andrei.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.andrei.backend.model.Ejercicio;
import com.andrei.backend.model.Rutina;
import com.andrei.backend.model.RutinaEjercicio;
import com.andrei.backend.repository.EjercicioRepository;
import com.andrei.backend.repository.RutinaEjercicioRepository;
import com.andrei.backend.repository.RutinaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RutinaService {

    private final RutinaRepository rutinaRepo;
    private final RutinaEjercicioRepository reRepo;
    private final EjercicioRepository ejercicioRepo;

    public RutinaService(RutinaRepository rutinaRepo,
                         RutinaEjercicioRepository reRepo,
                         EjercicioRepository ejercicioRepo) {
        this.rutinaRepo = rutinaRepo;
        this.reRepo = reRepo;
        this.ejercicioRepo = ejercicioRepo;
    }

    // RUTINAS

    public List<Rutina> listarPorUsuario(Long usuarioId) {
        return rutinaRepo.findByUsuarioIdOrderByNombreAsc(usuarioId);
    }

    public Rutina crearRutina(Rutina r) {
        String nombre = r.getNombre() != null ? r.getNombre().trim() : "";
        if (nombre.isBlank()) {
            throw new IllegalArgumentException("El nombre de la rutina es obligatorio");
        }
        r.setNombre(nombre);
        return rutinaRepo.save(r);
    }

    @Transactional
    public void borrarRutina(Long rutinaId) {
        reRepo.deleteByRutinaId(rutinaId);
        rutinaRepo.deleteById(rutinaId);
    }

    // ITEMS

    public List<RutinaEjercicio> listarItems(Long rutinaId) {
        return reRepo.findByRutinaIdOrderByOrdenAsc(rutinaId);
    }

    public RutinaEjercicio addItem(Long rutinaId, Long ejercicioId, Integer series, Integer reps) {
        if (series == null || series < 1) throw new IllegalArgumentException("Las series deben ser >= 1");
        if (reps == null || reps < 1) throw new IllegalArgumentException("Las repeticiones deben ser >= 1");

        Rutina r = rutinaRepo.findById(rutinaId)
                .orElseThrow(() -> new EntityNotFoundException("Rutina no encontrada"));
        Ejercicio e = ejercicioRepo.findById(ejercicioId)
                .orElseThrow(() -> new EntityNotFoundException("Ejercicio no encontrado"));

        Integer siguienteOrden = reRepo.findTopByRutinaIdOrderByOrdenDesc(rutinaId)
                .map(RutinaEjercicio::getOrden)
                .map(o -> o + 1)
                .orElse(1);

        RutinaEjercicio item = new RutinaEjercicio();
        item.setRutina(r);
        item.setEjercicio(e);
        item.setOrden(siguienteOrden);
        item.setSeriesObjetivo(series);
        item.setRepeticionesObjetivo(reps);

        return reRepo.save(item);
    }

    @Transactional
    public void quitarItem(Long itemId) {
        RutinaEjercicio eliminado = reRepo.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Item no encontrado"));
        Long rutinaId = eliminado.getRutina().getId();
        Integer ordenEliminado = eliminado.getOrden();

        reRepo.deleteById(itemId);

        List<RutinaEjercicio> posteriores =
                reRepo.findByRutinaIdAndOrdenGreaterThanOrderByOrdenAsc(rutinaId, ordenEliminado);

        for (RutinaEjercicio it : posteriores) {
            it.setOrden(it.getOrden() - 1);
        }
        reRepo.saveAll(posteriores);
    }
}
