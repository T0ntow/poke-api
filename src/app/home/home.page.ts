import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchName: string = 'pikachu';

  pokemonName: string = 'pikachu';
  pokemonId: number = 25;
  pokemonImage: string = '';
  pokemonDesc: string = '';
  pokemonHabitat: string = '';
  pokemonTypes: any[] = [];


  constructor() {
    // this.fetchPokemon('25');
    this.renderPokemon('25');
    this.getDesc('25');
  }

  async fetchPokemon(pokemon: string) {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;

    } else {
      this.pokemonId = 0;
      this.pokemonName = "Nada encontrado :(";
      this.pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/female/25.png';
    }

  }

  async getDesc(pokemon: string) {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);

    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    } else {
      this.pokemonDesc = "Nada encontrado :(";
    }
  }

  async renderPokemon(pokemon: string) {
    const data = await this.fetchPokemon(pokemon);
    const dataDesc = await this.getDesc(pokemon);
    this.pokemonTypes = [];

    if (data) {
      //dados principais
      this.pokemonName = data.name;
      this.pokemonId = data.id

      this.pokemonImage = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
      this.searchName = '';

      //dados descrição
      this.pokemonDesc = dataDesc['flavor_text_entries'][9]['flavor_text'];
      this.pokemonHabitat = dataDesc['habitat']['name']

      //pegar todos os tipos
      let types = data.types;

      for (let i = 0; i < types.length; i++) {
        let type = types[i]['type']['name'];
        this.pokemonTypes.push(type);
      }

    }
  }

  onSearchChange(): void {
    this.renderPokemon(this.searchName);
  }

  nextPokemon(pokemonId: number) {
    const nextId = pokemonId + 1;

    this.renderPokemon(nextId.toString());
  }

  prevPokemon(pokemonId: number) {
    const nextId = pokemonId - 1;

    if (nextId != 0) {
      this.renderPokemon(nextId.toString());
    }


  }

}
