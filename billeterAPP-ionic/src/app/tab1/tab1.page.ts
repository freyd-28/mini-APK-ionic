// @ts-ignore: permite compilar mientras el entorno resuelve las declaraciones de Angular.
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Cliente } from '../models/clientes';
import { IonHeader,
   IonToolbar,
    IonTitle,
     IonButtons,
      IonButton,
       IonContent,
        IonCard,
         IonCardHeader,
          IonCardTitle,
           IonCardContent,
            IonInput,
             IonText,
              IonList,
               IonListHeader,
                IonItem,
                 IonLabel } from '@ionic/angular';

interface ApiError {
  error?: {
    message?: string;
  };
}

// @ts-ignore: evita el error
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
     FormsModule,
      IonHeader,
       IonToolbar,
        IonTitle,
         IonButtons,
          IonButton,
           IonContent,
            IonCard,
             IonCardHeader,
              IonCardTitle,
               IonCardContent,
                IonInput,
                 IonText,
                  IonList,
                   IonListHeader,
                    IonItem,
                     IonLabel]
})
export class Tab1Page implements OnInit {

  private api = inject(ApiService);
  private auth = inject(AuthService);

  items: Cliente[] = [];
  editingId: number | null = null;
  loading = false;
  error = '';

  form = {
    nombre: '',
    documento: '',
    telefono: '',
    direccion: ''
  };

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;

    this.api.clientes().subscribe({
      next: (x: Cliente[]) => {
        this.items = x;
      },

      error: (e: ApiError) => {
        this.handle(e);
      },

      complete: () => {
        this.loading = false;
      }
    });
  }

  edit(x: Cliente) {
    this.editingId = x.id_cliente;

    this.form = {
      nombre: x.nombre,
      documento: x.documento,
      telefono: x.telefono || '',
      direccion: x.direccion || ''
    };
  }

  nuevo() {
    this.editingId = null;

    this.form = {
      nombre: '',
      documento: '',
      telefono: '',
      direccion: ''
    };
  }

  save() {
    const obs = this.editingId
      ? this.api.actualizarCliente(this.editingId, this.form)
      : this.api.crearCliente(this.form);

    obs.subscribe({
      next: () => {
        this.nuevo();
        this.load();
      },

      error: (e: ApiError) => {
        this.handle(e);
      }
    });
  }

  remove(x: Cliente) {
    if (!confirm(`¿Eliminar a ${x.nombre}?`)) {
      return;
    }

    this.api.eliminarCliente(x.id_cliente).subscribe({
      next: () => {
        this.load();
      },

      error: (e: ApiError) => {
        this.handle(e);
      }
    });
  }

  logout() {
    this.auth.logout();
    location.href = '/login';
  }

  private handle(e: ApiError) {
    this.loading = false;

    this.error =
      e?.error?.message ||
      'Error de conexión con la API';
  }
}
