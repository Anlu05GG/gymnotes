import { Component, OnInit } from '@angular/core';
import { Rutina, RutinaService } from '../../../services/rutina.service';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-mis-rutinas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatDialogModule],
  templateUrl: './mis-rutinas.component.html',
  styleUrl: './mis-rutinas.component.css'
})
export class MisRutinasComponent implements OnInit {

  usuarioId!: number
  rutinas: Rutina[] = []
  nombreNueva = ''
  cargando = false
  error = ''

  constructor(private rutinaService: RutinaService, private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    let u = this.authService.getCurrentUser()
    if(!u) { this.router.navigate(['/login']); return }
    this.usuarioId = u.id!
    this.cargar()
  }

  // Carga rutinas del usuario
  private cargar() {
    this.cargando = true
    this.rutinaService.listarPorUsuario(this.usuarioId).subscribe({
      next: rs => { this.rutinas = rs; this.cargando = false },
      error: e => { this.error = e.message || 'No se pudieron cargar las rutinas'; this.cargando = false }
    })
  }

  // Crear nueva rutina
  crear() {
    if (!this.nombreNueva.trim()) return
    this.rutinaService.crearRutina(this.nombreNueva.trim(), this.usuarioId).subscribe({
      next: _ => { this.nombreNueva = ''; this.cargar() },
      error: e => { this.error = e.message || 'No se pudo crear la rutina' }
    })
  }

  // Borrar una rutina
  borrar(r: Rutina) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Borrar rutina',
        message: `¿Borrar rutina "${r.nombre}"?`
      }
    })

    dialogRef.afterClosed().subscribe(confirmado => {
      if (!confirmado) {
        return
      }

      this.rutinaService.borrarRutina(r.id).subscribe({
        next: _ => this.cargar(),
        error: e => this.error = e.message || 'No se pudo borrar la rutina'
      })
    })
  }

  // Navega a la pantalla detallada de la rutina
  ver(r: Rutina) {
    this.router.navigate(['/rutinas', r.id], {state: {rutinaNombre: r.nombre}})
  }

}
