import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { BuscarPersonagemComponent } from './buscar-personagem/buscar-personagem.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { HeaderComponent } from './header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    BuscarPersonagemComponent,
    FavoritosComponent,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test-mottu';
  constructor(private router: Router) {}
  navegarParaBuscarPersonagem() {
    this.router.navigate(['/buscar']);
  }
}
