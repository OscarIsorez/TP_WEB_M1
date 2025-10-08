// ...existing code...
import { Component, OnInit } from '@angular/core';
import { Pokedex } from '../pokedex';
import { SelectedPokemonService } from '../selected-pokemon.service';

@Component({
  selector: 'app-my-component',
  standalone: false,
  templateUrl: './my-component.html',
  styleUrls: ['./my-component.css']
})
export class MyComponent implements OnInit {
  id: string = '';
  // list of pokemon instances
  filtervalue: string = '';
  pokemons: { id: number, name: string }[] = []; // initialize

  constructor(private pokedex: Pokedex, private selected: SelectedPokemonService) {}

  ngOnInit(): void {
    // call the service and populate pokemons 
    this.pokedex.getPokemonList().subscribe({
      next: (resp: any) => {
        // pokeapi returns pokemon_entries with entry_number and pokemon_species.name
        this.pokemons = (resp?.pokemon_entries || []).map((e: any) => ({
          id: e.entry_number,
          name: e.pokemon_species?.name || ''
        }));
      },
      error: (err) => {
        console.error('Failed to load pokedex', err);
      }
    });

    // init with current value
    this.id = String(this.selected.getSelected() || '');
  }

  onIdChange() {
    this.selected.setSelected(this.id);
  }

  onSelectChange() {
    this.selected.setSelected(this.id);
  }

  PrintIdAndName() {
    const numericId = Number(this.id);
    const selectedPokemon = this.pokemons.find(pokemon => pokemon.id === numericId);
    if (selectedPokemon) {
      console.log(`Selected Pokemon: ID=${selectedPokemon.id}, Name=${selectedPokemon.name}`);
    }
  }

  printDetails() {
    // keep for debugging but prefer using SelectedPokemonService for communication
    this.pokedex.getPokemonDetails(Number(this.id)).subscribe({
      next: (resp: any) => {
        console.log('Pokemon Details:', resp);
      },
      error: (err) => {
        console.error('Failed to load pokemon details', err);
      }
    });
  }
}
// ...existing code...