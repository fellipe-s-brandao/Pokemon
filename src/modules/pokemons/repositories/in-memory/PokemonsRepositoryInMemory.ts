import { ICreatePokemonDTO } from "@modules/pokemons/dtos/ICreatePokemonDTO";
import { IUpdatePokemonDTO } from "@modules/pokemons/dtos/IUpdatePokemonDTO";
import { IPokemonsRepositoy } from "../IPokemonsRepository";
import { PokemonAttributes } from "../PokemonAttributes";

class PokemonsRepositoryInMemory implements IPokemonsRepositoy {
    pokemons:  PokemonAttributes[] = [];

    async create(data: ICreatePokemonDTO): Promise<PokemonAttributes> {
        const pokemon: PokemonAttributes = {
            id: this.pokemons.length + 1,
            tipo: data.tipo,
            treinador: data.treinador,
            nivel: data.nivel 
        };

        this.pokemons.push(pokemon);

        return pokemon;
    }

    async update(id: number, data: IUpdatePokemonDTO): Promise<number[]> {
        const index = this.pokemons.findIndex(p => p.id === id);

        this.pokemons[index] = {
            ...this.pokemons[index],
            ...data,
        }

        return [ 1 ];
    }

    async delete(id: number): Promise<number> {
        const index = this.pokemons.findIndex(p => p.id === id);
        this.pokemons.splice(index, 1);

        return 1;
    }

    async findById(id: number): Promise<PokemonAttributes> {
        return this.pokemons.find(pokemon => pokemon.id === id);
    }

    async findAll(): Promise<PokemonAttributes[]> {
        return this.pokemons;
    }
}

export { PokemonsRepositoryInMemory }