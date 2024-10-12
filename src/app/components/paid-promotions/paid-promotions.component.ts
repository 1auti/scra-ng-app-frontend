import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Promocion {
  supermercado: string;
  categoria: string;
  subCategoria?: string;
  imagen: string;
  descuento: string;
  descripcion: string;
  masInfo: string;
  link: string;
}

type Supermercado = 'Jumbo' | 'Coto' | 'Dia';

@Component({
  selector: 'app-paid-promotions',
  templateUrl: './paid-promotions.component.html',
  styleUrls: ['./paid-promotions.component.css']
})
export class PaidPromotionsComponent implements OnInit {
  supermercados: Supermercado[] = ['Jumbo', 'Coto', 'Dia'];
  promociones: Promocion[] = [];
  supermercadoSeleccionado: Supermercado = 'Jumbo';
  categoriaSeleccionada: string = 'Día';
  subCategoriaSeleccionada: string = 'Lunes';
  promoSeleccionada: Promocion | null = null;

  categoriasSupermercado: Record<Supermercado, string[]> = {
    'Jumbo': ['Día', 'Banco', 'Tarjeta Cencosud', 'Planes de Financiación'],
    'Coto': ['Día'],
    'Dia': ['Día', 'Banco']
  };

  diasSemana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.cargarPromociones();
  }

  cargarPromociones(): void {
    this.obtenerPromociones().subscribe(data => {
      this.promociones = data;
    });
  }

  obtenerPromociones(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>('../../../assets/json/promociones.json');
  }

  filtrarPromociones(): Promocion[] {
    return this.promociones.filter(promo =>
      promo.supermercado === this.supermercadoSeleccionado &&
      promo.categoria === this.categoriaSeleccionada &&
      (!promo.subCategoria || promo.subCategoria === this.subCategoriaSeleccionada)
    );
  }

  cambiarSupermercado(supermercado: Supermercado): void {
    this.supermercadoSeleccionado = supermercado;
    this.categoriaSeleccionada = this.categoriasSupermercado[supermercado][0];
    this.subCategoriaSeleccionada = this.diasSemana[0];
  }

  cambiarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    if (categoria === 'Día') {
      this.subCategoriaSeleccionada = this.diasSemana[0];
    } else {
      this.subCategoriaSeleccionada = '';
    }
  }

  cambiarSubCategoria(subCategoria: string): void {
    this.subCategoriaSeleccionada = subCategoria;
  }

  mostrarSubCategorias(): boolean {
    return this.categoriaSeleccionada === 'Día';
  }

  mostrarMasInfo(promo: Promocion) {
    this.promoSeleccionada = promo;
  }

  cerrarMasInfo() {
    this.promoSeleccionada = null;
  }
}