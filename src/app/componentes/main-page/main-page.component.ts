import { Component } from '@angular/core';
import { forkJoin, Observable, tap } from 'rxjs';
import { PokemonsApiService } from 'src/app/service/pokemons-api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent {
  constructor(public pokemonsApiService:PokemonsApiService) 
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
  getPokemon()
  {
    
  const requests = [];
  for (let i = 1; i <= 151; i++) {
    requests.push(this.pokemonsApiService.GetPokemonID(i));
  }
  this.dataPokemons = forkJoin(requests);

}

selectPokemon(item:any){
  this.PokemonSelected = item
  this.spriteKeys = Object.keys(this.PokemonSelected.sprites).filter(
    (key) =>
      this.PokemonSelected.sprites[key] &&
      key !== 'other' &&
      key !== 'versions'
  );
  console.log(item)
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


}
