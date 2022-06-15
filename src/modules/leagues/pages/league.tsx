import React from "react";
import { AddIcon, DeleteIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Text,
  IconButton,
  Flex,
  Tooltip,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Divider,
} from "@chakra-ui/react";
import SelectLeague from "../../leagues/components/selectLeague";
import useLeague from "../hooks/useLeague";
import LeagueClassificationTable from "../components/leaguesTable";
import { LeagueOutput } from "../types/leagueType";

export function LeaguePage() {
  const {setLeagueID,classification,classificationError, isLoadingClassification, onFetchClassification } = useLeague()

  async function onLeagueChange(leagueId: string) {
    setLeagueID(leagueId);
    await onFetchClassification();
  }


  return (
    <Box>
      <SelectLeague onChange={(e) => onLeagueChange(e)} />
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