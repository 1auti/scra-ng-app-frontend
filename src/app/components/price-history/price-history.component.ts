import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartDataset, ScatterDataPoint, registerables } from 'chart.js';
import { es } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';



interface ProductPrice {
  localDate: string;
  precio: number;
}

interface Product {
  id: number;
  name: string;
  selected: boolean;
  priceHistory: ProductPrice[];
}

@Component({
  selector: 'app-price-history',
  templateUrl: './price-history.component.html',
  styleUrls: ['./price-history.component.css']
})
export class PriceHistoryComponent implements AfterViewInit {
  @ViewChild('priceChart') private chartRef!: ElementRef;
  private chart: Chart | null = null;

  availableProducts: Product[] = [
    { id: 1, name: 'Producto 1', selected: true, priceHistory: this.generateFakePriceHistory() },
    { id: 2, name: 'Producto 2', selected: false, priceHistory: this.generateFakePriceHistory() },
    { id: 3, name: 'Producto 3', selected: false, priceHistory: this.generateFakePriceHistory() },
  ];


  ngAfterViewInit() {
    // Inicializamos el gráfico después de que la vista se haya inicializado
    this.createChart();
  }

  createChart() {

  
    const ctx = (document.getElementById('priceChart') as HTMLCanvasElement).getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context from canvas');
      return;
    }
    
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Precio'
            }
          },
          x: {
            type: 'time',
            time: {
              unit: 'day'
            },
            title: {
              display: true,
              text: 'Fecha'
            }
          }
        },
        elements: {
          point: {
            pointStyle: 'circle',
            radius: 5,
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
    this.updateChart();
  }

  updateChart() {
    if (!this.chart) {
      console.error('Chart not initialized');
      return;
    }

    const selectedProducts = this.availableProducts.filter(p => p.selected);
    
    const datasets: ChartDataset<'line', ScatterDataPoint[]>[] = selectedProducts.map(product => ({
      type: 'line',
      label: product.name,
      data: product.priceHistory.map(ph => ({
        x: new Date(ph.localDate).getTime(),
        y: ph.precio
      })),
      borderColor: this.getRandomColor(),
      fill: false
    }));

    this.chart.data.datasets = datasets;
    this.chart.update();
  }

  onProductSelectionChange() {
    this.updateChart();
  }

  generateFakePriceHistory(): ProductPrice[] {
    const startDate = new Date('2024-01-01');
    const priceHistory: ProductPrice[] = [];

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      priceHistory.push({
        localDate: currentDate.toISOString().split('T')[0],
        precio: Math.random() * 100 + 50
      });
    }

    return priceHistory;
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
}