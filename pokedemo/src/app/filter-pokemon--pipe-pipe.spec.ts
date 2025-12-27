import { FilterPokemonPipePipe } from './filter-pokemon--pipe-pipe';

describe('FilterPokemonPipePipe', () => {
  let pipe: FilterPokemonPipePipe;

  beforeEach(() => {
    pipe = new FilterPokemonPipePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all pokemons when searchString is undefined', () => {
    const pokemons = [{ name: 'pikachu' }, { name: 'bulbasaur' }];
    const result = pipe.transform(pokemons);
    expect(result).toEqual(pokemons);
  });

  it('should filter pokemons by property and searchString', () => {
    const pokemons = [
      { name: 'pikachu', type: 'electric' },
      { name: 'bulbasaur', type: 'grass' },
      { name: 'charmander', type: 'fire' }
    ];
    const result = pipe.transform(pokemons, 'name', 'char');
    expect(result).toEqual([{ name: 'charmander', type: 'fire' }]);
  });

  it('should filter case-insensitively', () => {
    const pokemons = [
      { name: 'Pikachu' },
      { name: 'BULBASAUR' },
      { name: 'charmander' }
    ];
    const result = pipe.transform(pokemons, 'name', 'PIKA');
    expect(result).toEqual([{ name: 'Pikachu' }]);
  });

  it('should return empty array when pokes is undefined', () => {
    const result = pipe.transform(undefined as any, 'name', 'test');
    expect(result).toEqual([]);
  });

  it('should return empty array when property is undefined but searchString is defined', () => {
    const pokemons = [{ name: 'pikachu' }];
    const result = pipe.transform(pokemons, undefined, 'test');
    expect(result).toEqual([]);
  });
});
