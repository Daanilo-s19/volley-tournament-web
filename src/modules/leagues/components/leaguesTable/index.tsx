import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";


import { Center } from "@chakra-ui/layout";

import {
  Th,
  Tr,
  Td,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { LeagueClassificationOutput } from "../../types/leagueType";

interface Props {
  items: Array<LeagueClassificationOutput>;
  loading: boolean;
  error: boolean;
}

export default function LeagueClassificationTable({
  items,
  loading,
  error,
}: Props) {
  const getHead = () =>

    ["Equipe", "Total jogos", "Vitorias", "Derrotas", "Sets","Pontos"].map((e, key) => (
      <Th key={key}>{e}</Th>
    ));

  const getBody = () => {
    if (items.length === 0 && !error)
      return (
        <Td colSpan={10}>
          <Center>
            <Text>Ainda não houveram cadastros realizados</Text>
          </Center>
        </Td>
      );
    return items.map((e, key) => (
      <Tr key={e.idEquipe}>
        <Td>
          <Text>{e.equipe.nome ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e.partidasDisputadas ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e?.partidasGanhas ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e?.partidasPerdidas ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e?.setsGanhos ?? ""}:{e?.setsPerdidos ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e.partidasGanhas * 2}</Text>
        </Td>
      </Tr>
    ));
  };
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>{getHead()}</Tr>
        </Thead>
        <Tbody>
          {(loading || error) && (
            <Tr>
              <Td colSpan={10}>
                <Center>
                  {loading && (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  )}
                  {error && (
                    <Text>
                      Não foi possivel exibir os dados no momento. tente
                      novamente mais tarde
                    </Text>
                  )}
                </Center>
              </Td>
            </Tr>
          )}

          {items && getBody()}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
