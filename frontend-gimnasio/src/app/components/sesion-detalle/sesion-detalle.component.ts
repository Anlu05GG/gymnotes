import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ejercicio, EjercicioService } from '../../services/ejercicio.service';
import { Serie, EntrenarService } from '../../services/entrenar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sesion-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sesion-detalle.component.html',
  styleUrl: './sesion-detalle.component.css'
})
export class SesionDetalleComponent implements OnInit{
  usuarioId!: number
  sesionId!: number
  fecha!: string
  series: Serie[] = []
  ejercicios: Ejercicio[] = []
  grupos: { ejercicioId:number; nombre?:string; series:Serie[] }[] = []
  volumenTotal: number = 0

  constructor(private route: ActivatedRoute, private srv: EntrenarService, private ejSrv: EjercicioService, private router: Router, private auth: AuthService){}

  ngOnInit() {
    const u = this.auth.getCurrentUser()
    if (!u?.id) { this.router.navigate(['/login']); return}
    this.usuarioId = u.id

    this.sesionId = Number(this.route.snapshot.paramMap.get('id'))
    if (!this.sesionId) { this.router.navigate(['/entrenar']); return }

    this.srv.listarSesiones(this.usuarioId).subscribe(sesiones => {
      const s = sesiones.find(x => x.id === this.sesionId)
      this.fecha = s?.fecha || ''

      this.ejSrv.listarEjercicios().subscribe(es => {
        this.ejercicios = es
        this.srv.listarSeries(this.sesionId).subscribe(ss => {
          this.series = ss
          let total = 0
          for(const s of ss){
            const peso = s.peso || 0
            const reps = s.repeticiones || 0
            total += peso * reps
          }
          this.volumenTotal = total;
          const map = new Map<number, Serie[]>()
          for(const s of ss){
            if(!map.has(s.ejercicioId)) map.set(s.ejercicioId, []); map.get(s.ejercicioId)!.push(s)
          }
          this.grupos = Array.from(map.entries()).map(([id, ser]) => ({
            ejercicioId: id,
            nombre: es.find(e => e.id === id)?.nombre,
            series: ser
          }))
        })
      })
    })
  }
}
