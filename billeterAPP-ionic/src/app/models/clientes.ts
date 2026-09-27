export interface Cliente {
  id_cliente: number;
  nombre: string;
  documento: string;
  telefono: string;
  direccion: string;
  creado_en?: string | null;
}

export interface Categoria {
  id_categoria: number;
  nombre: string;
  creado_en?: string | null;
}

export interface Producto {
  id_producto: number;
  nombre: string;
  precio_venta: number;
  id_categoria: number;
  activo: number;
  creado_en?: string | null;
}
