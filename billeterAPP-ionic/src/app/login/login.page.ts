import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonContent, IonItem, IonInput, IonText, IonButton } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonItem, IonInput, IonText, IonButton]
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);
  
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/tabs/clientes', { replaceUrl: true });
    }
  }

  login(): void {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Ingresa correo y contraseña.';
      return;
    }
    this.loading = true;
    this.auth.login(this.email.trim(), this.password).subscribe({
      next: () => this.router.navigateByUrl('/tabs/clientes', { replaceUrl: true }),
      error: (err: { error?: { message?: string } }) => {
        this.error = err?.error?.message || 'No fue posible iniciar sesion.';
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
