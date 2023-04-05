import 'reflect-metadata';
import { PokemonsRepositoryInMemory } from "../repositories/in-memory/PokemonsRepositoryInMemory";
import { PokemonsUseCases } from "./PokemonsUseCases";
import { AppError } from '@shared/errors/AppError';

let pokemonsUseCases: PokemonsUseCases;
let pokemonsRepositoryInMemory: PokemonsRepositoryInMemory;

describe("Pokemons Use Cases", () => {

    beforeEach(() => {
        pokemonsRepositoryInMemory = new PokemonsRepositoryInMemory();
        pokemonsUseCases = new PokemonsUseCases(pokemonsRepositoryInMemory);
    });

    it("Should be able to create a new pokemon", async () => {
        const pokemon = {
            tipo: "pikachu",
            treinador: "fellipe"
        };

        let pokemonCreated = await pokemonsUseCases.createPokemon(pokemon);

        expect(pokemonCreated).toHaveProperty("id");
    });

    it("Not Should be able to create a new pokemon with different type of pikachu, charizard and mewtwo", async () => {
        expect( pokemonsUseCases.createPokemon({
            tipo: 'tipo_qualquer',
            treinador: 'fellipe'
        })
        ).rejects.toEqual(new AppError("Tipo do pokemon informado não é válido!"));
    });

    it("Should be able to update a pokemon", async () => {
        const pokemon = {
            tipo: "pikachu",
            treinador: "fellipe"
        };

        const pokemonCreated = await pokemonsUseCases.createPokemon(pokemon);
        const pokemonUpdated = await pokemonsUseCases.updatePokemon({ id: pokemonCreated.id, treinador: 'thiago'});

        expect(pokemonUpdated).toEqual(true);
    });

    it("Not Should be able to update a pokemon without passing the name of the trainer", async () => {
        const pokemon = {
            tipo: "pikachu",
            treinador: "fellipe"
        };

        const pokemonCreated = await pokemonsUseCases.createPokemon(pokemon);

        expect(pokemonsUseCases.updatePokemon(
            { id: pokemonCreated.id, treinador: null}
        )
        ).rejects.toEqual(new AppError("Informe o nome do treinador!", 400));
    });

    it("Not Should be able to update a pokemon when it is not found", async () => {
        expect(pokemonsUseCases.updatePokemon(
            { id: 2, treinador: "fellipe"}
        )
        ).rejects.toEqual(new AppError("Pokemon não encontrado!", 404));
    });

    it("It should be able to delete a pokemon", async () => {
        const pokemon = {
            tipo: "pikachu",
            treinador: "fellipe"
        };

        const pokemonCreated = await pokemonsUseCases.createPokemon(pokemon);
        const pokemonDeleted = await pokemonsUseCases.deletePokemon(pokemonCreated.id);

        expect(pokemonDeleted).toEqual(true);
    });

    it("Not Should be able to delete a pokemon when it is not found", async () => {
        expect(pokemonsUseCases.deletePokemon(5)
        ).rejects.toEqual(new AppError("Pokemon não encontrado!", 404));
    });

    it("It should be able to find a pokemon", async () => {
        const pokemon = {
            tipo: "pikachu",
            treinador: "fellipe"
        };

        const pokemonCreated = await pokemonsUseCases.createPokemon(pokemon);
        const pokemonFound = await pokemonsUseCases.findPokemon(pokemonCreated.id);

        expect(pokemonFound).toEqual(pokemonCreated);
    });

    it("Not Should be able to find a pokemon when it is not found", async () => {
        expect(pokemonsUseCases.findPokemon(5)
        ).rejects.toEqual(new AppError("Pokemon não encontrado!", 404));
    });

    it("It should be able find all pokemons", async () => {
        const pokemon1 = {
            tipo: "pikachu",
            treinador: "fellipe"
        };

        const pokemon2 = {
            tipo: "charizard",
            treinador: "thiago"
        };

        await pokemonsUseCases.createPokemon(pokemon1);
        await pokemonsUseCases.createPokemon(pokemon2);

        const pokemons = await pokemonsUseCases.findAllPokemons();

        expect(pokemons).toHaveLength(2);
    });

    it("It should be able to battle two pokemons and one pokemon will win", async () => {
        const pokemon1 = {
            tipo: "pikachu",
            treinador: "fellipe"
        };

        const pokemon2 = {
            tipo: "charizard",
            treinador: "thiago"
        };

        const pokemon1Created = await pokemonsUseCases.createPokemon(pokemon1);
        const pokemon2Created = await pokemonsUseCases.createPokemon(pokemon2);
        const result = await pokemonsUseCases.batalhar(pokemon1Created.id, pokemon2Created.id);

        expect(result.vencedor.nivel).toEqual(2);
    });

    it("It should be able to battle two pokemons and the loser with level 0 is deleted", async () => {
        const pokemon1 = {
            tipo: "pikachu",
            treinador: "fellipe"
        };

        const pokemon2 = {
            tipo: "charizard",
            treinador: "thiago"
        };

        const pokemon1Created = await pokemonsUseCases.createPokemon(pokemon1);
        const pokemon2Created = await pokemonsUseCases.createPokemon(pokemon2);
        const result = await pokemonsUseCases.batalhar(pokemon1Created.id, pokemon2Created.id);

        expect(pokemonsUseCases.findPokemon(result.perdedor.id)
        ).rejects.toEqual(new AppError("Pokemon não encontrado!", 404));
    });
})