import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  
  imagen = "/assets/Arroz Gallo Oro 500gr.jpg";
  nombre = 'Arroz Gallo Oro 500gr';
  precio = 25000;
  supermercado = 'Coto';
  
}
