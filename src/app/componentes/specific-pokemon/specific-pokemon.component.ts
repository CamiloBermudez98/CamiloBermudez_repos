import { Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-specific-pokemon',
  templateUrl: './specific-pokemon.component.html',
  styleUrls: ['./specific-pokemon.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class SpecificPokemonComponent {
  @Input() PokemonSelected : any = {}
  @Input() spriteKeys : any = {}
  showAllMoves: boolean = false;
  maxMovesToShow: number = 7;
  
 
}
