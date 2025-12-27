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
});
