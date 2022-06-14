export interface CreateLeagueOutput {
  id: string;
  genero: string;
  iniciadaEm: string;
  nome: string;
  serie: string;
}

export interface LeagueOutput {
  id: string;
  genero: string;
  iniciadaEm: string;
  nome: string;
  serie: string;
}
export type DayType =
  | "Segunda"
  | "Terça"
  | "Quarta"
  | "Quinta"
  | "Sexta"
  | "Sábado"
  | "Domingo";

export type InitilizeType =
  | "inicializa"
  | "inicializa-quartas"
  | "inicializa-semis"
  | "inicializa-final";
export interface InitLeagueInput {
  data: string;
  diasDaSemana: DayType[];
  horarios: number[];
  intervaloDeDiasUteisEntreTurnos: number;
}
