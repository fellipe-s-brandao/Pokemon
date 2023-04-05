import { PokemonsRepository } from '@modules/pokemons/infra/sequelize/repositories/PokemonsRepository';
import { IPokemonsRepositoy } from '@modules/pokemons/repositories/IPokemonsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IPokemonsRepositoy>(
    "PokemonsRepository",
    PokemonsRepository
)