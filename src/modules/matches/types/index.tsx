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
