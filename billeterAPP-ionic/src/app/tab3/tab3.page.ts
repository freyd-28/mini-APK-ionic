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
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonButton,
  IonText,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular';

import { ApiService } from '../services/api.service';
import { Categoria, Producto } from '../models/clientes';

interface ApiError {
  error?: { message?: string };
}

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
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
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonButton,
    IonText,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class Tab3Page implements OnInit {
  private api = inject(ApiService);

  items: Producto[] = [];
  cats: Categoria[] = [];
  editingId: number | null = null;
  error = '';
  loading = false;

  form = {
    nombre: '',
    precio_venta: 0,
    id_categoria: 0,
    activo: true,
  };

  ngOnInit(): void {
    this.load();
    this.loadCategorias();
  }

  load(): void {
    this.loading = true;
    this.api.productos().subscribe({
      next: (x: Producto[]) => {
        this.items = x;
      },
      error: (e: ApiError) => this.handle(e),
      complete: () => {
        this.loading = false;
      },
    });
  }

  private loadCategorias(): void {
    this.api.categorias().subscribe({
      next: (x: Categoria[]) => {
        this.cats = x;
        if (!this.form.id_categoria && this.cats.length > 0) {
          this.form.id_categoria = this.cats[0].id_categoria;
        }
      },
      error: (e: ApiError) => this.handle(e),
    });
  }

  edit(x: Producto): void {
    this.editingId = x.id_producto;
    this.form = {
      nombre: x.nombre,
      precio_venta: Number(x.precio_venta),
      id_categoria: x.id_categoria,
      activo: Number(x.activo) === 1,
    };
  }

  nuevo(): void {
    this.editingId = null;
    this.form = {
      nombre: '',
      precio_venta: 0,
      id_categoria: this.cats[0]?.id_categoria || 0,
      activo: true,
    };
  }

  save(): void {
    const nombre = this.form.nombre.trim();
    const precio = Number(this.form.precio_venta);

    if (!nombre || precio <= 0 || !this.form.id_categoria) return;

    const payload = {
      ...this.form,
      nombre,
      precio_venta: precio,
      activo: this.form.activo ? 1 : 0,
    };

    const obs = this.editingId
      ? this.api.actualizarProducto(this.editingId, payload)
      : this.api.crearProducto(payload);

    obs.subscribe({
      next: () => {
        this.nuevo();
        this.load();
      },
      error: (e: ApiError) => this.handle(e),
    });
  }

  remove(x: Producto): void {
    if (!confirm(`¿Eliminar ${x.nombre}?`)) return;

    this.api.eliminarProducto(x.id_producto).subscribe({
      next: () => this.load(),
      error: (e: ApiError) => this.handle(e),
    });
  }

  catName(id: number): string {
    return this.cats.find((c) => c.id_categoria === id)?.nombre || `Categoría #${id}`;
  }

  private handle(e: ApiError): void {
    this.loading = false;
    this.error = e?.error?.message || 'Error de conexión con la API';
  }
}
