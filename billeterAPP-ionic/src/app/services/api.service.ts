import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Categoria, Cliente, Producto } from '../models/clientes';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  private options() {
    const token = localStorage.getItem('billeterapp_token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return { headers };
  }

  clientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.apiUrl}/clientes/`, this.options());
  }
  crearCliente(data: Omit<Cliente, 'id_cliente' | 'creado_en'>): Observable<any> {
    return this.http.post(`${environment.apiUrl}/clientes/`, data, this.options());
  }
  actualizarCliente(id: number, data: Partial<Cliente>): Observable<any> {
    return this.http.put(`${environment.apiUrl}/clientes/${id}`, data, this.options());
  }
  eliminarCliente(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/clientes/${id}`, this.options());
  }

  categorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${environment.apiUrl}/categorias/`, this.options());
  }
  crearCategoria(data: { nombre: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/categorias/`, data, this.options());
  }
  actualizarCategoria(id: number, data: { nombre: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}/categorias/${id}`, data, this.options());
  }
  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/categorias/${id}`, this.options());
  }

  productos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${environment.apiUrl}/productos/`, this.options());
  }
  crearProducto(data: Omit<Producto, 'id_producto' | 'creado_en'>): Observable<any> {
    return this.http.post(`${environment.apiUrl}/productos/`, data, this.options());
  }
  actualizarProducto(id: number, data: Partial<Producto>): Observable<any> {
    return this.http.put(`${environment.apiUrl}/productos/${id}`, data, this.options());
  }
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/productos/${id}`, this.options());
  }
}
