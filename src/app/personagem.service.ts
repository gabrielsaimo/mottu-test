import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Personagem {
  name: string;
  status: string;
  species: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class PersonagemService {
  private API_URL = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) {}

  buscarPersonagemPorNome(
    nome: string,
    page: number
  ): Observable<Personagem[]> {
    return this.http.get<Personagem[]>(
      `${this.API_URL}character/?page=${page}&name=${nome}`
    );
  }
}
