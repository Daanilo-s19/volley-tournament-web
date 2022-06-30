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
  } = useRegisterStatistics();

  return (
    <Box>
      <Heading as="h5" size="md" pt="4" pb="4">
        Selecionar a liga
      </Heading>
      {isLoadingLeagues ? (
        <Flex pt="4" justifyContent="center">
          <CircularProgress isIndeterminate />
        </Flex>
      ) : (
        <>
          {leagues ? (
            <>
              <Select onChange={(e) => setLeagueId(e.target.value)}>
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
                    <Box pt="4">
                      <Heading as="h5" size="md" pt="2" pb="4">
                        Selecionar a rodada
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
