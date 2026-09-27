import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonText,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular';

import { ApiService } from '../services/api.service';
import { Categoria } from '../models/clientes';

interface ApiError {
  error?: { message?: string };
}

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonButton,
    IonText,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class Tab2Page implements OnInit {
  private api = inject(ApiService);

  items: Categoria[] = [];
  editingId: number | null = null;
  nombre = '';
  error = '';
  loading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';

    this.api.categorias().subscribe({
      next: (x: Categoria[]) => {
        this.items = x;
      },
      error: (e: ApiError) => {
        this.handle(e);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  edit(x: Categoria): void {
    this.editingId = x.id_categoria;
    this.nombre = x.nombre;
  }

  nuevo(): void {
    this.editingId = null;
    this.nombre = '';
  }

  save(): void {
    const nombre = this.nombre.trim();
    if (!nombre) return;

    const obs = this.editingId
      ? this.api.actualizarCategoria(this.editingId, { nombre })
      : this.api.crearCategoria({ nombre });

    obs.subscribe({
      next: () => {
        this.nuevo();
        this.load();
      },
      error: (e: ApiError) => this.handle(e),
    });
  }

  remove(x: Categoria): void {
    if (!confirm(`¿Eliminar ${x.nombre}?`)) return;

    this.api.eliminarCategoria(x.id_categoria).subscribe({
      next: () => this.load(),
      error: (e: ApiError) => this.handle(e),
    });
  }

  private handle(e: ApiError): void {
    this.loading = false;
    this.error = e?.error?.message || 'Error de conexión con la API';
  }
}
