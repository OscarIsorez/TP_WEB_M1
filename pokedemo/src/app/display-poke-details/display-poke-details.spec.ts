import { DisplayPokeDetails } from './display-poke-details';
import { Pokedex } from '../pokedex';
import { SelectedPokemonService } from '../selected-pokemon.service';
import { of, throwError, Subject } from 'rxjs';
import { SimpleChange } from '@angular/core';

describe('DisplayPokeDetails', () => {
  let component: DisplayPokeDetails;
  let pokedexMock: jest.Mocked<Pokedex>;
  let selectedServiceMock: jest.Mocked<SelectedPokemonService>;
  let selectedSubject: Subject<number | string>;

  beforeEach(() => {
    selectedSubject = new Subject<number | string>();
    
    pokedexMock = {
      getPokemonDetails: jest.fn()
    } as any;
    
    selectedServiceMock = {
      selected$: selectedSubject.asObservable(),
      getSelected: jest.fn(),
      setSelected: jest.fn()
    } as any;
    
    component = new DisplayPokeDetails(pokedexMock, selectedServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to selected$ on ngOnInit and load pokemon', () => {
    const mockDetails = {
      id: 25,
      name: 'pikachu',
      base_experience: 112,
      height: 4,
      weight: 60,
      order: 35,
      sprites: { front_default: 'url' },
      abilities: [{ ability: { name: 'static' }, is_hidden: false, slot: 1 }],
      stats: [{ stat: { name: 'hp' }, base_stat: 35 }]
    };
    pokedexMock.getPokemonDetails.mockReturnValue(of(mockDetails));

    component.ngOnInit();
    selectedSubject.next(25);

    expect(pokedexMock.getPokemonDetails).toHaveBeenCalledWith(25);
    expect(component.pokemon).toEqual({
      id: 25,
      name: 'pikachu',
      base_experience: 112,
      height: 4,
      weight: 60,
      order: 35,
      sprites: { front_default: 'url' },
      abilities: [{ ability: { name: 'static' }, is_hidden: false, slot: 1 }],
      stats: [{ stat: { name: 'hp' }, base_stat: 35 }]
    });
    expect(component.loading).toBe(false);
  });

  it('should set pokemon to null when selected id is invalid', () => {
    component.ngOnInit();
    component.pokemon = { id: 1, name: 'test' } as any;
    
    selectedSubject.next('');
    expect(component.pokemon).toBeNull();
    
    selectedSubject.next('abc');
    expect(component.pokemon).toBeNull();
    
    selectedSubject.next(0);
    expect(component.pokemon).toBeNull();
  });

  it('should handle error when loading pokemon', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    pokedexMock.getPokemonDetails.mockReturnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();
    selectedSubject.next(25);

    expect(component.loading).toBe(false);
    expect(component.error).toBe('Impossible de charger le pokémon.');
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should load pokemon when pokemonId is provided via Input', () => {
    const mockDetails = {
      id: 1,
      name: 'bulbasaur',
      base_experience: 64,
      height: 7,
      weight: 69,
      order: 1,
      sprites: { front_default: 'url2' },
      abilities: [],
      stats: []
    };
    pokedexMock.getPokemonDetails.mockReturnValue(of(mockDetails));
    component.pokemonId = 1;

    component.ngOnChanges({
      pokemonId: new SimpleChange(null, 1, true)
    });

    expect(pokedexMock.getPokemonDetails).toHaveBeenCalledWith(1);
  });

  it('should set pokemon to null when pokemonId is invalid in ngOnChanges', () => {
    component.pokemon = { id: 1, name: 'test' } as any;
    
    component.ngOnChanges({
      pokemonId: new SimpleChange(null, '', true)
    });
    expect(component.pokemon).toBeNull();
    
    component.pokemon = { id: 1, name: 'test' } as any;
    component.ngOnChanges({
      pokemonId: new SimpleChange(null, 'invalid', true)
    });
    expect(component.pokemon).toBeNull();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    component.ngOnInit();
    const unsubscribeSpy = jest.spyOn(component['sub']!, 'unsubscribe');
    
    component.ngOnDestroy();
    
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should handle pokemon with missing optional fields', () => {
    const mockDetails = {
      id: 1,
      name: 'bulbasaur',
      sprites: {},
      abilities: [{ is_hidden: true }],
      stats: [{ base_stat: 50 }]
    };
    pokedexMock.getPokemonDetails.mockReturnValue(of(mockDetails));

    component.ngOnInit();
    selectedSubject.next(1);

    expect(component.pokemon?.base_experience).toBe(0);
    expect(component.pokemon?.height).toBe(0);
    expect(component.pokemon?.weight).toBe(0);
    expect(component.pokemon?.sprites.front_default).toBe('');
    expect(component.pokemon?.abilities[0].ability.name).toBe('');
    expect(component.pokemon?.stats[0].stat.name).toBe('');
  });
});
