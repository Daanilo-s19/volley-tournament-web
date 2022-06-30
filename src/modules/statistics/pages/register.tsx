import { Box, CircularProgress, Flex, Select } from "@chakra-ui/react";
import SelectLeague from "../../leagues/components/selectLeague";
import { useRegisterStatistics } from "../hooks/useRegisterStatistics";

function RegisterStatistics() {
  const { setLeagueId, league, isLoadingLeague } = useRegisterStatistics();

  return (
    <Box>
      <SelectLeague onChange={setLeagueId} />

      <Flex mt="4" justifyContent="center">
        {isLoadingLeague ? (
          <CircularProgress isIndeterminate />
        ) : (
          <>{league ? <Box>rodada</Box> : null}</>
        )}
      </Flex>
    </Box>
  );
}

export { RegisterStatistics };
