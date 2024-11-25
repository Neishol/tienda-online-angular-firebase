import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DirectivaForComponent } from './directiva-for/directiva-for.component';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DirectivaForComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'Tienda Online';

  constructor(private loginService: LoginService) {}

  isAutenticado(): boolean | null {
    return this.loginService.isAutenticado();
  }

  salir() {
    this.loginService.logout();
  }
}
