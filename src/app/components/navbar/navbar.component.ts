import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  constructor(private router:Router){

  }

  toggleSidebar() {
    this.sidebar.toggleSidebar();
  }

  navigateToComparisonTools(){
    this.router.navigate(['herramienta-comparacion']);
  }
}
