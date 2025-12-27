import { Pokedex } from './pokedex';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Pokedex', () => {
  let service: Pokedex;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn()
    } as any;
    service = new Pokedex(httpClientMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get with correct URL when getPokemonList is called', () => {
    const mockResponse = { pokemon_entries: [] };
    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.getPokemonList();

    expect(httpClientMock.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokedex/1/');
  });

  it('should call http.get with correct URL when getPokemonDetails is called', () => {
    const mockResponse = { id: 25, name: 'pikachu' };
    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.getPokemonDetails(25);

    expect(httpClientMock.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/25/');
  });

  it('should return observable from getPokemonList', (done) => {
    const mockResponse = { pokemon_entries: [{ entry_number: 1 }] };
    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.getPokemonList().subscribe((result) => {
      expect(result).toEqual(mockResponse);
      done();
    });
  });

  it('should return observable from getPokemonDetails', (done) => {
    const mockResponse = { id: 1, name: 'bulbasaur' };
    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.getPokemonDetails(1).subscribe((result) => {
      expect(result).toEqual(mockResponse);
      done();
    });
  });
});
