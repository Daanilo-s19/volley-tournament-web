import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { MATCH_ROUNDS } from "../../../utils/consts";
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
    homeTeam,
    isLoadingHomeTeam,
    awayTeam,
    isLoadingAwayTeam,
    playerId,
    setPlayerId,
    registerForm,
    formErrors,
    registerStats,
    handleSubmit,
    isLoadingRegisterStats,
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
                              {isLoadingHomeTeam || isLoadingAwayTeam ? (
                                <Flex pt="4" justifyContent="center">
                                  <CircularProgress isIndeterminate />
                                </Flex>
                              ) : (
                                <>
                                  {homeTeam && awayTeam ? (
                                    <>
                                      <Box pt="4">
                                        <Heading
                                          as="h5"
                                          size="md"
                                          pt="2"
                                          pb="4"
                                        >
                                          Selecione o jogador
                                        </Heading>
                                        <Select
                                          value={playerId}
                                          onChange={(e) =>
                                            setPlayerId(e.target.value)
                                          }
                                        >
                                          <option value="" />
                                          {[
                                            ...homeTeam.atletas,
                                            ...awayTeam.atletas,
                                          ].map((player) => (
                                            <option
                                              key={player.id}
                                              value={player.id}
                                            >
                                              {player.nome}
                                            </option>
                                          ))}
                                        </Select>
                                      </Box>

                                      {playerId ? (
                                        <Box
                                          as="form"
                                          pt="4"
                                          onSubmit={handleSubmit(registerStats)}
                                        >
                                          <FormControl>
                                            <FormLabel>Bloqueios</FormLabel>
                                            <Input
                                              {...registerForm("bloqueios", {
                                                required: true,
                                                valueAsNumber: true,
                                              })}
                                            />
                                            {formErrors.bloqueios && (
                                              <Text color="red" fontSize="10">
                                                Insira uma quantidade de
                                                bloqueios válida
                                              </Text>
                                            )}
                                          </FormControl>
                                          <FormControl>
                                            <FormLabel>Ataques</FormLabel>
                                            <Input
                                              {...registerForm("ataques", {
                                                required: true,
                                                valueAsNumber: true,
                                              })}
                                            />
                                            {formErrors.ataques && (
                                              <Text color="red" fontSize="10">
                                                Insira uma quantidade de ataques
                                                válida
                                              </Text>
                                            )}
                                          </FormControl>
                                          <FormControl>
                                            <FormLabel>Recepções</FormLabel>
                                            <Input
                                              {...registerForm("recepcoes", {
                                                required: true,
                                                valueAsNumber: true,
                                              })}
                                            />
                                            {formErrors.recepcoes && (
                                              <Text color="red" fontSize="10">
                                                Insira uma quantidade de
                                                Recepcoes válida
                                              </Text>
                                            )}
                                          </FormControl>
                                          <FormControl>
                                            <FormLabel>Saques</FormLabel>
                                            <Input
                                              {...registerForm("saques", {
                                                required: true,
                                                valueAsNumber: true,
                                              })}
                                            />
                                            {formErrors.saques && (
                                              <Text color="red" fontSize="10">
                                                Insira uma quantidade de saques
                                                válida
                                              </Text>
                                            )}
                                          </FormControl>
                                          <FormControl>
                                            <FormLabel>Aces</FormLabel>
                                            <Input
                                              {...registerForm("aces", {
                                                required: true,
                                                valueAsNumber: true,
                                              })}
                                            />
                                            {formErrors.aces && (
                                              <Text color="red" fontSize="10">
                                                Insira uma quantidade de aces
                                                válida
                                              </Text>
                                            )}
                                          </FormControl>
                                          <FormControl>
                                            <FormLabel>Pontos</FormLabel>
                                            <Input
                                              {...registerForm("pontos", {
                                                required: true,
                                                valueAsNumber: true,
                                              })}
                                            />
                                            {formErrors.pontos && (
                                              <Text color="red" fontSize="10">
                                                Insira uma quantidade de pontos
                                                válida
                                              </Text>
                                            )}
                                          </FormControl>

                                          <Flex pt="4" pb="4">
                                            <Button
                                              ml="auto"
                                              type="submit"
                                              isLoading={isLoadingRegisterStats}
                                            >
                                              Cadastrar
                                            </Button>
                                          </Flex>
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
            </>
          ) : null}
        </>
      )}
    </Box>
  );
}

export { RegisterStatistics };
