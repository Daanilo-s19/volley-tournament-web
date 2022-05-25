type genrerType = "masculino" | "feminino";
type roleType = "tecnico" | "";

export interface Coach {
  documentoCref: string;
  idEquipe: string;
  pessoa: {
    nome: string;
    documento: string;
    genero: genrerType;
    idade: number;
    documentoCbv: string;
    tipo: roleType;
    id: string;
    dataAtualizacao: string;
    dataCriacao: string;
  };
}

export interface TeamOutput {
  id: string;
  nome: string;
  equipe: string;
  urlBrasao: string;
  apta: boolean;
  descricaoAptidao: Object;
  dataAtualizacao: string;
  dataCriacao: string;
  cidade: string;
  estado: string;
  idLiga: string;
  idGinasio: string;
  quantidadeAtletas: number;
}

export interface FetchTeamsOutput {
  teams: TeamOutput[];
}

export interface CreateTeamInput {
  idLiga: string;
  idGinasio: string;
  nome: string;
  urlBrasao: string;
  cidade: string;
  estado: string;
}

export interface CreateCoachVariables {
  documentoCref: string;
  idEquipe: string;
  nome: string;
  documento: string;
  genero: genrerType;
  idade: number;
  documentoCbv: string;
}

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

export interface CreateStadiumInput {
  nome: string;
  cidade: string;
  estado: string;
}
export interface CreateStadiumOutput {
  nome: string;
  cidade: string;
  estado: string;
  id: string;
  dataAtualizacao: string;
  dataCriacao: string;
}

export interface FormType {
  nome: any;
  nameTeam: string;
  urlLogo: string;
  nameStadium: string;
  city: string;
  state: string;
}
