import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import {  Center } from "@chakra-ui/layout";
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
import {GeneralStatisticsOutput} from "../../types"

interface Props {
  items: Array<GeneralStatisticsOutput>;
  loading: boolean;
  error: boolean;
}

export default function GeneralStatisticsTable({
  items,
  loading,
  error,
}: Props) {
  const getHead = () =>
    ["Nome", "Equipe", "Saques", "Recepções", "Bloqueios", "Aces", "Ataques",  "Levantamentos", "Assistências", "Pontos"].map((e, key) => (
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
      <Tr key={e.idAtleta}>
        <Td>
          <Text>{e.atleta.nome ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e.equipe.nome ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e.saques ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e.recepcoes ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e.bloqueios ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e.aces ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e.ataques ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e.levantamentos ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e.assistencias ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e.pontos ?? ""}</Text>
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