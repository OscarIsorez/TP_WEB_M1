import { SelectedPokemonService } from './selected-pokemon.service';

describe('SelectedPokemonService', () => {
  let service: SelectedPokemonService;

  beforeEach(() => {
    service = new SelectedPokemonService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty string', (done) => {
    service.selected$.subscribe((value) => {
      expect(value).toBe('');
      done();
    });
  });

  it('should update selected value when setSelected is called with number', (done) => {
    service.setSelected(25);
    
    service.selected$.subscribe((value) => {
      expect(value).toBe(25);
      done();
    });
  });

  it('should update selected value when setSelected is called with string', (done) => {
    service.setSelected('pikachu');
    
    service.selected$.subscribe((value) => {
      expect(value).toBe('pikachu');
      done();
    });
  });

  it('should return current value when getSelected is called', () => {
    service.setSelected(10);
    expect(service.getSelected()).toBe(10);
  });

  it('should return empty string initially when getSelected is called', () => {
    expect(service.getSelected()).toBe('');
  });

  it('should emit to all subscribers when value changes', () => {
    const values: (number | string)[] = [];
    
    service.selected$.subscribe((value) => {
      values.push(value);
    });

    service.setSelected(1);
    service.setSelected(2);
    service.setSelected('test');

    expect(values).toEqual(['', 1, 2, 'test']);
  });
});
