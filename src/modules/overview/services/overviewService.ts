import { api } from "../../../libs/axios";
import {
  CreateCoachVariables,
  CreateTeamInput,
  FetchTeamsOutput,
  TeamOutput,
} from "../types";

export default function OverViewService() {
  const fetchTeams = async (): Promise<FetchTeamsOutput> => {
    try {
      const response = await api.get("/equipe");
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
      const response = await api.post("/equipe", { input });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const searchTeam = async (id: string): Promise<TeamOutput> => {
    try {
      const response = await api.get(`/equipe/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateTeam = async ({
    input,
  }: {
    input: TeamOutput;
  }): Promise<TeamOutput> => {
    const { id } = input;
    try {
      const response = await api.put(`/equipe/${id}`, { input });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteTeam = async (id: string): Promise<void> => {
    try {
      const response = await api.delete(`/equipe/${id}`);
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
      const response = await api.post("/pessoa/tecnico", { input });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const searchCoach = async (id: string): Promise<CreateCoachVariables> => {
    try {
      const response = await api.get(`/pessoa/tecnico/${id}`);
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
  };
}
