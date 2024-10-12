// sidebar.component.ts
import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  icon?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  currentLevel: MenuItem[] = [];
  breadcrumbs: string[] = [];
  isActive = false;

  menuItems: MenuItem[] = [
    {
      name: 'Supermercados',
      icon: 'fa-solid fa-store',
      expanded:false,
      children: [
        {
          name: 'Día',
          icon: 'fa-solid fa-store-alt',
          expanded:false,
          children: [
            { 
              name: 'Almacén', 
              icon: 'fa-solid fa-warehouse',
              expanded:false,
              children: [
                { 
                  name: 'Conservas', 
                  expanded:false,
                  children: [
                    { name: 'Conservas de pescados',
                      expanded:false,
                    },
                    { name: 'Conservas de vegetales',
                      expanded:false,
                    },
                    { name: 'Conservas de frutas',
                      expanded:false,
                    },
                    { name: 'Tomates y salsas',
                      expanded:false,
                    }
                  ]
                },
                { name: 'Aceites y aderezos' },
                { name: 'Pastas secas' },
                { name: 'Arroz y legumbres' },
                { name: 'Panadería' },
                { name: 'Golosinas y alfajores' },
                { name: 'Repostería' },
                { name: 'Comidas listas' },
                { name: 'Harinas' },
                { name: 'Picadas' }
              ]
            },
            { name: 'Bebidas', icon: 'fa-solid fa-wine-bottle' },
            { name: 'Frescos', icon: 'fa-solid fa-apple-whole' },
            { name: 'Desayuno', icon: 'fa-solid fa-mug-hot' },
            { name: 'Limpieza', icon: 'fa-solid fa-broom' },
            { name: 'Perfumería', icon: 'fa-solid fa-spray-can-sparkles' },
            { name: 'Congelados', icon: 'fa-solid fa-snowflake' },
            { name: 'Bebés y Niños', icon: 'fa-solid fa-baby' },
            { name: 'Hogar y Deco', icon: 'fa-solid fa-house' },
            { name: 'Mascotas', icon: 'fa-solid fa-paw' }
          ]
        },
        {
          name: 'Jumbo',
          icon: 'fa-solid fa-store-alt',
          children: [
            { 
              name: 'Almacén', 
              icon: 'fa-solid fa-warehouse',
              children: [
                { 
                  name: 'Conservas', 
                  children: [
                    { name: 'Conservas de pescados' },
                    { name: 'Conservas de vegetales' },
                    { name: 'Conservas de frutas' },
                    { name: 'Tomates y salsas' }
                  ]
                },
                { name: 'Aceites y aderezos' },
                { name: 'Pastas secas' },
                { name: 'Arroz y legumbres' },
                { name: 'Panadería' },
                { name: 'Golosinas y alfajores' },
                { name: 'Repostería' },
                { name: 'Comidas listas' },
                { name: 'Harinas' },
                { name: 'Picadas' }
              ]
            },
            { name: 'Bebidas', icon: 'fa-solid fa-wine-bottle' },
            { name: 'Frescos', icon: 'fa-solid fa-apple-whole' },
            { name: 'Desayuno', icon: 'fa-solid fa-mug-hot' },
            { name: 'Limpieza', icon: 'fa-solid fa-broom' },
            { name: 'Perfumería', icon: 'fa-solid fa-spray-can-sparkles' },
            { name: 'Congelados', icon: 'fa-solid fa-snowflake' },
            { name: 'Bebés y Niños', icon: 'fa-solid fa-baby' },
            { name: 'Hogar y Deco', icon: 'fa-solid fa-house' },
            { name: 'Mascotas', icon: 'fa-solid fa-paw' }

          ]
        },
        {
          name: 'Coto',
          icon: 'fa-solid fa-store-alt',
          children: [
            { 
              name: 'Almacén', 
              icon: 'fa-solid fa-warehouse',
              children: [
                { 
                  name: 'Conservas', 
                  children: [
                    { name: 'Conservas de pescados' },
                    { name: 'Conservas de vegetales' },
                    { name: 'Conservas de frutas' },
                    { name: 'Tomates y salsas' }
                  ]
                },
                { name: 'Aceites y aderezos' },
                { name: 'Pastas secas' },
                { name: 'Arroz y legumbres' },
                { name: 'Panadería' },
                { name: 'Golosinas y alfajores' },
                { name: 'Repostería' },
                { name: 'Comidas listas' },
                { name: 'Harinas' },
                { name: 'Picadas' }
              ]
            },
            { name: 'Bebidas', icon: 'fa-solid fa-wine-bottle' },
            { name: 'Frescos', icon: 'fa-solid fa-apple-whole' },
            { name: 'Desayuno', icon: 'fa-solid fa-mug-hot' },
            { name: 'Limpieza', icon: 'fa-solid fa-broom' },
            { name: 'Perfumería', icon: 'fa-solid fa-spray-can-sparkles' },
            { name: 'Congelados', icon: 'fa-solid fa-snowflake' },
            { name: 'Bebés y Niños', icon: 'fa-solid fa-baby' },
            { name: 'Hogar y Deco', icon: 'fa-solid fa-house' },
            { name: 'Mascotas', icon: 'fa-solid fa-paw' }
          ]
        }
      ]
    }
  ];

  constructor() {
    this.currentLevel = this.menuItems;
  }

  navigateTo(item: MenuItem) {
    if (item.children) {
      this.breadcrumbs.push(item.name);
      this.currentLevel = item.children;
    }
  }

  goBack() {
    if (this.breadcrumbs.length > 0) {
      this.breadcrumbs.pop();
      this.currentLevel = this.findCurrentLevel();
    }
  }

  private findCurrentLevel(): MenuItem[] {
    let level = this.menuItems;
    for (let crumb of this.breadcrumbs) {
      const found = level.find(item => item.name === crumb);
      if (found && found.children) {
        level = found.children;
      }
    }
    return level;
  }

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

  toggleMenu(item:MenuItem){
    item.expanded = !item.expanded;
  }
}