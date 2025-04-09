import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecificPokemonComponent } from './specific-pokemon.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('SpecificPokemonComponent', () => {
  let component: SpecificPokemonComponent;
  let fixture: ComponentFixture<SpecificPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificPokemonComponent],
      imports: [CommonModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificPokemonComponent);
    component = fixture.componentInstance;

    // Mock básico del Pokémon
    component.PokemonSelected = {
      order: 25,
      name: 'pikachu',
      height: 6,
      sprites: {
        front_default: 'url1',
        back_default: 'url2'
      },
      types: [
        { type: { name: 'electric' } }
      ],
      moves: [
        { move: { name: 'thunderbolt' } },
        { move: { name: 'quick-attack' } },
        { move: { name: 'iron-tail' } }
      ]
    };

    component.spriteKeys = ['front_default', 'back_default'];
    component.maxMovesToShow = 2;

    fixture.detectChanges();
  });

  it('should render Pokémon name, order, and image', () => {
    const name = fixture.debugElement.query(By.css('.main-info strong')).nativeElement;
    const order = fixture.debugElement.query(By.css('.main-info span')).nativeElement;
    const img = fixture.debugElement.query(By.css('.main-info img')).nativeElement;

    expect(name.textContent).toContain('pikachu');
    expect(order.textContent).toContain('25');
    expect(img.getAttribute('src')).toBe('url1');
  });

  it('should list sprite images based on spriteKeys', () => {
    const sprites = fixture.debugElement.queryAll(By.css('.sprites .sprite img'));
    expect(sprites.length).toBe(2);
    expect(sprites[0].nativeElement.getAttribute('src')).toBe('url1');
    expect(sprites[1].nativeElement.getAttribute('src')).toBe('url2');
  });

  it('should toggle move list with "ver más" and "ver menos"', () => {
    const initialMoves = fixture.debugElement.queryAll(By.css('span')).filter(el =>
      el.nativeElement.textContent.includes('thunderbolt') ||
      el.nativeElement.textContent.includes('quick-attack')
    );
    expect(initialMoves.length).toBe(2); // Mostrando 2 movimientos

    const button = fixture.debugElement.query(By.css('.ver-mas')).nativeElement;
    button.click();
    fixture.detectChanges();

    const expandedMoves = fixture.debugElement.queryAll(By.css('span')).filter(el =>
      el.nativeElement.textContent.includes('iron-tail')
    );
    expect(expandedMoves.length).toBeGreaterThan(0); 
  });
});
