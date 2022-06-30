import { useState } from "react";
import { useQuery } from "react-query";
import { League } from "../../../entities/game/league";
import { Match } from "../../../entities/game/match";
import { api } from "../../../libs/axios";
import parseResponseData from "../../../utils/parsers";

function useRegisterStatistics() {
  const [leagueId, setLeagueId] = useState<string>();
  const [round, setRound] = useState<number | string>();
  const [matchId, setMatchId] = useState<string>();

  const { data: leagues, isLoading: isLoadingLeagues } = useQuery(
    "leagues",
    () => api.get("/liga").then(parseResponseData)
  );

  const { data: league, isLoading: isLoadingLeague } = useQuery<League>(
    ["league", { id: leagueId }],
    () => {
      return api.get(`/liga/${leagueId}`).then(parseResponseData);
    },
    { enabled: !!leagueId }
  );

  const { data: matches, isLoading: isLoadingMatches } = useQuery<Match[]>(
    ["matches", { leagueId, round }],
    () =>
      api
        .get("/partida", { params: { idLiga: leagueId, tipoRodada: round } })
        .then(parseResponseData),
    {
      onSuccess: (d) => console.log(d),
      enabled: !!leagueId && !!league && !!round,
    }
  );

  return {
    leagueId,
    setLeagueId,
    round,
    setRound,
    leagues,
    isLoadingLeagues,
    league,
    isLoadingLeague,
    matches,
    isLoadingMatches,
    matchId,
    setMatchId,
  };
}

export { useRegisterStatistics };
