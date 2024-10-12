import { isPlatformBrowser } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, ChangeDetectorRef, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Chart , ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-market-statatistics',
  templateUrl: './market-statatistics.component.html',
  styleUrls: ['./market-statatistics.component.css']
})
export class MarketStatatisticsComponent implements OnInit, AfterViewInit,OnDestroy {
  @ViewChild('graficoCantidadProductos') graficoCantidadProductosCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficoVariedadMarcas') graficoVariedadMarcasCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficoPrecios') graficoPreciosCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficoPromociones') graficoPromocionesCanvas!: ElementRef<HTMLCanvasElement>;
  
  graficos: { [key: string]: Chart | undefined } = {
    cantidadProductos: undefined,
    variedadMarcas: undefined,
    precios: undefined,
    promociones: undefined
  };

  isBrowser: boolean;
  resizeObserver: ResizeObserver | undefined;

  categorias: string[] = ['Alimentos', 'Bebidas', 'Limpieza', 'Cuidado Personal'];
  subcategorias: { [key: string]: string[] } = {
    'Alimentos': ['Lácteos', 'Carnes', 'Frutas y Verduras'],
    'Bebidas': ['Gaseosas', 'Jugos', 'Alcohólicas'],
    'Limpieza': ['Detergentes', 'Desinfectantes', 'Papel'],
    'Cuidado Personal': ['Shampoo', 'Jabones', 'Desodorantes']
  };
  tipos: { [key: string]: string[] } = {
    'Lácteos': ['Leche', 'Queso', 'Yogurt'],
    'Carnes': ['Res', 'Pollo', 'Cerdo'],
    // ... añadir más tipos según sea necesario
  };

  categoriaSeleccionada: string = '';
  subcategoriaSeleccionada: string = '';
  tipoSeleccionado: string = '';

  supermercados = [
    {
      nombre: 'Supermercado 1',
      cantidadProductos: 150,
      variedadMarcas: ['Marca 1', 'Marca 2', 'Marca 3', 'Marca 4'],
      precios: [10, 20, 30, 40, 50],
      promociones: ['Promoción 1', 'Promoción 2', 'Promoción 3'],
      precioPromedio: 30
    },
    {
      nombre: 'Supermercado 2',
      cantidadProductos: 200,
      variedadMarcas: ['Marca 5', 'Marca 6', 'Marca 7', 'Marca 8'],
      precios: [40, 50, 60, 70, 80],
      promociones: ['Promoción 4', 'Promoción 5', 'Promoción 6'],
      precioPromedio: 30
    },
    {
      nombre: 'Supermercado 3',
      cantidadProductos: 120,
      variedadMarcas: ['Marca 9', 'Marca 10', 'Marca 11', 'Marca 12'],
      precios: [20, 30, 40, 50, 60],
      promociones: ['Promoción 7', 'Promoción 8', 'Promoción 9'],
      precioPromedio: 30
    },
    {
      nombre: 'Supermercado 4',
      cantidadProductos: 180,
      variedadMarcas: ['Marca 13', 'Marca 14', 'Marca 15', 'Marca 16'],
      precios: [30, 40, 50, 60, 70],
      promociones: ['Promoción 10', 'Promoción 11', 'Promoción 12'],
      precioPromedio: 30
    },
    {
      nombre: 'Supermercado 5',
      cantidadProductos: 100,
      variedadMarcas: ['Marca 17', 'Marca 18', 'Marca 19', 'Marca 20'],
      precios: [10, 20, 30, 40, 50],
      promociones: ['Promoción 13', 'Promoción 14', 'Promoción 15'],
      precioPromedio: 30
    }
  ];

  graficoCantidadProductos: Chart | undefined;
  graficoVariedadMarcas: Chart | undefined;
  graficoPrecios: Chart | undefined;
  graficoPromociones: Chart | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


  ngOnInit(): void {
    this.actualizarEstadisticas();
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.crearGraficos();
        this.cdr.detectChanges();
        this.setupResizeObserver();
      }, 0);
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  
  setupResizeObserver() {
    const chartContainers = [
      this.graficoCantidadProductosCanvas,
      this.graficoVariedadMarcasCanvas,
      this.graficoPreciosCanvas,
      this.graficoPromocionesCanvas
    ];

    this.resizeObserver = new ResizeObserver(() => {
      this.crearGraficos();
    });

    chartContainers.forEach(container => {
      if (container?.nativeElement) {
        this.resizeObserver?.observe(container.nativeElement);
      }
    });
  }

  onCategoriaChange() {
    this.subcategoriaSeleccionada = '';
    this.tipoSeleccionado = '';
    this.actualizarEstadisticas();
  }

  onSubcategoriaChange() {
    this.tipoSeleccionado = '';
    this.actualizarEstadisticas();
  }

  onTipoChange() {
    this.actualizarEstadisticas();
  }

  actualizarEstadisticas() {
    console.log('Actualizando estadísticas...');
    // Simular actualización de datos (reemplazar con lógica real de obtención de datos en una aplicación real)
    this.supermercados = this.supermercados.map(s => ({
      ...s,
      cantidadProductos: Math.floor(Math.random() * 200) + 50,
      variedadMarcas: Array(Math.floor(Math.random() * 5) + 2).fill(0).map((_, i) => `Marca ${i + 1}`),
      precios: Array(5).fill(0).map(() => Math.floor(Math.random() * 50) + 10),
      promociones: Array(Math.floor(Math.random() * 3) + 1).fill(0).map((_, i) => `Promoción ${i + 1}`),
      precioPromedio: Math.floor(Math.random() * 40) + 20
    }));
  
    console.log('Datos actualizados:', this.supermercados);
  
    this.crearGraficos();
  }
  
  actualizarGraficos() {
    if (this.graficoCantidadProductosCanvas && this.graficoVariedadMarcasCanvas && this.graficoPreciosCanvas && this.graficoPromocionesCanvas) {
      this.crearGraficos();
    }
  }

  crearGraficos(): void {
    if (!this.isBrowser) {
      console.log('No se pueden crear gráficos en el servidor');
      return;
    }

    console.log('Creando gráficos...');
  
    const commonOptions = {
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true }
      },
      responsive: true,
      maintainAspectRatio: false
    };
  
    const crearGrafico = (
      canvas: ElementRef | undefined,
      label: string,
      dataSelector: (s: any) => number,
      chartKey: keyof typeof this.graficos
    ): void => {
      if (!canvas || !canvas.nativeElement) {
        console.log(`Canvas no disponible para: ${label}`);
        return;
      }
  
      console.log(`Creando gráfico: ${label}`);
      const ctx = canvas.nativeElement.getContext('2d');
      
      if (!ctx) {
        console.log(`Contexto 2D no disponible para: ${label}`);
        return;
      }
  
      // Destruir el gráfico existente si existe
      if (this.graficos[chartKey] instanceof Chart) {
        this.graficos[chartKey]?.destroy();
      }
  
      const chartData = this.supermercados.map(dataSelector);
      console.log(`Datos para ${label}:`, chartData);
  
      this.graficos[chartKey] = new Chart(ctx, {
        type: 'bar' as ChartType,
        data: {
          labels: this.supermercados.map(s => s.nombre),
          datasets: [{
            label: label,
            data: chartData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: commonOptions
      });
    };
  
    crearGrafico(
      this.graficoCantidadProductosCanvas,
      'Cantidad de Productos',
      s => s.cantidadProductos,
      'cantidadProductos'
    );
  
    crearGrafico(
      this.graficoVariedadMarcasCanvas,
      'Variedad de Marcas',
      s => s.variedadMarcas.length,
      'variedadMarcas'
    );
  
    crearGrafico(
      this.graficoPreciosCanvas,
      'Precio Promedio',
      s => s.precioPromedio,
      'precios'
    );
  
    crearGrafico(
      this.graficoPromocionesCanvas,
      'Número de Promociones',
      s => s.promociones.length,
      'promociones'
    );
  
    console.log('Gráficos creados');
  }

}