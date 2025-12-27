import { MyComponent } from './my-component';
import { Pokedex } from '../pokedex';
import { SelectedPokemonService } from '../selected-pokemon.service';
import { of } from 'rxjs';

describe('MyComponent', () => {
  let component: MyComponent;
  let pokedexMock: jest.Mocked<Pokedex>;
  let selectedServiceMock: jest.Mocked<SelectedPokemonService>;

  beforeEach(() => {
    pokedexMock = {
      getPokemonList: jest.fn().mockReturnValue(of({ pokemon_entries: [] }))
    } as any;
    
    selectedServiceMock = {
      selected$: of(''),
      getSelected: jest.fn().mockReturnValue(''),
      setSelected: jest.fn()
    } as any;
    
    component = new MyComponent(pokedexMock, selectedServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
