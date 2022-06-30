import { useState } from "react";
import { useQuery } from "react-query";
import { League } from "../../../entities/game/league";
import { api } from "../../../libs/axios";
import parseResponseData from "../../../utils/parsers";

function useRegisterStatistics() {
  const [leagueId, setLeagueId] = useState<string>();

  const { data: league, isLoading: isLoadingLeague } = useQuery<League>(
    ["league", { id: leagueId }],
    () => {
      return api.get(`/liga/${leagueId}`).then(parseResponseData);
    },
    { enabled: !!leagueId }
  );

  const { data: matches, isLoading: isLoadingMatches } = useQuery(
    ["matches", { leagueId: leagueId }],
    () => api.get("/partida", { params: { idLiga: leagueId } }),
    {
      onSuccess: (d) => console.log(d),

      enabled: !!leagueId && !!league,
    }
  );

  return { leagueId, setLeagueId, league, isLoadingLeague };
}

export { useRegisterStatistics };
