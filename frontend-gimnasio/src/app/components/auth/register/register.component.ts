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
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form: Usuario = { usuario: '', email: '', password: '' };
  password2: string = '';

  loading = false;
  error: string = '';

  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$'; // Contraseña: 6 caracteres, 1 mayúscula, 1 minúscula, y 1 número
  emailPattern = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'; // Email

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.error = '';

    // Validar patrón de email
    const emailRegex = new RegExp(this.emailPattern);
    if (!emailRegex.test(this.form.email)) {
      this.error =
        'Introduce un email válido (por ejemplo usuario@dominio.com)';
      return;
    }

    // Validar contraseñas iguales
    if (this.form.password !== this.password2) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    // Validar patrón de contraseña
    const regex = new RegExp(this.passwordPattern);
    if (!regex.test(this.form.password)) {
      this.error =
        'La contraseña debe tener mayúscula, minúscula, número y mínimo 6 caracteres';
      return;
    }

    this.loading = true;

    this.authService.register(this.form).subscribe({
      next: (_) => this.router.navigate(['/entrenar']),
      error: (err) => {
        this.error = err?.error?.error ?? 'Error al registrar usuario';
        this.loading = false;
      },
    });
  }
}
