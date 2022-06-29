export type StatisticsOutput = {
    idAtleta: string,
    quantidadeVotos: 0,
    atleta: Athletes
}

type Athletes = {
    id: string,
    numero: 0,
    idEquipe: string,
    idPessoa: string,
    nome: string,
    documento: string,
    genero: "masculino" | "feminino",
    idade: 0,
    documentoCbv: string
}