import { Component } from '@angular/core';
import { forkJoin, Observable, of, tap } from 'rxjs';
import { PokemonsApiService } from 'src/app/service/pokemons-api.service';
import { CreateObjetComponent } from './create-objet/create-objet.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent {
 
  constructor(public pokemonsApiService:PokemonsApiService,  public dialog: MatDialog) 
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
    
  const requests = [];
  for (let i = 1; i <= 151; i++) {
    requests.push(this.pokemonsApiService.GetPokemonID(i));
  }
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
  AddPokemon() {
    const dialogRef = this.dialog.open(CreateObjetComponent, {
      width: '800px',
      panelClass: 'custom-dialog-container',
      data:this.totalItems
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result ){
        this.pokemonsList.push(result)
        this.dataPokemons = of(this.pokemonsList);
        this.dataPokemons.subscribe((res) => {
        this.pokemonsList = res;
        this.totalItems = this.pokemonsList.length
      
  });

        }

    });

  }

}
