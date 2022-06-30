import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Flex,

} from "@chakra-ui/react";
import SelectLeague from "../../leagues/components/selectLeague";
import useLeague from "../hooks/useLeague";
import LeagueClassificationTable from "../components/leaguesTable";

export function LeaguePage() {
  const {classification,classificationError, isLoadingClassification, setLeagueID } = useLeague()

  return (
    <Box>
      <SelectLeague onChange={(e) => {
        setLeagueID(e)
      }} />
      <Flex
        flexDirection="column"
        alignContent="center"
        justifyContent="space-between"
        margin="60px 0 24px"
      >
        <Heading as="h3" size="lg" marginBottom={10}>
          Pontuação
        </Heading>
        <LeagueClassificationTable error={Boolean(classificationError)} items={classification} loading={isLoadingClassification} />
      </Flex>
    </Box>
  );
}