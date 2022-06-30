import { useToast } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { League } from "../../../entities/game/league";
import { Match } from "../../../entities/game/match";
import { Team } from "../../../entities/team";
import { api } from "../../../libs/axios";
import parseResponseData from "../../../utils/parsers";

interface RegisterStatisticsForm {
  bloqueios: number;
  recepcoes: number;
  aces: number;
  saques: number;
  ataques: number;
  pontos: number;
}

function useRegisterStatistics() {
  const [leagueId, setLeagueId] = useState<string>();
  const [round, setRound] = useState<number | string>();
  const [matchId, setMatchId] = useState<string>();
  const [playerId, setPlayerId] = useState<string>();

  const toast = useToast();

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
      enabled: !!leagueId && !!league && !!round,
    }
  );

  const match = useMemo(() => {
    return matches?.find((match) => match.id === matchId);
  }, [matchId]);

  const { data: homeTeam, isLoading: isLoadingHomeTeam } = useQuery<Team>(
    ["team", { leagueId, teamId: match?.mandante.idEquipe, matchId: matchId }],
    () =>
      api.get(`/equipe/${match?.mandante.idEquipe}`).then(parseResponseData),
    {
      onSuccess: (d) => console.log(d),
      enabled: !!leagueId && !!league && !!round && !!match,
    }
  );

  const { data: awayTeam, isLoading: isLoadingAwayTeam } = useQuery<Team>(
    [
      "team",
      { leagueId, teamId: match?.visitante?.idEquipe, matchId: matchId },
    ],
    () =>
      api.get(`/equipe/${match?.visitante.idEquipe}`).then(parseResponseData),
    {
      onSuccess: (d) => console.log(d),
      enabled: !!leagueId && !!league && !!round && !!match,
    }
  );

  const {
    register: registerForm,
    handleSubmit,
    reset: resetForm,
    formState: { errors: formErrors },
  } = useForm<RegisterStatisticsForm>();

  const { mutate: registerStatsMutation, isLoading: isLoadingRegisterStats } =
    useMutation(
      (playerStats: RegisterStatisticsForm) =>
        api.post("/estatistica/atleta", {
          idPartida: matchId,
          idAtleta: playerId,
          bloqueios: playerStats.bloqueios,
          recepcoes: playerStats.recepcoes,
          aces: playerStats.aces,
          saques: playerStats.saques,
          ataques: playerStats.ataques,
          pontos: playerStats.pontos,
        }),
      {
        onSuccess: () => {
          toast({
            title: "Sucesso.",
            description: "Estatísticas cadastradas com sucesso.",
            status: "success",
            duration: 9000,
            position: "bottom-right",
            isClosable: true,
          });
          resetForm();
        },
        onError: () => {
          toast({
            title: "Ops.",
            description:
              "Houve algum erro ao cadastrar as estatísticas do jogador.",
            status: "error",
            position: "bottom-right",
            duration: 9000,
            isClosable: true,
          });
        },
      }
    );

  function registerStats(playerStats: RegisterStatisticsForm) {
    registerStatsMutation(playerStats);
  }

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
    homeTeam,
    isLoadingHomeTeam,
    awayTeam,
    isLoadingAwayTeam,
    playerId,
    setPlayerId,
    registerForm,
    resetForm,
    formErrors,
    handleSubmit,
    registerStats,
    isLoadingRegisterStats,
  };
}

export { useRegisterStatistics };
