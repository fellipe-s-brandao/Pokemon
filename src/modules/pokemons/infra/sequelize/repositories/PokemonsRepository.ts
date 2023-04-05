import { ICreatePokemonDTO } from "@modules/pokemons/dtos/ICreatePokemonDTO";
import { IPokemonsRepositoy } from "@modules/pokemons/repositories/IPokemonsRepository";
import { Pokemon } from "../entities/Pokemon";
import { Repository } from "sequelize-typescript";
import { IUpdatePokemonDTO } from "@modules/pokemons/dtos/IUpdatePokemonDTO";
import { Sequelize } from "sequelize";
import { PokemonAttributes } from "../../../repositories/PokemonAttributes";

class PokemonsRepository implements IPokemonsRepositoy {
    private repository: Repository<Pokemon>

    constructor() {
        this.repository = Pokemon;
    }

    async create(data: ICreatePokemonDTO): Promise<PokemonAttributes> {
        const pokemon = await this.repository.create(data);
        return pokemon ? pokemon : null;
    }

    async update(id: number, data: IUpdatePokemonDTO): Promise<number[]> {
        const pokemon = this.repository.update(data, {
            where: {
                id
            }
        });

        return pokemon ;
    }

    async delete(id: number): Promise<number> {
        return await this.repository.destroy({
            where: {
                id
            }
        });
    }

    async findById(id: number): Promise<PokemonAttributes> {
        const pokemon = await this.repository.findByPk(id, {
            attributes: ['id', 'tipo', 'treinador', 'nivel']
        });
        return pokemon ? pokemon : null;
    }

    async findAll(): Promise<PokemonAttributes[]> {
        const pokemons = await this.repository.findAll({
            attributes:  ['id', 'tipo', 'treinador', 'nivel']
        });
        return pokemons;
    }
}

export { PokemonsRepository }