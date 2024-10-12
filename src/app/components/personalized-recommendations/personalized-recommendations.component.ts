import { Component, OnInit } from '@angular/core';

interface Producto {
  id:number;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagen: string;
  valoracion: number;
}

@Component({
  selector: 'app-personalized-recommendations',
  templateUrl: './personalized-recommendations.component.html',
  styleUrl: './personalized-recommendations.component.css'
})
export class PersonalizedRecommendationsComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  historialRecomendaciones: Producto[] = [];
  categorias = ['Saludable', 'Caro', 'Barato']; // Categorías a elegir

  filtroSeleccionado: string = 'Saludable'; // Filtro por defecto
  mostrarHistorial: boolean = false; // Mostrar el historial de recomendaciones

  constructor() {}

  ngOnInit(): void {
    // Datos simulados de productos
    this.productos = [
      {
        id: 1,
        nombre: 'Ensalada Fresca',
        categoria: 'Saludable',
        precio: 150,
        descripcion: 'Una opción ligera y saludable.',
        imagen: 'https://via.placeholder.com/150x150?text=Ensalada+Fresca',
        valoracion: 4.5
      },
      {
        id: 2,
        nombre: 'Jugo Detox',
        categoria: 'Saludable',
        precio: 200,
        descripcion: 'Ideal para purificar tu cuerpo.',
        imagen: 'https://via.placeholder.com/150x150?text=Jugo+Detox',
        valoracion: 4.2
      },
      {
        id: 3,
        nombre: 'Vino Reserva',
        categoria: 'Caro',
        precio: 2500,
        descripcion: 'Un vino premium para ocasiones especiales.',
        imagen: 'https://via.placeholder.com/150x150?text=Vino+Reserva',
        valoracion: 4.8
      },
      {
        id: 4,
        nombre: 'Jamón Ibérico',
        categoria: 'Caro',
        precio: 4500,
        descripcion: 'Jamón de alta calidad.',
        imagen: 'https://via.placeholder.com/150x150?text=Jamon+Iberico',
        valoracion: 4.9
      },
      {
        id: 5,
        nombre: 'Pan Integral',
        categoria: 'Barato',
        precio: 100,
        descripcion: 'Una opción económica y saludable.',
        imagen: 'https://via.placeholder.com/150x150?text=Pan+Integral',
        valoracion: 3.8
      },
      {
        id: 6,
        nombre: 'Leche Descremada',
        categoria: 'Barato',
        precio: 80,
        descripcion: 'Leche baja en grasas a buen precio.',
        imagen: 'https://via.placeholder.com/150x150?text=Leche+Descremada',
        valoracion: 3.5
      }
    ];

    // Aplicar el filtro inicial
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    this.productosFiltrados = this.productos.filter(
      (producto) => producto.categoria === this.filtroSeleccionado
    );
  }

  // Método actualizado con el evento corregido
  calificarProducto(producto: Producto, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const valoracion = Number(target.value);
    producto.valoracion = valoracion;
    alert(`Has calificado a ${producto.nombre} con ${valoracion} estrellas.`);
  }

  verDetalleProducto(producto: Producto): void {
    alert(`Producto: ${producto.nombre}\nPrecio: $${producto.precio}\nDescripción: ${producto.descripcion}`);
    if (!this.historialRecomendaciones.find((p) => p.id === producto.id)) {
      this.historialRecomendaciones.push(producto);
    }
  }

  toggleHistorial(): void {
    this.mostrarHistorial = !this.mostrarHistorial;
  }

}
