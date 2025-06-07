import { Component } from '@angular/core';
import { HeaderComponent } from './core/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Importa esto

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, HttpClientModule],  // Agrégalo aquí
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
