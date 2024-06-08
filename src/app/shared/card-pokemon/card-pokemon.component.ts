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
  public tipos: Array<any> = [];
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
    // this.getPoke();

    this.nameForm = this.formBuilder.group({
      namePoke: [''],
    });

    this.getApiToda();

    this.getInfo();

    console.log('TESTANDO', this.final);
    console.log('TIPOS', this.tipos)
  }
  //

  public getNamePoke() {
    this.apipoke.pesquisaPokemon = this.nameForm.controls['namePoke'].value;
  }
  //
  public getApiToda() {
    this.apipoke.getApiToda({}).subscribe({
      next: (data: any) => {
        this.listaPokemons = data.results.map((resultado: any) => {
          return { value: resultado.name };
        });
        console.log('listaPokemons', this.listaPokemons);
      },
    });
  }

  public getInfo() {
    for (let index = 0; index < this.listaPokemons.length; index++) {
      const nome = this.listaPokemons[index].value;
      // console.log(nome, 'NOME');
      // console.log('ATUAL', this.apipoke.nameAtual);

      this.apipoke.getInfoPoke(nome).subscribe({
        next: (data: any) => {
          this.final.push({
            id: data.id,
            nome: data.species.name,
            img: data.sprites.other['official-artwork'].front_default,
            tipe: data.types,
          });

          this.tipos.push({
            tipo: data.types
          })
        },
        error: (err) => {
          console.error('Error fetching Pokémon data:', err);
        },
      });
    }
  }
}
