import axios from "axios";
import { ApiService } from "../../../services/service";
import { CreateLeagueOutput, LeagueOutput } from "../types";

export default function LeagueService() {
  const fetchLeague = async (): Promise<CreateLeagueOutput[]> => {
    try {
      const response = await ApiService.get("/liga");
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const createLeague = async (id: string): Promise<LeagueOutput> => {
    try {
      const response = await ApiService.post("/liga", {
        id,
        //TODO: marretado
        genero: "masculino",
        ano: "2022-05-25T11:16:08.599Z",
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

  const deleteLeague = async (id: string): Promise<void> => {
    try {
      const response = await ApiService.delete(`/liga/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    createLeague,
    fetchLeague,
    searchLeague,
    deleteLeague,
  };
}
