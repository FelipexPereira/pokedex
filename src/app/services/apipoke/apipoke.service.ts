import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypesApi } from '../../models/interfaces/apiDatas';

@Injectable({
  providedIn: 'root',
})
export class ApipokeService {
  public pesquisaPokemon: string = 'pikachu';
  public listaPokemons: Array<TypesApi> = [];
  public nameAtual: string = '';
  public infoPokemons: Array<any> = [];

  constructor(private HttpClient: HttpClient) {}

  public getPesquisaPokemon(param: any) {
    return this.HttpClient.get(
      `https://pokeapi.co/api/v2/pokemon/${this.pesquisaPokemon}`
    );
  }

  public getApiToda(param: any){
    return this.HttpClient.get(
      `https://pokeapi.co/api/v2/pokemon/`
    );
  }

  public getInfoPoke(param: any){
    return this.HttpClient.get(
      `https://pokeapi.co/api/v2/pokemon/${this.nameAtual}`
    );
  }
}
