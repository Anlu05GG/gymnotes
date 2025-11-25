import { Component } from '@angular/core';
import { AuthService, LoginRequest } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: LoginRequest = { email: '', password: '' }
  loading = false
  error : string = ''

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.error = ''
    this.loading = true

    this.authService.login(this.form).subscribe({
      next: _ => this.router.navigate(['/entrenar']),
      error: err => {
        this.error = err?.error?.error ?? 'Error al iniciar sesión'
        this.loading = false
      }
    })
  }

}
