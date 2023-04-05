export interface IResponsePokemon {
    id: number,
    tipo: string,
    treinador: string,
    nivel: number
}

export interface IResponseBatalhaPokemon {
    vencedor: IResponsePokemon,
    perdedor: IResponsePokemon
}