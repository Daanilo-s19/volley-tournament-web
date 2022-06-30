import { useState } from "react";
import { useQuery } from "react-query";
import { League } from "../../../entities/game/league";
import { api } from "../../../libs/axios";
import parseResponseData from "../../../utils/parsers";

function useRegisterStatistics() {
  const [leagueId, setLeagueId] = useState<string>();

  const { data: league } = useQuery<League>(
    ["league", { id: leagueId }],
    () => {
      return api.get(`/liga/${leagueId}`).then(parseResponseData);
    },
    { enabled: !!leagueId }
  );

  return { leagueId, setLeagueId, league };
}

export { useRegisterStatistics };
