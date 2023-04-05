import { Model, Column, Table, DataType } from 'sequelize-typescript';
import { PokemonAttributes } from '../../../repositories/PokemonAttributes';



@Table({ tableName: 'pokemons' })
export class Pokemon extends Model<PokemonAttributes> implements PokemonAttributes {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: 'id'
    })
    id: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
        field: 'tipo'
    })
    tipo!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
        field: 'treinador'
    })
    treinador!: string;

    @Column({
        type: DataType.INTEGER(),
        allowNull: true,
        field: 'nivel'
    })
    nivel!: number


}