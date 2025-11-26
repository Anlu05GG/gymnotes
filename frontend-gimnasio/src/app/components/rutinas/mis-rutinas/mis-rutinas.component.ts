import { Component, OnInit } from '@angular/core';
import { Rutina, RutinaService } from '../../../services/rutina.service';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-rutinas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mis-rutinas.component.html',
  styleUrl: './mis-rutinas.component.css'
})
export class MisRutinasComponent implements OnInit {

  usuarioId!: number
  rutinas: Rutina[] = []
  nombreNueva = ''
  cargando = false
  error = ''

  constructor(private rutinaService: RutinaService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    let u = this.authService.getCurrentUser()
    if(!u) { this.router.navigate(['/login']); return }
    this.usuarioId = u.id!
    this.cargar()
  }

  cargar() {
    this.cargando = true
    this.rutinaService.listarPorUsuario(this.usuarioId).subscribe({
      next: rs => { this.rutinas = rs; this.cargando = false },
      error: e => { this.error = e.message || 'No se pudieron cargar las rutinas'; this.cargando = false }
    })
  }

  crear() {
    if (!this.nombreNueva.trim()) return;
    this.rutinaService.crearRutina(this.nombreNueva.trim(), this.usuarioId).subscribe({
      next: _ => { this.nombreNueva = ''; this.cargar() },
      error: e => { this.error = e.message || 'No se pudo crear la rutina' }
    })
  }

  borrar(r: Rutina) {
    if (!confirm(`¿Borrar rutina "${ r.nombre }"?`)) return;
    this.rutinaService.borrarRutina(r.id).subscribe({
      next: _ => this.cargar(),
      error: e => this.error = e.message || 'No se pudo borrar la rutina'
    })
  }

  ver(r: Rutina) {
    this.router.navigate(['/rutinas', r.id], {state: {rutinaNombre: r.nombre}})
  }

}
