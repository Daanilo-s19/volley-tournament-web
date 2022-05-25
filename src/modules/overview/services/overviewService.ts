import { ApiService } from "../../../services/service";
import {
  CreateCoachVariables,
  CreateStadiumInput,
  CreateStadiumOutput,
  CreateTeamInput,
  FetchTeamsOutput,
  TeamOutput,
} from "../types";

export default function OverViewService() {
  const fetchTeams = async (id: string): Promise<FetchTeamsOutput> => {
    try {
      const response = await ApiService.get(`/equipe?idLiga=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const createTeam = async ({
    input,
  }: {
    input: CreateTeamInput;
  }): Promise<TeamOutput> => {
    try {
      const response = await ApiService.post("/equipe", { input });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const searchTeam = async (id: string): Promise<TeamOutput> => {
    try {
      const response = await ApiService.get(`/equipe/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateTeam = async (
    input: CreateTeamInput,
    id: string
  ): Promise<TeamOutput> => {
    try {
      const response = await ApiService.put(`/equipe/${id}`, { input });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteTeam = async (id: string): Promise<void> => {
    try {
      const response = await ApiService.delete(`/equipe/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createCoach = async ({
    input,
  }: {
    input: CreateCoachVariables;
  }): Promise<CreateCoachVariables> => {
    try {
      const response = await ApiService.post("/pessoa/tecnico", { input });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const searchCoach = async (id: string): Promise<CreateCoachVariables> => {
    try {
      const response = await ApiService.get(`/pessoa/tecnico/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createStadium = async (
    stadium: CreateStadiumInput
  ): Promise<CreateStadiumOutput> => {
    try {
      const response = await ApiService.post("/ginasio", {
        ...stadium,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    fetchTeams,
    createTeam,
    searchTeam,
    updateTeam,
    deleteTeam,
    createCoach,
    searchCoach,
    createStadium,
  };
}
