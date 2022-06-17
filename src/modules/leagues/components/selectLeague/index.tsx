import { Heading, Select } from "@chakra-ui/react";
import React from "react";
import useLeague from "../../hooks/useLeague";
import { LeagueOutput } from "../../types/leagueType";

export interface Props {
  onChange(value: LeagueOutput): void;
}

export default function SelectLeague({ onChange }: Props) {
  const { leagues, currentLeague } = useLeague();

  const renderLeagues = () => {
    return (
      <Select
        placeholder=" Selecionar Liga"
        margin="0 0 12px"
        onChange={(e) => {
          const league = leagues.find((league) => league.id === e.target.value);
          onChange(league);
        }}
      >
        {leagues?.map((e) => (
          <option value={e.id} selected={currentLeague?.id === e.id}>
            {e.nome ?? "-"}
          </option>
        ))}
      </Select>
    );
  };
  return (
    <>
      <Heading as="h4" size="md" margin="24px 0 12px">
        Selecionar Liga
      </Heading>
      {renderLeagues()}
    </>
  );
}
