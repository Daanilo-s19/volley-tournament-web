import { Heading, Select } from "@chakra-ui/react";
import React from "react";
import useLeague from "../../hooks/useLeague";

export interface Props {
  onChange(value: string): void;
}

export default function SelectLeague({ onChange }: Props) {
  const { leagues, currentLeague } = useLeague();

  const renderLeagues = () => {
    return (
      <Select
        placeholder=" Selecionar Liga"
        margin="0 0 12px"
        onChange={(e) => onChange(e.target.value)}
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
