import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LeagueService from "../services/leagueServices";
import { LeagueOutput } from "../types/leagueType";

export default function useLeague(onStart: boolean = true) {
  const { fetchLeague, deleteLeague, createLeague } = LeagueService();

  const [currentLeague, setCurrentLeague] = useState<LeagueOutput | null>();

  const {
    data: leagues,
    refetch: onFetchLeague,
    isLoading: isLoadingLeagues,
  } = useQuery<LeagueOutput[]>("fetchLeague", fetchLeague, {
    onSuccess: (d) => {
      const league = d?.[0];
      onStart && setCurrentLeague(league);
    },
  });

  return {
    currentLeague,
    setCurrentLeague,
    fetchLeague,
    deleteLeague,
    createLeague,
    onFetchLeague,
    leagues,
    isLoadingLeagues,
  };
}
