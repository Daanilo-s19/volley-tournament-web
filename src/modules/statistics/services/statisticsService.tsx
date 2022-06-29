import { ApiService } from "../../../services/service";
import { StatisticsOutput } from "../types";

export function StatisticsService() {
  const fetchLibero = async (id: string): Promise<StatisticsOutput[]> => {
    try {
      const response = await ApiService.get<StatisticsOutput[]>(`/estatistica/ranking/libero?idLiga=${id}`)
      return response.data;
    } catch (error) {
      throw error;
    }

  }

  const fetchCentral = async (id: string): Promise<StatisticsOutput[]> => {
    try {
      const response = await ApiService.get<StatisticsOutput[]>(`/estatistica/ranking/central?idLiga=${id}`)
      return response.data;
    } catch (error) {
      throw error;
    }

  }
  const fetchOposto = async (id: string): Promise<StatisticsOutput[]> => {
    try {
      const response = await ApiService.get<StatisticsOutput[]>(`/estatistica/ranking/oposto?idLiga=${id}`)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  const fetchGalera = async (id: string): Promise<StatisticsOutput[]> => {
    try {
      const response = await ApiService.get<StatisticsOutput[]>(`/estatistica/ranking/galera?idLiga=${id}`)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  return {
    fetchLibero,
    fetchCentral,
    fetchOposto,
    fetchGalera,
  }
}