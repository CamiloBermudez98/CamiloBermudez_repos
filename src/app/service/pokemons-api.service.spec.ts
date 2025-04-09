import { TestBed } from '@angular/core/testing';
import { PokemonsApiService } from './pokemons-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../enviroments/enviroment';

describe('PokemonsApiService', () => {
  let service: PokemonsApiService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.PokemonURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonsApiService]
    });
    service = TestBed.inject(PokemonsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GetPokemon and return data', () => {
    const mockResponse = { results: [{ name: 'pikachu' }] };

    service.GetPokemon().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call GetPokemonID with correct URL and return data', () => {
    const id = 25;
    const mockResponse = { name: 'pikachu', id: 25 };

    service.GetPokemonID(id).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
