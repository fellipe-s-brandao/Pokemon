import { ICreatePokemonDTO } from "../dtos/ICreatePokemonDTO";
import { IUpdatePokemonDTO } from "../dtos/IUpdatePokemonDTO";
import { PokemonAttributes } from "./PokemonAttributes";

interface IPokemonsRepositoy {
    create(data: ICreatePokemonDTO): Promise<PokemonAttributes>
    update(id: number, data: IUpdatePokemonDTO): Promise<number[]>,
    delete(id: number): Promise<number>,
    findById(id: number): Promise<PokemonAttributes>,
    findAll(): Promise<PokemonAttributes[]>
}

export { IPokemonsRepositoy }