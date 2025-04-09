import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class PokemonsApiService {
  ApiURL: string = "";
  constructor(private http: HttpClient) {
    this.ApiURL = environment.PokemonURL
   }

  public GetPokemon(): Observable<any>{
    return this.http.get(this.ApiURL);
}

public GetPokemonID(UrlPokemon:number): Observable<any>{
  return this.http.get(this.ApiURL+UrlPokemon);
}
}
