import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import { AspectRatio, Link, Center } from "@chakra-ui/layout";
import {
  Th,
  Tr,
  Td,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Spinner,
  Image,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { PersonOutput } from "../types";

interface Props {
  items: Array<PersonOutput>;
  loading: boolean;
  error: boolean;
  onEdit(item: PersonOutput): void;
  onDelete(item: PersonOutput): void;
}
export default function PersonTable({
  items,
  loading,
  error,
  onEdit,
  onDelete,
}: Props) {
  const getHead = () =>
    ["nome", "documento", "genero", "idade", "documentoCbv"].map((e, key) => (
      <Th key={key}>{e}</Th>
    ));

  const getBody = () => {
    console.log("items", items);

    if (items.length === 0 && !error)
      return (
        <Td colSpan={10}>
          <Center>
            <Text>Ainda não houveram cadastros realizados</Text>
          </Center>
        </Td>
      );
    return items.map((e, key) => (
      <Tr key={key}>
        <Td>
          <Text>{e?.nome ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e?.documento ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e?.genero ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e?.idade ?? ""}</Text>
        </Td>
        <Td>
          <Text>{e?.documentoCbv ?? ""}</Text>
        </Td>
        {/* <Td>
          <IconButton
            aria-label="Editar"
            icon={<EditIcon />}
            onClick={() => onEdit(e)}
            isRound
          />
        </Td>
        <Td>
          <IconButton
            aria-label="Deletar"
            icon={<DeleteIcon />}
            onClick={() => onDelete(e)}
            isRound
          />
        </Td> */}
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
