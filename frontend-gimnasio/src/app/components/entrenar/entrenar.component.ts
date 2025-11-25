import { Component, OnInit } from '@angular/core';
import { Ejercicio, EjercicioService } from '../../services/ejercicio.service';
import { EntrenarService, Serie } from '../../services/entrenar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

type Grupo = { ejercicioId: number; nombre?: string; series: Serie[] };

@Component({
  selector: 'app-entrenar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrenar.component.html',
  styleUrl: './entrenar.component.css'
})
export class EntrenarComponent implements OnInit {

  usuarioId!: number
  sesionId!: number

  private todos: Ejercicio[] = []
  opciones: Ejercicio[] = []
  grupos: string[] = []
  q = ''
  grupoSel = ''

  ejercicioId: number | null = null
  reps = 10
  peso = 0
  series: Serie[] = []
  gruposSeries: Grupo[] = []

  constructor(private ejercicioService: EjercicioService, private entrenarService: EntrenarService, private auth: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    const u = this.auth.getCurrentUser()
    if (!u?.id) { this.router.navigate(['/login']); return}
    this.usuarioId = u.id

    this.ejercicioService.listarEjercicios().subscribe(r => {
      this.todos = r
      this.filtrar()
    })

    this.ejercicioService.listarGrupos().subscribe(gs => this.grupos = gs)

    this.entrenarService.crearSesion(this.usuarioId).subscribe(s => {
      this.sesionId = s.id
      this.cargarSeries()
    })
  }

  private norm(s: string = ''): string {
    return s.toLowerCase()
      .replace(/ñ/g, '__enie__')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/__enie__/g, 'ñ')
  }

  filtrar() {
    const qn = this.norm(this.q.trim())
    const g  = this.grupoSel
    this.opciones = this.todos.filter(e => {
      const coincideTexto = !qn || this.norm(e.nombre).includes(qn)
      const coincideGrupo = !g  || e.grupoMuscular === g
      return coincideTexto && coincideGrupo
    })
  }

  limpiarFiltros() { this.q=''; this.grupoSel=''; this.filtrar() }

  private agruparSeriesPorEjercicio(series: Serie[], ejercicios: Ejercicio[]): Grupo[] {
    const mapa = new Map<number, Serie[]>()
    for (const s of series) {
      if (!mapa.has(s.ejercicioId)) mapa.set(s.ejercicioId, [])
      mapa.get(s.ejercicioId)!.push(s)
    }
    return Array.from(mapa.entries()).map(([ejercicioId, ser]) => ({
      ejercicioId,
      nombre: ejercicios.find(e => e.id === ejercicioId)?.nombre,
      series: ser
    }))
  }

  cargarSeries() {
    this.entrenarService.listarSeries(this.sesionId).subscribe(s => {
      this.series = s
      this.gruposSeries = this.agruparSeriesPorEjercicio(this.series, this.todos)
    })
  }

  add() {
    if (!this.ejercicioId) return
    this.entrenarService.agregarSerie(this.sesionId, this.ejercicioId, this.reps, this.peso).subscribe(_ => {
      this.cargarSeries()
    })
  }

}
