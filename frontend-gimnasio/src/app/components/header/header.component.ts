import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  nombre: string | null = null

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.nombre = this.authService.getCurrentUser()?.usuario ?? null
  }

  salir() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
