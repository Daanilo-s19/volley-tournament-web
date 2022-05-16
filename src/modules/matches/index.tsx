import React from "react";
import Link from "next/link";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Heading,
  Table,
  Image,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  IconButton,
  Flex,
  Tooltip,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const renderMatches = () => {
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
};

export function MatchesPage() {
  return (
    <Box>
      <Heading as="h3" size="lg" margin="48px 0 24px">
        Gerenciamento de Partida
      </Heading>
      <Flex
        flexDirection="row"
        alignContent="center"
        justifyContent="space-between"
      >
        <Text fontSize="lg" marginBottom="24px">
          Acompanhe e realize o cadastro das partidas.
        </Text>
        <Tooltip label="Adicionar clube">
          <IconButton
            colorScheme="blue"
            aria-label="adicionar Clube"
            icon={<AddIcon />}
            onClick={() => {}}
            isRound
          />
        </Tooltip>
      </Flex>
      {renderMatches()}
    </Box>
  );
}
