import { Sequelize } from 'sequelize-typescript';
import { Pokemon } from '@modules/pokemons/infra/sequelize/entities/Pokemon';

/**
 * Cria uma conexao em memoria para executar os testes unitatios
 */
async function connectionInMemory() {
    const conection = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: true,
    });

    try {
        conection.authenticate();
        conection.addModels([Pokemon]);
        await conection.sync({ alter: true });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { connectionInMemory };
