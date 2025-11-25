import { Injectable } from '@angular/core';
import { Ejercicio } from './ejercicio.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Rutina {
  id: number
  nombre: string
  fechaCreacion: string
  usuarioId: number
}

export interface RutinaItemDTO {
  id: number
  ejercicioId: number
  ejercicioNombre?: string
  orden: number
  seriesObjetivo: number
  repeticionesObjetivo: number
}

@Injectable({ providedIn: 'root' })
export class RutinaService {

  private apiUrl = 'http://localhost:8080/rutinas'

  constructor(private http: HttpClient) {}

  // RUTINAS
  listarPorUsuario(usuarioId: number): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(`${this.apiUrl}`, { params: { usuarioId } as any }).pipe(catchError(this.handle))
  }

  crearRutina(nombre: string, usuarioId: number): Observable<Rutina> {
    return this.http.post<Rutina>(this.apiUrl, { nombre, usuarioId }).pipe(catchError(this.handle))
  }

  borrarRutina(rutinaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${rutinaId}`).pipe(catchError(this.handle))
  }

  // ITEMS
  listarItems(rutinaId: number): Observable<RutinaItemDTO[]> {
    return this.http.get<RutinaItemDTO[]>(`${this.apiUrl}/${rutinaId}/items`).pipe(catchError(this.handle))
  }

  addItem(
    rutinaId: number,
    ejercicioId: number,
    seriesObjetivo: number,
    repeticionesObjetivo: number
  ): Observable<RutinaItemDTO> {
    return this.http.post<RutinaItemDTO>(`${this.apiUrl}/${rutinaId}/items`, {ejercicioId, seriesObjetivo, repeticionesObjetivo}).pipe(catchError(this.handle))
  }

  quitarItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/items/${itemId}`).pipe(catchError(this.handle))
  }

  private handle = (err: any) => {
    const msg = err?.error?.error ?? Object.values(err?.error?.errors ?? {})?.[0] ?? 'Error inesperado'

    return throwError(() => new Error(msg));
  }
}
