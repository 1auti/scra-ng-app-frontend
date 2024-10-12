import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component'; 
import { RouterModule, Routes } from '@angular/router';
import { CardProductoComponent } from './card-producto/card-producto.component';
import { MarketStatatisticsComponent } from './market-statatistics/market-statatistics.component';
import { FormsModule } from '@angular/forms';
import { PriceHistoryComponent } from './price-history/price-history.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ComparisonToolsComponent } from './comparison-tools/comparison-tools.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { PersonalizedRecommendationsComponent } from './personalized-recommendations/personalized-recommendations.component';
import { FooterComponent } from './footer/footer.component';
import { PaidPromotionsComponent } from './paid-promotions/paid-promotions.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, // Este es el contenedor
    children: [
      { path: '',component:HomeComponent},
      { path: 'estadisticas-supermercados', component: MarketStatatisticsComponent},
      { path: 'historial-precios',component:PriceHistoryComponent},
      { path: 'herramienta-comparacion',component: ComparisonToolsComponent},
      { path: 'sucursales',component:SucursalesComponent},
      { path: 'recomendaciones-personalizadas',component:PersonalizedRecommendationsComponent},
      { path: 'promociones-pagos',component:PaidPromotionsComponent}
      
      
    ]
  }
];


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    CardProductoComponent,
    MarketStatatisticsComponent,
    PriceHistoryComponent,
    LayoutComponent,
    HomeComponent,
    ComparisonToolsComponent,
    SucursalesComponent,
    PersonalizedRecommendationsComponent,
    FooterComponent,
    PaidPromotionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports:[
    RouterModule,
    NavbarComponent,
    SidebarComponent,
    CardProductoComponent,
    LayoutComponent,
    HomeComponent
  ]
})
export class ComponentModule { }
