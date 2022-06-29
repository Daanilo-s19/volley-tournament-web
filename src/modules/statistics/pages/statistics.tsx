import React, { useEffect } from "react";
import {
  Box, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs,
} from "@chakra-ui/react";
import { GenericPlayerCard } from "../components/genericPlayerCard";
import { useStatistics } from "../hooks/useStatistics";
import SelectLeague from "../../leagues/components/selectLeague";
import useLeague from "../../leagues/hooks/useLeague";
import StatisticsTable from "../components/statisticsTable";


export function StatisticsPage() {

  const {
    galera,
    isLoadingGalera,
    setCurrentLeagueId,
    central,
    isLoadingCentral,
    oposto,
    isLoadingOposto,
    libero,
    isLoadingLibero,
    liberoError,
    opostoError,
    centralError,
    galeraError
    } = useStatistics();


  function statisticsTabs(){
    return (
      <Tabs>
        <TabList>
          <Tab>Libero</Tab>
          <Tab>Oposto</Tab>
          <Tab>Central</Tab>
          <Tab>Craque da galera</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <StatisticsTable error={!!liberoError} items={libero} loading={isLoadingLibero}/>
          </TabPanel>
          <TabPanel>
            <StatisticsTable error={!!opostoError} items={oposto} loading={isLoadingOposto}/>
          </TabPanel>
          <TabPanel>
          <StatisticsTable error={!!centralError} items={central} loading={isLoadingCentral}/>
          </TabPanel>
          <TabPanel>
          <StatisticsTable error={!!galeraError} items={galera} loading={isLoadingGalera}/>
          </TabPanel>
        </TabPanels>
    </Tabs>
    )
  }


  return (
    <Box>
      <SelectLeague onChange={async (id) => {
         setCurrentLeagueId(id);
      }}/>
      <Heading mt="4">Mais votados 🥇</Heading>
      <Flex mt="4" alignItems="center" justifyContent="space-between"  >
        <GenericPlayerCard title="Libero"  loading={isLoadingLibero} player={libero?.length ? {
          name: libero[0].atleta.nome,
          votes: libero[0].quantidadeVotos,
          age: libero[0].atleta.idade,
          team: libero[0].atleta.idEquipe,
        }: undefined }/>
        
        <GenericPlayerCard title="Oposto" loading={isLoadingOposto} player={oposto?.length ? {
          name: oposto[0].atleta.nome,
          votes: oposto[0].quantidadeVotos,
          age: oposto[0].atleta.idade,
          team: oposto[0].atleta.idEquipe,
        }: undefined}/>

        <GenericPlayerCard title="Central"  loading={isLoadingCentral} player={central?.length ? {
          name: central[0].atleta.nome,
          votes: central[0].quantidadeVotos,
          age: central[0].atleta.idade,
          team: central[0].atleta.idEquipe,
        }: undefined}/>

        <GenericPlayerCard title="Craque da galera" loading={isLoadingGalera} player={galera?.length ? {
          name: galera[0].atleta.nome,
          votes: galera[0].quantidadeVotos,
          age: galera[0].atleta.idade,
          team: galera[0].atleta.idEquipe,
        }: undefined}/>
      </Flex>
      <Box mt="8">
        <Heading mb="4">Ranking 🏆</Heading>
        {statisticsTabs()}
      </Box>
    </Box>
  );
}
