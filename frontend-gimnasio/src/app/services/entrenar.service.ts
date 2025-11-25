import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

export interface Sesion {
  id: number
  usuarioId: number
  fecha: string
}

export interface Serie {
  id: number
  sesionId: number
  ejercicioId: number
  repeticiones: number
  peso: number
}

@Injectable({ providedIn: 'root' })
export class EntrenarService {
  private apiUrl = 'http://localhost:8080/sesiones'

  constructor(private http: HttpClient) {}

  private isoLocal(d: Date) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  // SESIONES
  crearSesion(usuarioId: number): Observable<Sesion> {
    return this.http.post<Sesion>(`${this.apiUrl}?usuarioId=${usuarioId}`, {})
  }

  listarSesiones(usuarioId: number): Observable<Sesion[]> {
    return this.http.get<Sesion[]>(`${this.apiUrl}?usuarioId=${usuarioId}`)
  }

  sesionesEnRango(usuarioId: number, desde: string, hasta: string): Observable<Sesion[]> {
    const params = { usuarioId, desde, hasta } as any
    return this.http.get<Sesion[]>(`${this.apiUrl}/rango`, { params })
  }

  getSesionDeHoy(usuarioId: number) {
    return this.crearSesion(usuarioId)
  }

  getSesionPorFecha(usuarioId: number, fechaISO: string) {
    return this.http.get<Sesion>(`${this.apiUrl}/por-fecha`, {
      params: { usuarioId, fecha: fechaISO } as any
    })
  }

  diasConEntrenoEnMes(usuarioId: number, year: number, month0: number) {
    const desde = this.isoLocal(new Date(year, month0, 1))
    const hasta = this.isoLocal(new Date(year, month0 + 1, 0))

    return this.sesionesEnRango(usuarioId, desde, hasta).pipe(
      switchMap(sesiones => {
        if (!sesiones.length) return of(new Set<string>())
        return forkJoin(
          sesiones.map(s =>
            this.listarSeries(s.id).pipe(
              map(series => ({ fecha: s.fecha, tieneSeries: series.length > 0 }))
            )
          )
        ).pipe(
          map(results => {
            const fire = new Set<string>()
            for (const r of results) if (r.tieneSeries) fire.add(r.fecha)
            return fire
          })
        )
      })
    )
  }

  // SERIES
  agregarSerie(sesionId: number, ejercicioId: number, repeticiones: number, peso: number): Observable<Serie> {
    return this.http.post<Serie>(`${this.apiUrl}/${sesionId}/series`, { ejercicioId, repeticiones, peso })
  }

  listarSeries(sesionId: number): Observable<Serie[]> {
    return this.http.get<Serie[]>(`${this.apiUrl}/${sesionId}/series`)
  }
}