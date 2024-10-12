import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  store: string;
  image: string;
  category: string;
  description: string;
  brand: string;
  showDetails?: boolean;
}

@Component({
  selector: 'app-comparison-tools',
  templateUrl: './comparison-tools.component.html',
  styleUrl: './comparison-tools.component.css'
})
export class ComparisonToolsComponent implements OnInit {

  allProducts: Product[] = [
    { id: 1, name: 'Leche entera', price: 1.5, store: 'SupermercadoA', image: 'https://via.placeholder.com/150', category: 'leche', description: 'Leche entera de vaca, 1 litro, rica en calcio y vitamina D', brand: 'LecheBuena' },
    { id: 2, name: 'Leche desnatada', price: 1.3, store: 'SupermercadoB', image: 'https://via.placeholder.com/150', category: 'leche', description: 'Leche desnatada de vaca, 1 litro, baja en grasas', brand: 'LecheSana' },
    { id: 3, name: 'Carne molida', price: 4.5, store: 'SupermercadoC', image: 'https://via.placeholder.com/150', category: 'carne', description: 'Carne molida de res, 500g, ideal para hamburguesas y albóndigas', brand: 'CarnesPremium' },
    { id: 4, name: 'Pechuga de pollo', price: 3.0, store: 'SupermercadoA', image: 'https://via.placeholder.com/150', category: 'carne', description: 'Pechuga de pollo fresca, 1kg, sin antibióticos', brand: 'AvesDelCampo' },
    { id: 5, name: 'Detergente líquido', price: 2.0, store: 'SupermercadoB', image: 'https://via.placeholder.com/150', category: 'limpieza', description: 'Detergente líquido concentrado, 1L, con aroma a lavanda', brand: 'LimpiaMax' },
    { id: 6, name: 'Limpiapisos', price: 1.8, store: 'SupermercadoC', image: 'https://via.placeholder.com/150', category: 'limpieza', description: 'Limpiapisos aroma lavanda, 900ml, desinfectante', brand: 'BrilloPiso' },
  ];

  filteredProducts: Product[] = [];
  selectedProducts: Product[] = [];
  searchTerm: string = '';
  categories: string[] = ['leche', 'carne', 'limpieza'];
  selectedCategory: string = '';

  ngOnInit() {
    this.filteredProducts = this.allProducts;
  }

  searchProducts() {
    this.filteredProducts = this.allProducts.filter(product =>
      (product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       product.category.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.selectedCategory === '' || product.category === this.selectedCategory)
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.searchProducts();
  }

  toggleProductSelection(product: Product) {
    const index = this.selectedProducts.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.selectedProducts.splice(index, 1);
    } else {
      this.selectedProducts.push(product);
    }
  }

  isProductSelected(product: Product): boolean {
    return this.selectedProducts.some(p => p.id === product.id);
  }

  toggleProductDetails(product: Product) {
    product.showDetails = !product.showDetails;
  }

}
