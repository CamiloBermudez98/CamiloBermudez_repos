import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPokemonComponent } from './specific-pokemon.component';

describe('SpecificPokemonComponent', () => {
  let component: SpecificPokemonComponent;
  let fixture: ComponentFixture<SpecificPokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificPokemonComponent]
    });
    fixture = TestBed.createComponent(SpecificPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
