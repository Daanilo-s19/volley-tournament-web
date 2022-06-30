import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useLeague from "../../leagues/hooks/useLeague";
import { StatisticsService } from "../services/statisticsService"
import { GeneralStatisticsOutput, StatisticsOutput } from "../types";

export function useStatistics() {
  const toast = useToast();
  const [currentLeagueId, setCurrentLeagueId] = useState<string | undefined>(undefined);
  const {fetchGalera, fetchCentral, fetchOposto, fetchLibero, fetchGeneralStatistics } = StatisticsService();
  

  const toastError = (message?: string) => {
    toast({
      title: "Ops.",
      description: message ?? "houve um equivoco.",
      status: "error",
      position: "bottom-right",
      duration: 9000,
      isClosable: true,
    });
  };

  const {
    data: galera,
    isLoading: isLoadingGalera,
    error: galeraError,
  } = useQuery<StatisticsOutput[]>(["fetchGalera", currentLeagueId],  () => fetchGalera(currentLeagueId), {
    onError: () => toastError(),
  });

  const {
    data: central,
    isLoading: isLoadingCentral,
    error: centralError,
  } = useQuery<StatisticsOutput[]>(["fetchCentral", currentLeagueId],  () => fetchCentral(currentLeagueId), {
    onError: () => toastError(),
  })

  const {
    data: oposto,
    isLoading: isLoadingOposto,
    error: opostoError,
  } = useQuery<StatisticsOutput[]>(["fetchOposto", currentLeagueId],  () => fetchOposto(currentLeagueId), {
    onError: () => toastError(),
  })

  const{
    data: libero,
    isLoading: isLoadingLibero,
    error: liberoError,
  } = useQuery<StatisticsOutput[]>(["fetchLibero", currentLeagueId],  () => fetchLibero(currentLeagueId), {
    onError: () => {
      toastError()
      return true;
    },
  })

  const {
    data: generalStatistics,
    isLoading: isLoadingGeneralStatistics,
    error: generalStatisticsError,
  } = useQuery<GeneralStatisticsOutput[]>(["fetchGeneralStatistics", currentLeagueId], () => fetchGeneralStatistics(currentLeagueId), {
    onError: () => toastError(),
  })

  return {
    setCurrentLeagueId,
    
    galera,
    isLoadingGalera,
    galeraError,
    
    central,
    isLoadingCentral,
    centralError,

    oposto,
    isLoadingOposto,
    opostoError,

    libero,
    isLoadingLibero,
    liberoError,

    generalStatistics,
    isLoadingGeneralStatistics,
    generalStatisticsError,
  }
}