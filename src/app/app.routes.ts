import { Routes } from '@angular/router';
import { DirectivaForComponent } from './directiva-for/directiva-for.component';
import { FormularioProductoComponent } from './directiva-for/formulario-producto/formulario-producto.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { loginGuard, LoginGuardianService } from './login-guardian.service';

export const routes: Routes = [
  { path: '', component: DirectivaForComponent, canActivate: [loginGuard] },
  {
    path: 'listado',
    component: DirectivaForComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'agregar',
    component: FormularioProductoComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'editar/:llave',
    component: FormularioProductoComponent,
    canActivate: [loginGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: ErrorComponent },
];
