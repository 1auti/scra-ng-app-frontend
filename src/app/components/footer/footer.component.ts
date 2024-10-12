import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // Variable para seguir el estado de visibilidad del footer
  footerVisible: boolean = false;

  // Función para mostrar/ocultar el footer
  toggleFooter(): void {
    this.footerVisible = !this.footerVisible;

    // Desplazar suavemente hacia el footer cuando se muestra
    if (this.footerVisible) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 100); // Pequeña espera para asegurarse de que el footer se haya mostrado antes del scroll
    }
  }

  // Función para determinar la clase del ícono de flecha
  getToggleIconClass(): string {
    return this.footerVisible ? 'bi-chevron-up' : 'bi-chevron-down';
  }
}
