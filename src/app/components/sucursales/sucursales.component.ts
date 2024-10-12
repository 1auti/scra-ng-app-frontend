import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { GeoCodingService } from '../../services/geo-coding.service';
import { isPlatformBrowser } from '@angular/common';

interface Sucursal {
  id: number;
  supermercado: string;
  provincia: string;
  localidad: string;
  direccion: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  sucursales: Sucursal[] = [];
  sucursalesFiltradas: Sucursal[] = [];
  private L : any;

  
  filtroSupermercado: string = '';
  filtroProvincia: string = '';
  filtroLocalidad: string = '';

  private map: L.Map | null = null;
  private markers: L.Marker[] = [];

  constructor(private http: HttpClient,
              private geocodingService:GeoCodingService,
              @Inject(PLATFORM_ID) private platformId: Object) {}

 async ngOnInit() {
    this.cargarSucursales();
    if (isPlatformBrowser(this.platformId)) {
      await this.loadLeaflet();
      this.initMap();
    }
  }

  private async loadLeaflet() {
    if (typeof window !== 'undefined') {
      this.L = await import('leaflet');
    }
  }


  cargarSucursales() {
    this.http.get<{ sucursales: Sucursal[] }>('assets/sucursales.json').subscribe(
      data => {
        this.sucursales = data.sucursales;
        this.sucursalesFiltradas = this.sucursales;  // Inicializa sucursalesFiltradas
        this.obtenerCoordenadas();
      },
      error => {
        console.error('Error al cargar las sucursales:', error);
      }
    );
  }

  obtenerCoordenadas() {
    this.sucursales.forEach(sucursal => {
      if (!sucursal.lat || !sucursal.lng) {
        const direccionCompleta = `${sucursal.direccion}, ${sucursal.localidad}, ${sucursal.provincia}`;
        this.geocodingService.geocodeAddress(direccionCompleta).subscribe(
          coords => {
            if (coords) {
              sucursal.lat = coords[0];
              sucursal.lng = coords[1];
              this.actualizarMarcadores();
            }
          },
          error => {
            console.error(`Error al geocodificar ${direccionCompleta}:`, error);
          }
        );
      }
    });
  }

  filtrar() {
    this.sucursalesFiltradas = this.sucursales.filter(s => 
      s.supermercado.toLowerCase().includes(this.filtroSupermercado.toLowerCase()) &&
      s.provincia.toLowerCase().includes(this.filtroProvincia.toLowerCase()) &&
      s.localidad.toLowerCase().includes(this.filtroLocalidad.toLowerCase())
    );
    this.actualizarMarcadores();
  }

   initMap() {
    if (this.L && typeof window !== 'undefined') {
      this.map = this.L.map('map').setView([-34.6037, -58.3816], 8);
      this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    }
  }

  actualizarMarcadores() {
    if (this.L && this.map) {
      this.limpiarMarcadores();
      this.sucursalesFiltradas.forEach(sucursal => {
        const marker = this.L.marker([sucursal.lat, sucursal.lng])
          .addTo(this.map!)
          .bindPopup(sucursal.supermercado);
        this.markers.push(marker);
      });
    }
  }

  limpiarMarcadores() {
    if (this.L && this.map) {
      this.markers.forEach(marker => this.map?.removeLayer(marker));
      this.markers = [];
    }
  }
  
  verEnMapa(sucursal: Sucursal) {
    if (this.L && this.map) {
      this.map.setView([sucursal.lat, sucursal.lng], 15);
      const marker = this.markers.find(m => 
        m.getLatLng().lat === sucursal.lat && m.getLatLng().lng === sucursal.lng
      );
      marker?.openPopup();
    }
  }
}