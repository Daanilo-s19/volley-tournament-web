import React from "react";
import Link from "next/link";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
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
import useOverview from "./hooks";

const getHead = () =>
  [
    "Equipe",
    "nome",
    "atletas",
    "comissão técnica",
    "Comissão médica",
    "total",
  ].map((e, key) => <Th key={key}>{e}</Th>);

const getBody = () =>
  ["_", "_", "_", "_", "_"].map((e, key) => (
    <Tr key={key}>
      <Td>
        <AspectRatio maxW="40px" ratio={4 / 3}>
          <Image
            src="https://bit.ly/naruto-sage"
            alt="naruto"
            objectFit="cover"
          />
        </AspectRatio>
      </Td>
      <Td>
        <Link href="">Minas</Link>
      </Td>
      <Td>
        <Link href="">25</Link>
      </Td>
      <Td>
        <Link href="">10</Link>
      </Td>
      <Td>
        <Link href="">10</Link>
      </Td>
      <Td>
        <Link href="">45</Link>
      </Td>
    </Tr>
  ));

const renderOverviewTeams = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>{getHead()}</Tr>
        </Thead>
        <Tbody>{getBody()}</Tbody>
      </Table>
    </TableContainer>
  );
};

export function OverviewPage() {
  const { isOpen, onClose, onOpen } = useOverview();

  const renderCreateClubModal = () => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar clube</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome do clube</FormLabel>
              <Input placeholder="Nome do clube" />
            </FormControl>
            <FormControl>
              <FormLabel>logo</FormLabel>
              <Input placeholder="logo" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Endereço do clube</FormLabel>
              <Input placeholder="Endereço do clube" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Estádio</FormLabel>
              <Input placeholder="Estádio" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Mascote</FormLabel>
              <Input placeholder="Descreva o seu mascote." />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Cores do clube</FormLabel>
              <Input placeholder="cores do clube" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Criar clube
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  return (
    <Box>
      <Heading as="h3" size="lg" margin="48px 0 0">
        Gerenciamento dos clubes
      </Heading>
      <Flex
        flexDirection="row"
        alignContent="center"
        justifyContent="space-between"
      >
        <Text fontSize="lg" marginY="24px">
          Acompanhe e realize alterações em um clube.
        </Text>
        <Tooltip label="Adicionar clube">
          <IconButton
            colorScheme="blue"
            aria-label="adicionar Clube"
            icon={<AddIcon />}
            onClick={onOpen}
            isRound
          />
        </Tooltip>
      </Flex>
      {renderOverviewTeams()}
      {isOpen && renderCreateClubModal()}
    </Box>
  );
}
