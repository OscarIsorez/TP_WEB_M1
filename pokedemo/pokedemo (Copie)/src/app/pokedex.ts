import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Pokedex {

  http: HttpClient;

  constructor(http: HttpClient) { 
    this.http = http;
  }

  getPokemonList() {
    return this.http.get('https://pokeapi.co/api/v2/pokedex/1/');
  }

  getPokemonDetails(id:  number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }
}
