import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
})
export class HomeComponent {

  constructor(private router: Router) {}

  @ViewChild('featuresSection') featuresSection!: ElementRef;

  scrollToFeatures() {
    // Hacemos visible la sección
    this.featuresSection.nativeElement.style.display = 'block';
    
    // Hacemos un desplazamiento suave hacia la sección de funcionalidades
    this.featuresSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  navigateToStats() {
    this.router.navigate(['/estadisticas-supermercados']);
  }

  navigateToPriceHistory(){
    this.router.navigate(['historial-precios']);
  }

  navigateToSucursales(){
    this.router.navigate(['sucursales']);
  }

  navigateToRecomendaciones(){
    this.router.navigate(['recomendaciones-personalizadas']);
  }

  navigateToPromocionPago(){
    this.router.navigate(['promociones-pagos']);
  }



}
