import { SimplifiedTeam } from "../team";

type MatchStatus =
  | "agendada"
  | "participantes_cadastrados"
  | "wo"
  | "concluida";

interface MatchTeam {
  id: string;
  idEquipe: string;
  idPartida?: string;
  pontuacao: number;
  setsGanhos: number;
  resultadoCadastradoEm: string;
  pontosNosSets: number[];
  equipe: SimplifiedTeam;
  quantidadeAtletasEscalados: number;
}

interface Match {
  id: string;
  idDelegado?: string;
  idGinasio: string;
  idEquipeMandante: string;
  idEquipeVisitante: string;
  status: MatchStatus;
  dataComeco: string;
  dataFinalizacao?: string;
  idEquipeGanhador?: string;
  dataCriacao: string;
  dataAtualizacao: string;
  duracaoBruta: number;
  ganhadora: MatchTeam;
  tipoRodada: Record<string, unknown>;
  mandante: MatchTeam;
  visitante: MatchTeam;
  finalizada: boolean;
}

export type { MatchStatus, MatchTeam, Match };
