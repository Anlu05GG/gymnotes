import { Component } from '@angular/core';
import { AuthService, Usuario } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form: Usuario = { usuario: '', email: '', password: '' }
  loading = false
  error: string = ''

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.error = ''
    this.loading = true

    this.authService.register(this.form).subscribe({
      next: _ => this.router.navigate(['/entrenar']),
      error: err => {
        this.error = err?.error?.error ?? 'Error al registrar usuario'
        this.loading = false
      }
    })
  }

}
