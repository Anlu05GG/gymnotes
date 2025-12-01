import { Component, OnInit } from '@angular/core';
import { Ejercicio, EjercicioService } from '../../services/ejercicio.service';
import { EntrenarService, Serie } from '../../services/entrenar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule  } from '@angular/material/autocomplete';

type Grupo = { ejercicioId: number; nombre?: string; series: Serie[] };

@Component({
  selector: 'app-entrenar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
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

  // Normalizamos texto
  private norm(s: string = ''): string {
    return s.toLowerCase()
      .replace(/ñ/g, '__enie__')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/__enie__/g, 'ñ')
  }

  // Filtra la lista por texto y grupo muscular
  filtrar() {
    const qn = this.norm(this.q.trim())
    const g  = this.grupoSel
    this.opciones = this.todos.filter(e => {
      const coincideTexto = !qn || this.norm(e.nombre).includes(qn)
      const coincideGrupo = !g  || e.grupoMuscular === g
      return coincideTexto && coincideGrupo
    })
  }

  // Limpia filtros de texto y grupo muscular
  limpiarFiltros() { this.q=''; this.grupoSel=''; this.filtrar() }

  // Agrupa series por ejercicio
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

  // Carga las series de la sesión actual
  private cargarSeries() {
    this.entrenarService.listarSeries(this.sesionId).subscribe(s => {
      this.series = s
      this.gruposSeries = this.agruparSeriesPorEjercicio(this.series, this.todos)
    })
  }

  // Añade nueva serie al ejercicio elegido
  add() {
    if (!this.ejercicioId) return
    this.entrenarService.agregarSerie(this.sesionId, this.ejercicioId, this.reps, this.peso).subscribe(_ => {
      this.cargarSeries()
    })
  }

  // Selecciona un ejercicio en el autocomplete
  seleccionar(nombre: string) {
    const encontrado = this.opciones.find(e => e.nombre == nombre)
    
    if (encontrado && encontrado.id != null) {
      this.ejercicioId = encontrado.id
    } else {
      this.ejercicioId = null
    }

  }

}
