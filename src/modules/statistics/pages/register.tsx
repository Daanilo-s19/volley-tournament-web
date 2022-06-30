import { Box } from "@chakra-ui/react";
import SelectLeague from "../../leagues/components/selectLeague";
import { useRegisterStatistics } from "../hooks/useRegisterStatistics";

function RegisterStatistics() {
  const { setLeagueId } = useRegisterStatistics();

  return (
    <Box>
      <SelectLeague onChange={setLeagueId} />
    </Box>
  );
}

export { RegisterStatistics };
