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

export interface LeagueClassificationOutput {
  idEquipe: string;
  setsGanhos: number;
  setsPerdidos: number;
  setsDisputados: number;
  partidasGanhas: number;
  partidasPerdidas: number;
  partidasDisputadas: number;
  pontuacao: number;
  pontosAverage: number;
  setsAverage: number;
  equipe: {
    id: string;
    nome: string;
    urlBrasao: string;
    apta: boolean;
    descricaoAptidao: string[];
    cidade: string;
    estado: string;
    idLiga: string;
    idGinasio: string;
    tecnico: {
      id: string;
      documentoCref: string;
      idEquipe: string;
      nome: string;
      documento: string;
      genero: "feminino" | "masculino";
      idade: number;
      documentoCbv: string;
    };
    quantidadeAtletas: number;
    quantidadeAuxiliares: number;
    atletas: [
      {
        id: string;
        numero: number;
        idEquipe: string;
        nome: string;
        documento: string;
        genero: "feminino" | "masculino";
        idade: number;
        documentoCbv: string;
      }
    ];
    auxiliares: [
      {
        id: string;
        idEquipe: string;
        documentoCref: string;
        tipoAuxiliar: string;
        nome: string;
        documento: string;
        genero: "feminino" | "masculino";
        idade: number;
        documentoCbv: string;
      }
    ];
  };
}
