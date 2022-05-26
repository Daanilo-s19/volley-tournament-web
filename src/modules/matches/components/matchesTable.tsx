import { EditIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { Heading, Link } from "@chakra-ui/layout";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Text,
  Center,
} from "@chakra-ui/react";
import React from "react";

export default function MatchesTables() {
  return (
    <Center>
      <Text>
        Em construção! <NotAllowedIcon />
      </Text>
    </Center>
  );
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Partida</Th>
            <Th>Local</Th>
            <Th>Horário</Th>
            <Th>Status</Th>
            <Th>Resultado</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Link href="">Minas x Cruzeiro</Link>
            </Td>
            <Td>
              <Link href="">Mineirão</Link>
            </Td>
            <Td>
              <Link href="">22/05/2022</Link>
            </Td>
            <Td>
              <Link href="">Em andamento</Link>
            </Td>
            <Td>1 x 0</Td>
            <Td>
              <IconButton
                aria-label="Editar partida"
                icon={<EditIcon />}
                onClick={() => {}}
                isRound
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
