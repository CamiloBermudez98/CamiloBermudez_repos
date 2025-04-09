import { Component, Inject } from '@angular/core';
import { MainPageComponent } from '../main-page.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

function objectNotEmptyValidator(control: AbstractControl) {
  return control.value && Object.keys(control.value).length > 0
    ? null
    : { emptyObject: true };
}
@Component({
  selector: 'app-create-objet',
  templateUrl: './create-objet.component.html',
  styleUrls: ['./create-objet.component.sass']
})

export class CreateObjetComponent {
 
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<MainPageComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit( ) {
    
  }
  separatorKeysCodes: number[] = [ENTER, COMMA];
  sprites: { [key: string]: string } = {}
  tipos: any = [];
  Moves: any = [];
  objectKeys = Object.keys;

  pokemonForm = this.fb.group({
    name: ['', Validators.required],
    order:[this.data],
    urlFrist: ['', Validators.required],
    types: this.fb.control<any>([], Validators.required),
    height: [''],
    sprites: this.fb.control<{ [key: string]: string }>({}, objectNotEmptyValidator),
    moves:this.fb.control<any>([], Validators.required)
  });
  nuevoTipoControl = this.fb.control('');
  nuevomovesControl = this.fb.control('');
  nuevospritefuntionControl = this.fb.control('');
  nuevospriteNameControl = this.fb.control('');

  onlyNumberInput(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }
 
 agregarTipo(): void {
  const value = this.nuevoTipoControl.value?.trim().toLowerCase();
  if (value && !this.tipos.includes(value)) {
    this.tipos.push({type:{name:value}});
    this.pokemonForm.get('types')?.setValue(this.tipos);
  }
  this.nuevoTipoControl.setValue('');
}

removeTipo(tipo: string): void {
  const index = this.tipos.indexOf(tipo);
  if (index >= 0) {
    this.tipos.splice(index, 1);
    this.pokemonForm.get('types')?.setValue(this.tipos);
  }
}

agregarmov(): void {
 const value = this.nuevomovesControl.value?.trim().toLowerCase();
 if (value && !this.Moves.includes(value)) {
   this.Moves.push({move:{name:value}});
   this.pokemonForm.get('moves')?.setValue(this.Moves);
 }
 this.nuevomovesControl.setValue('');
}


removemov(nombre: string): void {
  const index = this.Moves.findIndex((m: any) => m.move.name === nombre);
  if (index >= 0) {
    this.Moves.splice(index, 1);
    this.pokemonForm.get('moves')?.setValue(this.Moves);
  }
}

agregarsprite(): void {
  const key = this.nuevospriteNameControl.value?.trim().toLowerCase();
  const url = this.nuevospritefuntionControl.value?.trim();
  if (key && url && !this.sprites[key]) {
    console.log("sprite agregado")
    this.sprites[key] = url;
    this.pokemonForm.get('sprites')?.setValue(this.sprites);
  }
this.nuevospriteNameControl.setValue('');
this.nuevospritefuntionControl.setValue('');
}

removeSprite(keyToRemove: string): void {
  delete this.sprites[keyToRemove];
  this.pokemonForm.get('sprites')?.setValue(this.sprites);
}

guardar(){
  const key = "front_default";
  let value: any = this.pokemonForm.get('urlFrist')?.value;
  this.sprites[key] = value
  this.dialogRef.close(this.pokemonForm.value);
}
cancelar() {
  this.dialogRef.close();
}

}
