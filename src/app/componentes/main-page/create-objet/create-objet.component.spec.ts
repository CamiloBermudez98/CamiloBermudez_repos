import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateObjetComponent } from './create-objet.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('CreateObjetComponent', () => {
  let component: CreateObjetComponent;
  let fixture: ComponentFixture<CreateObjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateObjetComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: 25 }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateObjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a type when agregarTipo is called', () => {
    component.nuevoTipoControl.setValue('fire');
    component.agregarTipo();
    expect(component.tipos.length).toBe(1);
    expect(component.pokemonForm.get('types')!.value.length).toBe(1);
  });

  it('should remove a type when removeTipo is called', () => {
    const tipo = { type: { name: 'fire' } };
    component.tipos = [tipo];
    component.pokemonForm.get('types')!.setValue(component.tipos);
    component.removeTipo(tipo as any);
    expect(component.tipos.length).toBe(0);
  });

  it('should add a move when agregarmov is called', () => {
    component.nuevomovesControl.setValue('tackle');
    component.agregarmov();
    expect(component.Moves.length).toBe(1);
    expect(component.pokemonForm.get('moves')!.value.length).toBe(1);
  });

  it('should remove a move when removemov is called', () => {
    component.Moves = [{ move: { name: 'tackle' } }];
    component.pokemonForm.get('moves')!.setValue(component.Moves);
    component.removemov('tackle');
    expect(component.Moves.length).toBe(0);
  });

  it('should add a sprite when agregarsprite is called', () => {
    component.nuevospriteNameControl.setValue('front_default');
    component.nuevospritefuntionControl.setValue('https://url.com/sprite.png');
    component.agregarsprite();
    expect(component.sprites['front_default']).toBe('https://url.com/sprite.png');
    expect(Object.keys(component.pokemonForm.get('sprites')?.value || {}).length).toBe(1);
  });

  it('should remove a sprite when removeSprite is called', () => {
    component.sprites = { front_default: 'https://url.com/sprite.png' };
    component.pokemonForm.get('sprites')!.setValue(component.sprites);
    component.removeSprite('front_default');
    expect(component.sprites['front_default']).toBeUndefined();
    expect(Object.keys(component.pokemonForm.get('sprites')?.value || {}).length).toBe(0);
  });

  it('should call dialogRef.close with form value when guardar is called', () => {
    component.pokemonForm.get('name')!.setValue('charmander');
    component.pokemonForm.get('urlFrist')!.setValue('https://img.com/charmander.png');
    component.pokemonForm.get('sprites')!.setValue({});
    component.guardar();
    expect(component.dialogRef.close).toHaveBeenCalledWith(component.pokemonForm.value);
  });

  it('should call dialogRef.close when cancelar is called', () => {
    component.cancelar();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
