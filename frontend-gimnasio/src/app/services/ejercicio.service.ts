import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Ejercicio {
  id?: number
  nombre: string
  grupoMuscular: string
  descripcion: string
}

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  private apiUrl = 'http://localhost:8080/ejercicios'

  constructor(private http: HttpClient) {}


  // Listar todos los ejercicios
  listarEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(this.apiUrl)
  }

  // Buscar por nombre
  buscar(q: string): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(`${this.apiUrl}/search`, { params: { q } })
  }

  // Listar todos los grupos musculares únicos
  listarGrupos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/grupos`)
  }

  // Listar ejercicios filtrando por grupo muscular
  listarPorGrupo(g: string): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(`${this.apiUrl}/grupo/${encodeURIComponent(g)}`)
  }

}
