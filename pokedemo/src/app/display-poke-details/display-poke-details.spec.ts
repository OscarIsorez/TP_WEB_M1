import { DisplayPokeDetails } from './display-poke-details';
import { Pokedex } from '../pokedex';
import { SelectedPokemonService } from '../selected-pokemon.service';
import { of } from 'rxjs';

describe('DisplayPokeDetails', () => {
  let component: DisplayPokeDetails;
  let pokedexMock: jest.Mocked<Pokedex>;
  let selectedServiceMock: jest.Mocked<SelectedPokemonService>;

  beforeEach(() => {
    pokedexMock = {
      getPokemonDetails: jest.fn()
    } as any;
    
    selectedServiceMock = {
      selected$: of(''),
      getSelected: jest.fn(),
      setSelected: jest.fn()
    } as any;
    
    component = new DisplayPokeDetails(pokedexMock, selectedServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
