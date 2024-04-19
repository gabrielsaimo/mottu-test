import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FavoritosService } from '../favoritos.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    NgOptimizedImage,
    RouterLink,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  page: string = '';
  favoritos: any = [];
  constructor(private favoritosService: FavoritosService) {}

  ngOnInit(): void {
    this.favoritosService.favoritosAtualizados$.subscribe((favoritos) => {
      this.favoritos = favoritos;
    });

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('likedPersonagens') === null) {
        localStorage.setItem('likedPersonagens', JSON.stringify([]));
      }
      let data_liked = JSON.parse(
        localStorage.getItem('likedPersonagens') as string
      );
      let personagensFiltrados = data_liked.filter(
        (item: any) => typeof item === 'object'
      );
      this.favoritos = personagensFiltrados;

      if (window.location.pathname) {
        this.page = window.location.pathname;
      } else {
        this.page = '/buscar';
      }
    }
  }

  setPage(page: string) {
    this.page = page;
  }
}
