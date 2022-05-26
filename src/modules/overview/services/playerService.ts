import { ApiService } from "../../../services/service";
import { PlayerOutput } from "../types";

export default function PlayerService() {
  const fetchPlayers = async (id: string): Promise<PlayerOutput[]> => {
    try {
      const response = await ApiService.get(`/pessoa/atleta?idEquipe=${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createPlayer = async (
    input: Partial<PlayerOutput>
  ): Promise<PlayerOutput> => {
    try {
      const response = await ApiService.post("/pessoa/atleta", { ...input });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //   const searchTeam = async (id: string): Promise<TeamOutput> => {
  //     try {
  //       const response = await ApiService.get(`/equipe/${id}`);
  //       return response.data;
  //     } catch (error) {
  //       console.error(error);
  //       throw error;
  //     }
  //   };

  const updatePlayer = async (
    input: Partial<PlayerOutput>,
    id: string
  ): Promise<PlayerOutput> => {
    try {
      const response = await ApiService.patch(`/pessoa/atleta/${id}`, input);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deletePlayer = async (id: string): Promise<void> => {
    try {
      const response = await ApiService.delete(`/pessoa/atleta/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    fetchPlayers,
    createPlayer,
    updatePlayer,
    deletePlayer,
  };
}
