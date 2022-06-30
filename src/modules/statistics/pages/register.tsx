import { Box, CircularProgress, Flex, Heading, Select } from "@chakra-ui/react";
import { MATCH_ROUNDS } from "../../../utils/consts";
import SelectLeague from "../../leagues/components/selectLeague";
import { useRegisterStatistics } from "../hooks/useRegisterStatistics";

function RegisterStatistics() {
  const {
    league,
    isLoadingLeague,
    leagueId,
    setLeagueId,
    round,
    setRound,
    leagues,
    isLoadingLeagues,
    matches,
    isLoadingMatches,
    matchId,
    setMatchId,
  } = useRegisterStatistics();

  return (
    <Box>
      <Heading as="h5" size="md" pt="4" pb="4">
        Selecione a liga
      </Heading>
      {isLoadingLeagues ? (
        <Flex pt="4" justifyContent="center">
          <CircularProgress isIndeterminate />
        </Flex>
      ) : (
        <>
          {leagues ? (
            <>
              <Select
                value={leagueId}
                onChange={(e) => setLeagueId(e.target.value)}
              >
                <option value="" />
                {leagues.map((e) => (
                  <option value={e.id}>{e.nome ?? "-"}</option>
                ))}
              </Select>
              {isLoadingLeague ? (
                <Flex pt="4" justifyContent="center">
                  <CircularProgress isIndeterminate />
                </Flex>
              ) : (
                <>
                  {league ? (
                    <>
                      <Box pt="4">
                        <Heading as="h5" size="md" pt="2" pb="4">
                          Selecione a rodada
                        </Heading>
                        <Select
                          value={round}
                          onChange={(e) => setRound(e.target.value)}
                        >
                          <option value="" />
                          {MATCH_ROUNDS.map((round) => (
                            <option key={round} value={round}>
                              {round}
                            </option>
                          ))}
                        </Select>
                      </Box>
                      {isLoadingMatches ? (
                        <Flex pt="4" justifyContent="center">
                          <CircularProgress isIndeterminate />
                        </Flex>
                      ) : (
                        <>
                          {matches ? (
                            <>
                              <Box pt="4">
                                <Heading as="h5" size="md" pt="2" pb="4">
                                  Selecione a partida
                                </Heading>
                                <Select
                                  value={matchId}
                                  onChange={(e) => setMatchId(e.target.value)}
                                >
                                  <option value="" />
                                  {matches.map((match) => (
                                    <option key={match.id} value={match.id}>
                                      {match.mandante.equipe.nome} X{" "}
                                      {match.visitante.equipe.nome}
                                    </option>
                                  ))}
                                </Select>
                              </Box>
                              {matchId ? (
                                <Box pt="4">
                                  <Heading as="h5" size="md" pt="2" pb="4">
                                    Selecione o jogador
                                  </Heading>
                                  <Select
                                    value={matchId}
                                    onChange={(e) => setMatchId(e.target.value)}
                                  >
                                    <option value="" />
                                    {matches.map((match) => (
                                      <option key={match.id} value={match.id}>
                                        {match.mandante.equipe.nome} X{" "}
                                        {match.visitante.equipe.nome}
                                      </option>
                                    ))}
                                  </Select>
                                </Box>
                              ) : null}
                            </>
                          ) : null}
                        </>
                      )}
                    </>
                  ) : null}
                </>
              )}
            </>
          ) : null}
        </>
      )}
    </Box>
  );
}

export { RegisterStatistics };
