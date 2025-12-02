import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinaItemDTO, RutinaService } from '../../../services/rutina.service';
import {
  Ejercicio,
  EjercicioService,
} from '../../../services/ejercicio.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-rutina-items',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule,
  ],
  templateUrl: './rutina-items.component.html',
  styleUrl: './rutina-items.component.css',
})
export class RutinaItemsComponent implements OnInit {
  rutinaId!: number;
  items: RutinaItemDTO[] = [];
  rutinaNombre?: string;

  todos: Ejercicio[] = [];
  opciones: Ejercicio[] = [];
  grupos: string[] = [];
  q = '';
  grupoSel = '';
  ejercicioId: number | null = null;

  series = 3;
  reps = 10;

  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rutinaService: RutinaService,
    private ejercicioService: EjercicioService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = (nav?.extras?.state || history.state) as {
      rutinaNombre?: string;
    };
    this.rutinaNombre = state?.rutinaNombre;

    this.rutinaId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.rutinaId) {
      this.router.navigate(['/mis-rutinas']);
      return;
    }
    this.cargar();

    this.ejercicioService.listarEjercicios().subscribe((e) => {
      this.todos = e;
      this.filtrar();
    });
    this.ejercicioService.listarGrupos().subscribe((gs) => (this.grupos = gs));
  }

  // Normalizamos texto
  private norm(s: string = ''): string {
    return s
      .toLowerCase()
      .replace(/ñ/g, '__enie__')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/__enie__/g, 'ñ');
  }

  // Filtra la lista por texto y grupo muscular
  filtrar() {
    let qn = this.norm(this.q.trim());
    let g = this.grupoSel;
    this.opciones = this.todos.filter((e) => {
      const coincideTexto = !qn || this.norm(e.nombre).includes(qn);
      const coincideGrupo = !g || e.grupoMuscular === g;
      return coincideTexto && coincideGrupo;
    });
  }

  // Limpia filtros de texto y grupo muscular
  limpiarFiltros() {
    this.q = '';
    this.grupoSel = '';
    this.filtrar();
  }

  // Cargar los ejercicios de la rutina
  private cargar() {
    this.rutinaService.listarItems(this.rutinaId).subscribe({
      next: (its) => (this.items = its.sort((a, b) => a.orden - b.orden)),
      error: (_) =>
        (this.error = 'No se pudieron cargar los ejercicios de la rutina'),
    });
  }

  // Añadir nuevo ejercicio a la rutina
  add() {
    if (!this.ejercicioId || this.series < 1 || this.reps < 1) return;
    this.rutinaService
      .addItem(this.rutinaId, this.ejercicioId, this.series, this.reps)
      .subscribe({
        next: (dto) => {
          this.items = [...this.items, dto].sort((a, b) => a.orden - b.orden);
          this.ejercicioId = null;
          this.series = 3;
          this.reps = 10;
        },
        error: (e) =>
          (this.error = e.message || 'No se pudo añadir el ejercicio'),
      });
  }

  // Eliminar ejercicio de la rutina
  quitar(item: RutinaItemDTO) {
    let nombre =
      item.ejercicioNombre ??
      this.todos.find((e) => e.id === item.ejercicioId)?.nombre ??
      'Ejercicio ' + item.ejercicioId;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Borrar serie',
        message: `¿Borrar serie "${nombre}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) {
        return;
      }

      this.rutinaService.quitarItem(item.id).subscribe({
        next: (_) => this.cargar(),
        error: (e) => (this.error = e.message || 'No se pudo borrar la serie'),
      });
    });
  }

  // Volver a pantalla de rutinas
  volver() {
    this.router.navigate(['/mis-rutinas']);
  }

  // Selecciona un ejercicio en el autocomplete
  seleccionar(nombre: string) {
    const encontrado = this.opciones.find((e) => e.nombre == nombre);

    if (encontrado && encontrado.id != null) {
      this.ejercicioId = encontrado.id;
    } else {
      this.ejercicioId = null;
    }
  }
}
