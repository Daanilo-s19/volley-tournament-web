import { Position } from "../game";
import { Gender } from "../person";
import { Assistant } from "../person/assistant";
import { Coach } from "../person/coach";

interface Team {
  id: string;
  nome: string;
  urlBrasao: string;
  apta: true;
  descricaoAptidao: string[];
  cidade: string;
  estado: string;
  idLiga: string;
  idGinasio: string;
  tecnico: Coach;
  quantidadeAtletas: 0;
  quantidadeAuxiliares: 0;
  atletas: [
    {
      id: string;
      numero: 0;
      idEquipe: string;
      posicao: Position;
      nome: string;
      documento: string;
      genero: Gender;
      idade: 0;
      documentoCbv: string;
    }
  ];
  auxiliares: Assistant[];
}

export type { Team };
