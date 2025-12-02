import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface Usuario {
  id?: number;
  usuario: string;
  email: string;
  password?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private key = 'usuarioActual';

  constructor(private http: HttpClient) {}

  // Registrar usuario nuevo y guarda sesión
  register(user: Usuario): Observable<Usuario> {
    let aux = { ...user, email: user.email.trim().toLowerCase() };
    return this.http
      .post<Usuario>(`${this.apiUrl}/register`, aux)
      .pipe(tap((u) => this.saveSession(u)));
  }

  // Guarda el usuario en localStorage
  saveSession(u: Usuario) {
    let aux = { ...u, password: null };
    localStorage.setItem(this.key, JSON.stringify(aux));
  }

  // Login y guardar sesión
  login(log: LoginRequest): Observable<Usuario> {
    let aux = { email: log.email.trim().toLowerCase(), password: log.password };
    return this.http
      .post<Usuario>(`${this.apiUrl}/login`, aux)
      .pipe(tap((u) => this.saveSession(u)));
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem(this.key);
  }

  // Devuelve el usuario actual
  getCurrentUser(): Usuario | null {
    let currentUser = localStorage.getItem(this.key);
    return currentUser ? (JSON.parse(currentUser) as Usuario) : null;
  }

  // Indica si ha iniciado sesión
  isLogged(): boolean {
    return !!this.getCurrentUser();
  }
}
