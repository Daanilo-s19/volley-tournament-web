import axios from "axios";
import { ApiService } from "../../../services/service";
import {
  CreateLeagueOutput,
  InitilizeType,
  InitLeagueInput,
  LeagueClassificationOutput,
  LeagueOutput,
} from "../types/leagueType";

export default function LeagueService() {
  const fetchLeague = async (): Promise<CreateLeagueOutput[]> => {
    try {
      const response = await ApiService.get("/liga");
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const createLeague = async (input: LeagueOutput): Promise<LeagueOutput> => {
    try {
      const response = await ApiService.post("/liga", {
        genero: input.genero,
        nome: input.nome,
        serie: input.serie,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const searchLeague = async (id: string): Promise<LeagueOutput> => {
    try {
      const response = await ApiService.get(`/liga/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const initLeague = async (
    id: string,
    input: InitLeagueInput,
    initilizeLeague: InitilizeType
  ): Promise<any> => {
    try {
      const response = await ApiService.post(
        `/liga/${id}/${initilizeLeague}`,
        input
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteLeague = async (id: string): Promise<void> => {
    try {
      const response = await ApiService.delete(`/liga/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getLeagueClassification = async (
    id?: string
  ): Promise<LeagueClassificationOutput[]> => {
    try {
      if (id) {
        const response = await ApiService.get("pontuacao", {
          params: { idLiga: id },
        });
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    createLeague,
    fetchLeague,
    searchLeague,
    deleteLeague,
    initLeague,
    getLeagueClassification,
  };
}
