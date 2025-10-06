import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Ejercicio {
  id?: number;
  nombre: string;
  grupoMuscular: string;
  descripcion: string
}

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  private apiUrl = 'http://localhost:8080/ejercicios'

  constructor(private http: HttpClient) {}

  // READ
  listarEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(this.apiUrl)
  }

  // CREATE
  crearEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.http.post<Ejercicio>(this.apiUrl, ejercicio)
  }

  // UPTADE
  actualizarEjercicio(id: number, ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.http.put<Ejercicio>(`${this.apiUrl}/${id}`, ejercicio)
  }

  // DELETE
  eliminarEjercicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

}
