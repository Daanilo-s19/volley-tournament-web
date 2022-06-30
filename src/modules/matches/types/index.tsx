import { genrerType } from "../../overview/types";

export interface Person {
  idLiga: string;
  nome: string;
  documento: string;
  genero: genrerType;
  dataNascimento: string;
  documentoCbv: string;
}

export interface PersonOutput extends Omit<Person, "dataNascimento"> {
  idade: number;
  id: string;
}

export type matchType =
  | "agendada"
  | "participantes_cadastrados"
  | "wo"
  | "concluida";
export interface MatchOutput {
  id: string;
  idDelegado: string;
  idGinasio: string;
  idEquipeMandante: string;
  idEquipeVisitante: string;
  status: matchType;
  dataComeco: string;
  dataFinalizacao: string;
  idEquipeGanhador: string;
  dataCriacao: string;
  dataAtualizacao: string;
  duracaoBruta: number;
  ganhadora: {
    id: string;
    idEquipe: string;
    idPartida: string;
    pontuacao: number;
    setsGanhos: number;
    resultadoCadastradoEm: string;
    pontosNosSets: number[];
    equipe: {
      id: string;
      nome: string;
      idLiga: string;
      idGinasio: string;
      quantidadeAtletas: number;
    };
    quantidadeAtletasEscalados: number;
  };
  tipoRodada: {};
  mandante: {
    id: string;
    idEquipe: string;
    idPartida: string;
    pontuacao: number;
    setsGanhos: number;
    resultadoCadastradoEm: string;
    pontosNosSets: number[];
    equipe: {
      id: string;
      nome: string;
      idLiga: string;
      idGinasio: string;
      quantidadeAtletas: number;
    };
    quantidadeAtletasEscalados: number;
  };
  visitante: {
    id: string;
    idEquipe: string;
    idPartida: string;
    pontuacao: number;
    setsGanhos: number;
    resultadoCadastradoEm: string;
    pontosNosSets: number[];
    equipe: {
      id: string;
      nome: string;
      idLiga: string;
      idGinasio: string;
      quantidadeAtletas: number;
    };
    quantidadeAtletasEscalados: number;
  };
}

type PositionType = "ponta" | "oposto" | "central" | "libero" | "levantador";
type WoType = "mandante" | "visitante";

export interface player {
  idAtleta: string;
  posicao: string;
}
export interface Referees {
  idArbitro: string;
  tipo: string;
}
export interface RegisterMatchInput {
  idLiga: string;
  idDelegado: string;
  arbitros: Referees[];
  atletasMandante: player[];
  atletasVisitante: player[];
  desistente: string;
}

export interface MatchResultInput {
  idMatch: string;
  setsMandante: number[];
  setsVisitante: number[];
}
