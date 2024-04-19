import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private favoritosSource = new BehaviorSubject<any[]>([]);
  favoritosAtualizados$ = this.favoritosSource.asObservable();

  atualizarFavoritos(favoritos: any[]) {
    let personagensFiltrados = favoritos.filter(
      (item: any) => typeof item === 'object'
    );
    this.favoritosSource.next(personagensFiltrados);
  }
}
