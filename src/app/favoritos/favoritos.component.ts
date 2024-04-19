import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../favoritos.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent implements OnInit {
  favoritos: any = [];

  constructor(private favoritosService: FavoritosService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
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
    }
    this.favoritosService.atualizarFavoritos(this.favoritos);
  }

  removerDosFavoritos(personagem: any) {
    this.favoritos = this.favoritos.filter((p: any) => p.id !== personagem.id);
    localStorage.setItem('likedPersonagens', JSON.stringify(this.favoritos));
    this.favoritosService.atualizarFavoritos(this.favoritos);
  }

  voltar() {
    window.location.href = '/buscar';
  }
}
