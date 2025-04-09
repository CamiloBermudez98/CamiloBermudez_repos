import { Component, ViewEncapsulation } from '@angular/core';
import { forkJoin, Observable, of, tap } from 'rxjs';
import { PokemonsApiService } from 'src/app/service/pokemons-api.service';
import { CreateObjetComponent } from './create-objet/create-objet.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent {
 
  constructor(public pokemonsApiService:PokemonsApiService,  public dialog: MatDialog,private snackBar: MatSnackBar) 
    {
      this.getPokemon()
      
     }
    dataPokemons: Observable<any> = new Observable<any>()
    colors = ['green', 'orange', 'pink', 'gray'];
    currentPage = 0;
    itemsPerPage = 4;
    totalItems = 151
    searchTerm:string =""
    PokemonSelected:any={}
    spriteKeys: string[] = [];
    pokemonsList: any[] = []
  getPokemon()
  {
    
  

  const requests = Array.from({ length: 151 }, (_, i) =>
    this.pokemonsApiService.GetPokemonID(i + 1)
  ).filter(Boolean);
  this.dataPokemons = forkJoin(requests);
  this.dataPokemons.subscribe((res) => {
    this.pokemonsList = res;
    this.totalItems = this.pokemonsList.length
  });
}

selectPokemon(item:any){
  this.PokemonSelected = item
  this.spriteKeys = Object.keys(this.PokemonSelected.sprites).filter(
    (key) =>
      this.PokemonSelected.sprites[key] &&
      key !== 'other' &&
      key !== 'versions'
  );
}

nextPage(totalItems: number): void {
  if ((this.currentPage + 1) * this.itemsPerPage < totalItems) {
    this.currentPage++;
  }
}

prevPage(): void {
  if (this.currentPage > 0) {
    this.currentPage--;
  }}

getMissingOrder(): number | null {
  const orders = this.pokemonsList.map(p => p.order).sort((a, b) => a - b);
  for (let i = 0; i < orders.length; i++) {
    if (orders[i] !== i + 1) {
      return i + 1;
    }
  }
  return null; 
}

AddPokemon() {
  const faltante = this.getMissingOrder()
    const dialogRef = this.dialog.open(CreateObjetComponent, {
      width: '800px',
      panelClass: 'custom-dialog-container',
      data:faltante
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {
        this.pokemonsList.push(result);
        this.dataPokemons = of(this.pokemonsList);
        this.dataPokemons.subscribe((res) => {
          this.pokemonsList = res;
          this.totalItems = this.pokemonsList.length;
      
          // Mostrar toast
          this.snackBar.open('¡Pokémon agregado con éxito!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          });
        });
      }
    });
  }

}
