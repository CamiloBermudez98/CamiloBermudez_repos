import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { PokemonsApiService } from 'src/app/service/pokemons-api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let pokemonsApiService: jasmine.SpyObj<PokemonsApiService>;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonsApiService', ['GetPokemonID', 'GetAllPokemons']);
    pokemonServiceSpy.GetPokemonID.and.callFake((id: number) =>
      of({ id, name: `Pokemon ${id}`, sprites: { front_default: 'url' } })
    );
    await TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      imports: [HttpClientTestingModule, MatDialogModule,AppModule],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: PokemonsApiService, useValue: pokemonServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    pokemonsApiService = TestBed.inject(PokemonsApiService) as jasmine.SpyObj<PokemonsApiService>;
 
    // Simulamos una respuesta de GetPokemonID para las pruebas
    pokemonsApiService.GetPokemonID.and.callFake((id: number) =>
      of({ id, name: `Pokemon ${id}`, sprites: { front_default: 'url' } })
    );
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch 151 pokemons on init', (done) => {
    component.getPokemon();
    component.dataPokemons.subscribe((pokemons) => {
      expect(pokemons.length).toBe(151);
      done();
    });
  });
  

  it('should select a pokemon and extract sprite keys', () => {
    const mockPokemon = {
      name: 'Pikachu',
      sprites: {
        front_default: 'url1',
        back_default: 'url2',
        other: {},
        versions: {}
      }
    };
    component.selectPokemon(mockPokemon);

    expect(component.PokemonSelected).toEqual(mockPokemon);
    expect(component.spriteKeys).toEqual(['front_default', 'back_default']);
  });

  it('should increase page when nextPage is called and not last page', () => {
    component.totalItems = 10;
    component.itemsPerPage = 4;
    component.currentPage = 0;

    component.nextPage(component.totalItems);

    expect(component.currentPage).toBe(1);
  });

  it('should decrease page when prevPage is called and not first page', () => {
    component.currentPage = 1;
    component.prevPage();
    expect(component.currentPage).toBe(0);
  });

  it('should open dialog and add a new pokemon if result is returned', () => {
    const mockDialogRef = {
      afterClosed: () => of({
        name: 'NewPokemon',
        sprites: { front_default: 'new_url' }
      })
    };
    mockDialog.open.and.returnValue(mockDialogRef as any);

    const previousLength = component.pokemonsList.length;

    component.AddPokemon();

    expect(component.pokemonsList.length).toBeGreaterThan(previousLength);
    expect(component.totalItems).toBe(component.pokemonsList.length);
  });
});
