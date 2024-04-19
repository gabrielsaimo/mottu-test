import { Component, Input, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { PersonagemService } from '../personagem.service';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../favoritos.service';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-buscar-personagem',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './buscar-personagem.component.html',
  styleUrls: ['./buscar-personagem.component.css'],
})
export class BuscarPersonagemComponent {
  @Input('nome') nome: string = '';
  RickForm!: FormGroup;
  results: any = undefined;
  likedPersonagens: any = [];
  constructor(
    private personagemService: PersonagemService,
    private favoritosService: FavoritosService
  ) {
    this.RickForm = new FormGroup({
      nome: new FormControl(''),
    });
  }

  submitForm() {
    if (
      this.RickForm.controls['nome'].value === '' ||
      this.RickForm.controls['nome'].value === null
    ) {
      return;
    }
    this.nome = this.RickForm.controls['nome'].value;
    this.personagemService.buscarPersonagemPorNome(this.nome, 1).subscribe(
      (data) => {
        this.results = data;
      },
      (error) => {
        console.error('Error fetching personagem:', error);

        this.results = null;
      }
    );
  }

  nextpage(page: number) {
    this.personagemService.buscarPersonagemPorNome(this.nome, page).subscribe(
      (data) => {
        this.results = data;
      },
      (error) => {
        console.error('Error fetching personagem:', error);
        this.results = null;
      }
    );
  }

  prevpage(page: number) {
    this.personagemService.buscarPersonagemPorNome(this.nome, page).subscribe(
      (data) => {
        this.results = data;
      },
      (error) => {
        console.error('Error fetching personagem:', error);
        this.results = null;
      }
    );
  }

  handlePageEvent(page: any) {
    if (page.previousPageIndex < page.pageIndex) {
      this.nextpage(page.pageIndex + 1);
    } else {
      this.prevpage(page.pageIndex + 1);
    }
  }

  likePersonagem(personagem: any) {
    if (typeof personagem === 'object' && personagem !== null) {
      this.likedPersonagens.push(personagem);
    }

    localStorage.setItem(
      'likedPersonagens',
      JSON.stringify(this.likedPersonagens)
    );
    this.favoritosService.atualizarFavoritos(this.likedPersonagens);
  }

  dislikePersonagem(id: number) {
    this.likedPersonagens = this.likedPersonagens.filter(
      (p: any) => p.id !== id
    );
    this.updateLocalStorage();
  }
  updateLocalStorage() {
    localStorage.setItem(
      'likedPersonagens',
      JSON.stringify(this.likedPersonagens)
    );
    this.favoritosService.atualizarFavoritos(this.likedPersonagens);
  }

  toggleLikePersonagem(personagem: any) {
    const index = this.likedPersonagens.indexOf(personagem);
    if (index > -1) {
      this.likedPersonagens.splice(index, 1);
    } else {
      this.likedPersonagens.push(personagem);
    }
  }
}
