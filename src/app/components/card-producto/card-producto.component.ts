import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
  styleUrl: './card-producto.component.css'
})
export class CardProductoComponent {
  @Input() imagen!: string;
  @Input() nombre!: string;
  @Input() precio!: number;
  @Input() supermercado!: string;

  verMas() {
    console.log('Ver más');
  }
}
