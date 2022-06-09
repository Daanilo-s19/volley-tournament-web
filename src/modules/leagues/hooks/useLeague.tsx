import {  useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LeagueService from "../services/leagueServices";
import { LeagueClassificationOutput, LeagueOutput } from "../types/leagueType";

export default function useLeague() {
  const toast = useToast()
  const { fetchLeague, deleteLeague, createLeague, getLeagueClassification } = LeagueService();

  const [currentLeague, setCurrentLeague] = useState<LeagueOutput | null>();

  const {
    data: leagues,
    refetch: onFetchLeague,
    isLoading: isLoadingLeagues,
  } = useQuery<LeagueOutput[]>("league", fetchLeague, {
    onSuccess: (d) => {
    },
  });

  const {
    data: classification,
    refetch: onFetchClassification,
    isLoading: isLoadingClassification,
    error: classificationError,
  } = useQuery<LeagueClassificationOutput[]>("classification", () =>  getLeagueClassification(currentLeague.id), {
    onSuccess: (d) => {

    },
    onError: () => {
      toast({
        title: "Ops.",
        description: "houve um equivoco.",
        status: "error",
        position: "bottom-right",
        duration: 9000,
        isClosable: true,
      });
    }
  })

  return {
    currentLeague,
    setCurrentLeague,
    fetchLeague,
    deleteLeague,
    createLeague,
    onFetchLeague,
    leagues,
    isLoadingLeagues,
    getLeagueClassification,
    classification,
    onFetchClassification,
    isLoadingClassification,
    classificationError
  };
}
