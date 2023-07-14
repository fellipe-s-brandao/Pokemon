import { Pokemon } from '@modules/pokemons/infra/sequelize/entities/Pokemon';
import { Sequelize } from 'sequelize-typescript';

/**
 * O ideal seria deixar a variaveis de conexão no .env, 
 * mas para facilitar a visualizacao e testes vou deixar fixa
 */
async function conection() {

    try {
        const conection = new Sequelize({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'pokemon',
            username: 'admin',
            password: 'Admin#123@',
            logging: false
        });

        await conection.authenticate();

        conection.addModels([Pokemon]);
        await conection.sync({ alter: true });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default conection;