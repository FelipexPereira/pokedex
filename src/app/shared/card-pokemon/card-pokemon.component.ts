import { ApipokeService } from './../../services/apipoke/apipoke.service';
import { Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Final, NameApi, TypesApi } from '../../models/interfaces/apiDatas';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss'],
})
export class CardPokemonComponent implements OnInit {
  public nameForm!: FormGroup;
  //
  public id: string = '';
  public name: string = '';
  public tipo: Array<TypesApi> = [];
  public tipos: Array<TypesApi> = [];
  public img: string = '';
  public listaPokemons: Array<NameApi> = [];
  public final: Array<Final> = [];

  //
  constructor(
    public httpClient: HttpClient,
    private apipoke: ApipokeService,
    private formBuilder: FormBuilder
  ) {}
  //
  ngOnInit(): void {
    this.getPoke();
    this.nameForm = this.formBuilder.group({
      namePoke: [''],
    });
    this.getApiToda();
    this.getInfo();
    console.log('TESTANDO', this.final);
  }
  //

  public getNamePoke() {
    this.apipoke.pesquisaPokemon = this.nameForm.controls['namePoke'].value;
    this.getPoke();
  }
  //
  public getApiToda() {
    this.apipoke.getApiToda({}).subscribe({
      next: (data: any) => {
        this.listaPokemons = data.results.map((resultado: any) => {
          return { value: resultado.name };
        });
        // console.log('listaPokemons', this.listaPokemons);
      },
    });
  }

  //
  public getPoke() {
    //
    this.apipoke.getPesquisaPokemon({}).subscribe({
      next: (data: any) => {
        console.log('DATA', data);

        this.id = data.id;
        this.name = data.species.name;
        this.tipo = data.types;
        this.img = data.sprites.other['official-artwork'].front_default;
      },
      error: (err) => {
        console.error('Error fetching Pokémon data:', err);
      },
    });
  }

  public getInfo() {
    for (let index = 0; index < this.listaPokemons.length; index++) {
      const nome = this.listaPokemons[index].value;
      // console.log('DEU CERTO?', nome);

      this.apipoke.nameAtual = nome;
      // console.log('ATUAL', this.apipoke.nameAtual);

      this.apipoke.getInfoPoke({}).subscribe({
        next: (data: any) => {
          this.id = data.id;
          this.name = data.species.name;
          // this.tipo = data.types;
          this.tipo = data.types;
          this.img = data.sprites.other['official-artwork'].front_default;
          // console.log('tipo', this.final);
          this.final.push({
            id: this.id,
            nome: this.name,
            img: this.img,
          });
          this.tipos.push(
            {type: {name:}}
          );
          console.log('TIPOS',this.tipos)
          console.log('TIPO',this.tipo)
        },
        error: (err) => {
          console.error('Error fetching Pokémon data:', err);
        },
      });
    }
  }
}
