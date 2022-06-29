export type StatisticsOutput = {
    idAtleta: string,
    quantidadeVotos: 0,
    atleta: Athletes
    equipe: Teams
}

export type GeneralStatisticsOutput =  {
    idAtleta: string,
    bloqueios: 0,
    recepcoes: 0,
    aces: 0,
    saques: 0,
    ataques: 0,
    pontos: 0,
    levantamentos: 0,
    assistencias: 0,
    atleta: {
      nome: string,
      numero: string,
      id: string
    },
    equipe: {
      nome: string,
      id: string
    }
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

type Teams = {
    id: string,
    nome: string,
    idLiga: string,
    idGinasio: string,
    quantidadeAtletas: 0
}