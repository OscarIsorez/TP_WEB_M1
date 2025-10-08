// ...existing code...
import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokedex } from '../pokedex';
import { Pokemon } from '../pokemon';
import { SelectedPokemonService } from '../selected-pokemon.service';

@Component({
  selector: 'app-display-poke-details',
  standalone: false,
  templateUrl: './display-poke-details.html',
  styleUrls: ['./display-poke-details.css']
})
export class DisplayPokeDetails implements OnChanges, OnInit, OnDestroy {
  @Input() pokemonId: number | string = '';
  pokemon: Pokemon | null = null;
  loading = false;
  error = '';

  private sub: Subscription | null = null;

  constructor(private pokedex: Pokedex, private selected: SelectedPokemonService) {}

  ngOnInit(): void {
    // subscribe to shared selected pokemon observable
    this.sub = this.selected.selected$.subscribe((id) => {
      const numeric = Number(id);
      if (!isNaN(numeric) && numeric > 0) {
        this.loadPokemon(numeric);
      } else {
        this.pokemon = null;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonId']) {
      const id = Number(this.pokemonId);
      if (!isNaN(id) && id > 0) {
        this.loadPokemon(id);
      } else {
        this.pokemon = null;
      }
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private loadPokemon(id: number) {
    this.loading = true;
    this.error = '';
    this.pokedex.getPokemonDetails(id).subscribe({
      next: (resp: any) => {
        // map the API response to the Pokemon model expected by the template
        this.pokemon = {
          id: resp.id,
          name: resp.name,
          base_experience: resp.base_experience || 0,
          height: resp.height || 0,
          weight: resp.weight || 0,
          order: resp.order,
          sprites: { front_default: resp.sprites?.front_default || '' },
          abilities: Array.isArray(resp.abilities) ? resp.abilities.map((a: any) => ({
            ability: { name: a.ability?.name || '' },
            is_hidden: !!a.is_hidden,
            slot: a.slot ?? 0
          })) : [],
          stats: Array.isArray(resp.stats) ? resp.stats.map((s: any) => ({
            stat: { name: s.stat?.name || '' },
            base_stat: s.base_stat ?? 0
          })) : []
        };
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load pokemon details', err);
        this.error = 'Impossible de charger le pokémon.';
        this.loading = false;
      }
    });
  }
}