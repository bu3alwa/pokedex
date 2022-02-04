import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonClient, UtilityClient } from 'pokenode-ts';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor() { }

  ngOnInit(): void {
    this.listPokemon();
    // sort by order due to recieving api data in random order
    this.pokemons.sort((a, b) => { return a.order > b.order ? 1 : a.order < b.order ? 0: -1; });
  }


  async listPokemon(offset: number = 0, limit: number = 10) {
    const pokemonClient = new PokemonClient();
    const utilityClient = new UtilityClient();

    await pokemonClient.listPokemons(offset, limit).then(
      (data) => {
        data.results.forEach(async (pokemonApi) => (
          await utilityClient.getResourceByUrl(pokemonApi.url).then((pokemon: Pokemon) =>{
            this.pokemons.push(pokemon);
            console.log(pokemon);
          })
        ))
      })
      .then(
      (error) => {
        console.log(error);
      }
    )

  }
}
