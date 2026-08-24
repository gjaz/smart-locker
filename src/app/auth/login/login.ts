import { Component, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  mensaje = signal('');

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),

    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
  private authService: AuthService,
  private router: Router
) {}

  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const request = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.authService.login(request).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);        
        this.mensaje.set('Login correcto');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
  console.error('Error de login:', error);

  if (error.status === 401) 
    {
      this.mensaje.set('Usuario o contraseña incorrectos');
      } else if (error.status === 400) {
        this.mensaje.set('Datos de login inválidos');
      } else {
        this.mensaje.set('Error al iniciar sesión');
      }
    }
    });
  }
}