import { MyComponent } from './my-component';
import { Pokedex } from '../pokedex';
import { SelectedPokemonService } from '../selected-pokemon.service';
import { of, throwError } from 'rxjs';

describe('MyComponent', () => {
  let component: MyComponent;
  let pokedexMock: jest.Mocked<Pokedex>;
  let selectedServiceMock: jest.Mocked<SelectedPokemonService>;

  beforeEach(() => {
    pokedexMock = {
      getPokemonList: jest.fn().mockReturnValue(of({ pokemon_entries: [] })),
      getPokemonDetails: jest.fn()
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

  it('should load pokemon list on ngOnInit', () => {
    const mockResponse = {
      pokemon_entries: [
        { entry_number: 1, pokemon_species: { name: 'bulbasaur' } },
        { entry_number: 2, pokemon_species: { name: 'ivysaur' } }
      ]
    };
    pokedexMock.getPokemonList.mockReturnValue(of(mockResponse));
    selectedServiceMock.getSelected.mockReturnValue('1');

    component.ngOnInit();

    expect(pokedexMock.getPokemonList).toHaveBeenCalled();
    expect(component.pokemons).toEqual([
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' }
    ]);
    expect(component.id).toBe('1');
  });

  it('should handle error when loading pokemon list', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    pokedexMock.getPokemonList.mockReturnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load pokedex', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  it('should call setSelected when onIdChange is called', () => {
    component.id = '25';
    component.onIdChange();
    expect(selectedServiceMock.setSelected).toHaveBeenCalledWith('25');
  });

  it('should call setSelected when onSelectChange is called', () => {
    component.id = '10';
    component.onSelectChange();
    expect(selectedServiceMock.setSelected).toHaveBeenCalledWith('10');
  });

  it('should print ID and name when PrintIdAndName is called with valid pokemon', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    component.pokemons = [
      { id: 1, name: 'bulbasaur' },
      { id: 25, name: 'pikachu' }
    ];
    component.id = '25';

    component.PrintIdAndName();

    expect(consoleLogSpy).toHaveBeenCalledWith('Selected Pokemon: ID=25, Name=pikachu');
    consoleLogSpy.mockRestore();
  });

  it('should not print anything when PrintIdAndName is called with invalid pokemon', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    component.pokemons = [{ id: 1, name: 'bulbasaur' }];
    component.id = '999';

    component.PrintIdAndName();

    expect(consoleLogSpy).not.toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });

  it('should fetch and log pokemon details when printDetails is called', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const mockDetails = { id: 25, name: 'pikachu', height: 4, weight: 60 };
    pokedexMock.getPokemonDetails.mockReturnValue(of(mockDetails));
    component.id = '25';

    component.printDetails();

    expect(pokedexMock.getPokemonDetails).toHaveBeenCalledWith(25);
    expect(consoleLogSpy).toHaveBeenCalledWith('Pokemon Details:', mockDetails);
    consoleLogSpy.mockRestore();
  });

  it('should handle error when printDetails fails', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    pokedexMock.getPokemonDetails.mockReturnValue(throwError(() => new Error('API Error')));
    component.id = '25';

    component.printDetails();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load pokemon details', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});
