import { Gender } from "../person";

interface League {
  ano: number;
  dataComeco: string;
  estado: string;
  genero: Gender;
  id: string;
  nome: string;
  serie: string;
}

export type { League };
