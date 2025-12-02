import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EntrenarService } from '../../services/entrenar.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

type Dia = {
  d: number | null;
  iso?: string;
  entreno?: boolean;
  sesionId?: number;
};

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent implements OnInit {
  usuarioId!: number;
  anio!: number;
  mes0!: number;
  semanas: Dia[][] = [];
  diasConFuego = new Set<string>();
  hoyISO = '';

  meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  constructor(
    private srv: EntrenarService,
    private auth: AuthService,
    private router: Router
  ) {}

  // Convierte de Date a ISO
  private toIso(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  ngOnInit() {
    const u = this.auth.getCurrentUser();
    if (!u?.id) {
      this.router.navigate(['/login']);
      return;
    }
    this.usuarioId = u.id;

    const hoy = new Date();
    this.hoyISO = this.toIso(hoy);
    this.anio = hoy.getFullYear();
    this.mes0 = hoy.getMonth();
    this.cargarMes();
  }

  anteriorMes() {
    if (this.mes0 === 0) {
      this.mes0 = 11;
      this.anio--;
    } else {
      this.mes0--;
    }
    this.cargarMes();
  }

  siguienteMes() {
    if (this.mes0 === 11) {
      this.mes0 = 0;
      this.anio++;
    } else {
      this.mes0++;
    }
    this.cargarMes();
  }

  // Creación de la estructura del calendario
  private construirMatrizMes() {
    const primero = new Date(this.anio, this.mes0, 1);
    const ultimo = new Date(this.anio, this.mes0 + 1, 0);
    const offset = (primero.getDay() + 6) % 7;
    const total = ultimo.getDate();

    const celdas: Dia[] = [];
    for (let i = 0; i < offset; i++) celdas.push({ d: null });

    for (let d = 1; d <= total; d++) {
      const iso = this.toIso(new Date(this.anio, this.mes0, d));
      celdas.push({ d, iso, entreno: this.diasConFuego.has(iso) });
    }

    while (celdas.length % 7) celdas.push({ d: null });

    this.semanas = [];
    for (let i = 0; i < celdas.length; i += 7)
      this.semanas.push(celdas.slice(i, i + 7));
  }

  // Carga los días con entreno
  private cargarMes() {
    this.srv
      .diasConEntrenoEnMes(this.usuarioId, this.anio, this.mes0)
      .subscribe((fuego) => {
        this.diasConFuego = fuego;
        this.construirMatrizMes();
      });
  }

  // Muestra detalles del entrenamiento
  abrirDia(dia: Dia) {
    if (!dia.iso || !dia.entreno) return;
    this.srv.getSesionPorFecha(this.usuarioId, dia.iso).subscribe((s) => {
      this.router.navigate(['/sesiones', s.id]);
    });
  }
}
