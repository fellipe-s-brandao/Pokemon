import { Request, Response } from "express";
import { container } from "tsyringe";
import { PokemonsUseCases } from "./PokemonsUseCases";

class PokemonsController {

    async createPokemon(request: Request, response: Response): Promise<Response> {
        const { tipo, treinador } = request.body;

        const pokemonsUseCase = container.resolve(PokemonsUseCases);
        const pokemon = await pokemonsUseCase.createPokemon({ tipo, treinador });

        return response.json(pokemon);
    }

    async updatePokemon(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { treinador } = request.body;

        const idNumeber = Number(id);

        const pokemonsUseCase = container.resolve(PokemonsUseCases);
        await pokemonsUseCase.updatePokemon({ id: idNumeber, treinador });

        return response.status(204).send();
    }

    async deletePokemon(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const idNumeber = Number(id);

        const pokemonsUseCase = container.resolve(PokemonsUseCases);
        await pokemonsUseCase.deletePokemon(idNumeber);

        return response.status(204).send();
    }

    async findAllPokemons(request: Request, response: Response): Promise<Response> {
        const pokemonsUseCase = container.resolve(PokemonsUseCases);
        const pokemons = await pokemonsUseCase.findAllPokemons();

        return response.json(pokemons);
    }

    async findPokemon(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const idNumeber = Number(id);

        const pokemonsUseCase = container.resolve(PokemonsUseCases);
        const pokemons = await pokemonsUseCase.findPokemon(idNumeber);

        return response.json(pokemons);
    }

    async batalhar(request: Request, response: Response): Promise<Response> {
        const { id1, id2 } = request.params;
        const idNumeber1 = Number(id1);
        const idNumeber2 = Number(id2);

        const pokemonsUseCase = container.resolve(PokemonsUseCases);
        const pokemons = await pokemonsUseCase.batalhar(idNumeber1, idNumeber2);

        return response.json(pokemons);
    }
}

export { PokemonsController }