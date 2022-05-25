import { Gender } from ".";

interface Coach {
  id: string;
  documentoCref: string;
  idEquipe: string;
  nome: string;
  documento: string;
  genero: Gender;
  idade: number;
  documentoCbv: string;
}

export type { Coach };
