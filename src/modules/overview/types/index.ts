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
  tecnico: Coach;
}

export interface FetchTeamsOutput {
  teams: TeamOutput[];
}

export interface CreateTeamInput {
  nome: string;
  urlBrasao: string;
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
