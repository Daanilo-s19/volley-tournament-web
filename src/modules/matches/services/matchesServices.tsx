import { ApiService } from "../../../services/service";
import {
  PersonOutput,
  Person,
  MatchOutput,
  RegisterMatchInput,
} from "../types";
export default function MatchesService() {
  const fetchReferee = async (id: string) => {
    try {
      const response = await ApiService.get(`/pessoa/arbitro?idLiga=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchDelegate = async (id: string): Promise<PersonOutput[]> => {
    try {
      const response = await ApiService.get(`/pessoa/delegado?idLiga=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const createReferee = async (input: Person): Promise<PersonOutput> => {
    try {
      const response = await ApiService.post("/pessoa/arbitro", input);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const createDelegate = async (input: Person): Promise<PersonOutput> => {
    try {
      const response = await ApiService.post("/pessoa/delegado", input);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchMatchPerRound = async (
    idLiga: string,
    round: number | string
  ): Promise<MatchOutput[]> => {
    try {
      const response = await ApiService.get(
        `/partida?idLiga=${idLiga}&tipoRodada=${round}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const registerMatchParticipants = async (
    input: RegisterMatchInput
  ): Promise<MatchOutput> => {
    console.log("RegisterMatchInput", input);

    try {
      const response = await ApiService.post(
        `/partida/${input.idLiga}/cadastra-participantes`,
        {
          idDelegado: input.idDelegado,
          arbitros: input.arbitros,
          atletasMandante: input.atletasMandante,
          atletasVisitante: input.atletasVisitante,
          desistente: input.desistente,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchReferee,
    fetchDelegate,
    createDelegate,
    createReferee,

    fetchMatchPerRound,
    registerMatchParticipants,
  };
}
