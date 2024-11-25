import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  token: string | null = null;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  login(email: string, password: string): void {
    const auth = this.firebaseService.auth;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        auth.currentUser?.getIdToken().then((token) => {
          this.token = token;
          this.router.navigate(['/']);
        });
      })
      .catch((error) => {
        console.error('Error al iniciar sesión: ', error);
      });
  }

  getIdToken(): string | null {
    return this.token;
  }

  isAutenticado(): boolean | null {
    return this.token != null;
  }

  logout() {
    const auth = this.firebaseService.auth;
    auth
      .signOut()
      .then(() => {
        this.token = null;
        this.router.navigate(['login']);
      })
      .catch((error) => console.error('error de logout', error));
  }
}
