import { inject, injectable } from "tsyringe";
import { IPokemonsRepositoy } from "../repositories/IPokemonsRepository";
import { IRequestCreatePokemon, IRequestUpdatePokemon } from "./interfaces/IRequest";
import { IResponseBatalhaPokemon, IResponsePokemon } from "./interfaces/IResponse";
import { TIPO_POKEMON_CHARIZARD, TIPO_POKEMON_MEWTWO, TIPO_POKEMON_PIKACHU } from "@shared/utils/Constantes";
import { AppError } from "@shared/errors/AppError";
import { PokemonAttributes } from "../repositories/PokemonAttributes";

@injectable()
class PokemonsUseCases {
    constructor(
        @inject("PokemonsRepository")
        private pokemonsRepository: IPokemonsRepositoy
    ) { }

    async createPokemon({ tipo, treinador }: IRequestCreatePokemon): Promise<IResponsePokemon> {
        if (tipo != TIPO_POKEMON_CHARIZARD && tipo != TIPO_POKEMON_MEWTWO && tipo != TIPO_POKEMON_PIKACHU) {
            throw new AppError("Tipo do pokemon informado não é válido!")
        }

        const pokemon = await this.pokemonsRepository.create({ tipo, treinador, nivel: 1 });

        return {
            id: pokemon.id,
            tipo: pokemon.tipo,
            treinador: pokemon.treinador,
            nivel: pokemon.nivel
        };
    }

    async updatePokemon({ id, treinador }: IRequestUpdatePokemon): Promise<boolean> {
        if(! treinador) {
            throw new AppError("Informe o nome do treinador!")
        }

        const pokemon = await this.pokemonsRepository.findById(id);

        if (!pokemon) {
            throw new AppError("Pokemon não encontrado!", 404)
        }

        const pokemonIsAlreadyUpdate = await this.pokemonsRepository.update(id, {treinador});

        if(!pokemonIsAlreadyUpdate.length) {
            throw new AppError("Erro ao atualizar os dados!", 500);
        }

        return true;
    }

    async deletePokemon(id: number): Promise<boolean> {
        const pokemon = await this.pokemonsRepository.findById(id);

        if (!pokemon) {
            throw new AppError("Pokemon não encontrado!", 404)
        }

        const pokemonIsAlreadyDelete = await this.pokemonsRepository.delete(id);

        if(!pokemonIsAlreadyDelete) {
             throw new AppError("Erro ao deletar os dados!", 500);
        }

        return true;
    }

    async findPokemon(id: number): Promise<IResponsePokemon> {
        const pokemon = await this.pokemonsRepository.findById(id);

        if (!pokemon) {
            throw new AppError("Pokemon não encontrado!", 404)
        }

        return pokemon;
    }

    async findAllPokemons(): Promise<IResponsePokemon[]> {
        const pokemons = this.pokemonsRepository.findAll();
        return pokemons;
    }

    async batalhar(idPokemon1: number, idPokemon2: number): Promise<IResponseBatalhaPokemon> {
        if(!idPokemon1 && !idPokemon2) {
            throw new AppError("Informe o id dos pokemons");
        }

        const pokemon1 = await this.pokemonsRepository.findById(idPokemon1);

        if (!pokemon1) {
            throw new AppError("O primeiro Pokemon informado não foi encontrado!", 404);
        }

        const pokemon2 = await this.pokemonsRepository.findById(idPokemon2);

        if (!pokemon2) {
            throw new AppError("O segundo Pokemon informado não foi encontrado!", 404);
        }

        // Calcula a probabilidade de vitória do pokemon com nível maior
        const totalNiveis = pokemon1.nivel + pokemon2.nivel;
        const probabilidade1 = pokemon1.nivel / totalNiveis;

        const vencedor = Math.random() < probabilidade1 ? pokemon1 : pokemon2;
        const perdedor = vencedor === pokemon1 ? pokemon2 : pokemon1;

        // Ajusta os níveis do vencedor e do perdedor
        vencedor.nivel++;
        perdedor.nivel--;

        if(perdedor.nivel === 0) {
            await this.pokemonsRepository.delete(perdedor.id);
        } else {
            await this.pokemonsRepository.update(perdedor.id, { nivel: perdedor.nivel });
        }

        await this.pokemonsRepository.update(vencedor.id, { nivel: vencedor.nivel });

        return {
            vencedor,
            perdedor
        }
    }

}

export { PokemonsUseCases }