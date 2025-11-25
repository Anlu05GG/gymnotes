import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinaItemDTO, RutinaService } from '../../../services/rutina.service';
import { Ejercicio, EjercicioService } from '../../../services/ejercicio.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rutina-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rutina-items.component.html',
  styleUrl: './rutina-items.component.css'
})
export class RutinaItemsComponent implements OnInit {

  rutinaId!: number
  items: RutinaItemDTO[] = []
  
  private todos: Ejercicio[] = []
  opciones: Ejercicio[] = []
  grupos: string[] = []
  q = ''
  grupoSel = ''
  ejercicioId: number | null = null

  series = 3
  reps = 10

  error = ''

  constructor(private route: ActivatedRoute, private router: Router, private rutinaService: RutinaService, private ejercicioService: EjercicioService) {}
  

  ngOnInit(): void {
    this.rutinaId = Number(this.route.snapshot.paramMap.get('id'))
    if (!this.rutinaId) { this.router.navigate(['/mis-rutinas']); return }
    this.cargar()

    this.ejercicioService.listarEjercicios().subscribe(e => {
      this.todos = e
      this.filtrar()
    })
    this.ejercicioService.listarGrupos().subscribe(gs => this.grupos = gs)
  }

  private norm(s: string = ''): string {
    return s
      .toLowerCase()
      .replace(/ñ/g, '__enie__')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/__enie__/g, 'ñ')
  }

  filtrar() {
    let qn = this.norm(this.q.trim())
    let g  = this.grupoSel
    this.opciones = this.todos.filter(e => {
      const coincideTexto = !qn || this.norm(e.nombre).includes(qn)
      const coincideGrupo = !g  || e.grupoMuscular === g
      return coincideTexto && coincideGrupo
    })
  }

  limpiarFiltros() {
    this.q = ''; this.grupoSel = ''; this.filtrar()
  }

  cargar() {
    this.rutinaService.listarItems(this.rutinaId).subscribe({
      next: its => this.items = its.sort((a,b) => a.orden - b.orden),
      error: _ => this.error = 'No se pudieron cargar los ejercicios de la rutina'
    })
  }

  add() {
    if (!this.ejercicioId || this.series < 1 || this.reps < 1) return
    this.rutinaService.addItem(this.rutinaId, this.ejercicioId, this.series, this.reps).subscribe({
      next: dto => {
        this.items = [...this.items, dto].sort((a,b) => a.orden - b.orden)
        this.ejercicioId = null; this.series = 3; this.reps = 10
      },
      error: e => this.error = e.message || 'No se pudo añadir el ejercicio'
    })
  }

  quitar(item: RutinaItemDTO) {
    let nombre = item.ejercicioNombre
      ?? this.todos.find(e => e.id === item.ejercicioId)?.nombre
      ?? ('Ejercicio ' + item.ejercicioId)

    if (!confirm(`¿Quitar ${nombre}?`)) return

    this.rutinaService.quitarItem(item.id).subscribe({
      next: _ => this.cargar(),
      error: e => this.error = e.message || 'No se pudo borrar el ejercicio'
    })
  }

  volver() {
    this.router.navigate(['/mis-rutinas'])
  }

}
