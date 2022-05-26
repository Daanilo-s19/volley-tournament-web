import { Gender } from ".";

type AssistantType =
  | "assistente_medico"
  | "auxiliar_tecnico"
  | "preparador_fisico"
  | "fisioterapeuta"
  | "medico"
  | "massagista";

interface Assistant {
  id: string;
  idEquipe: string;
  documentoCref: string;
  tipoAuxiliar: AssistantType;
  nome: string;
  documento: string;
  genero: Gender;
  idade: number;
  documentoCbv: string;
}

export type { Assistant, AssistantType };
