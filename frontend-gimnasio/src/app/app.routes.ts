import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './guards/auth.guard';
import { MisRutinasComponent } from './components/rutinas/mis-rutinas/mis-rutinas.component';
import { RutinaItemsComponent } from './components/rutinas/rutina-items/rutina-items.component';
import { EntrenarComponent } from './components/entrenar/entrenar.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { SesionDetalleComponent } from './components/sesion-detalle/sesion-detalle.component';
import { guestGuard } from './guards/guestGuard';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },

    { path: 'mis-rutinas', component: MisRutinasComponent, canActivate: [authGuard] },
    { path: 'rutinas/:id', component: RutinaItemsComponent, canActivate: [authGuard] },
    { path: 'entrenar', component: EntrenarComponent, canActivate: [authGuard] },
    { path: 'calendario', component: CalendarioComponent, canActivate: [authGuard] },
    { path: 'sesiones/:id', component: SesionDetalleComponent, canActivate: [authGuard] }
]
