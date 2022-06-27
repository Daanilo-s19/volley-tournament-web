import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose(): void;
  onFinish(): void;

  mandante: string;
  visitante: string;
  loading?: boolean;
}

export default function SaveResultMatch({
  isOpen,
  onClose,

  mandante,
  visitante,
  loading = false,

  onFinish,
}: Props) {
  const toast = useToast();

  const [mandanteResult, setMandanteResult] = useState<number>(0);
  const [visitanteResult, setVisitanteResult] = useState<number>(0);

  const totalSet = useMemo(
    () => mandanteResult + visitanteResult,
    [mandanteResult, visitanteResult]
  );

  const someSet = (mandante?: string, visitante?: string) => {
    setMandanteResult(
      mandante != null ? Number.parseInt(mandante) : mandanteResult
    );
    setVisitanteResult(
      visitante != null ? Number.parseInt(visitante) : visitanteResult
    );
  };

  const toastError = (message?: string) => {
    toast({
      title: "Ops.",
      description: message ?? "houve um equivoco.",
      status: "warning",
      position: "bottom-right",
      duration: 9000,
      isClosable: true,
    });
  };

  const renderPlayersClub = () => {
    return (
      <Grid
        gridTemplateColumns="repeat(2,1fr)"
        justifyContent="center"
        gap="60px"
      >
        <Box>
          <FormControl>
            <FormLabel marginTop="12px">Mandante: {mandante}</FormLabel>
            <Select
              placeholder="Mandante:"
              onChange={(select) => someSet(select.target.value, null)}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              {visitanteResult !== 3 && <option value={3}>3</option>}
            </Select>
          </FormControl>
          {renderPlayerByPosition()}
        </Box>
        <Box>
          <FormControl>
            <FormLabel marginTop="12px">Visitante: {visitante}</FormLabel>
            <Select
              placeholder="Visitante"
              onChange={(select) => someSet(null, select.target.value)}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              {mandanteResult !== 3 && <option value={3}>3</option>}
            </Select>
          </FormControl>
          {renderPlayerByPosition()}
        </Box>
      </Grid>
    );
  };

  const renderPlayerByPosition = () => {
    return (
      <Grid gridTemplateColumns={`repeat(${totalSet}, 1fr)`} gap="20px">
        {Array.from<Number>(new Array(totalSet)).map((_, index) => (
          <FormControl marginTop="24px">
            <FormLabel>{index + 1} SET</FormLabel>
            <Input
              placeholder=""
              type="number"
              // {...register("nome", { required: true })}
            />
            {/* {errors.nome && (
               <Text color="red" fontSize="10">
                 Insira o nome
               </Text>
             )} */}
          </FormControl>
        ))}
      </Grid>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>cadastrar resultado</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          ) : (
            <Box>{renderPlayersClub()}</Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => onFinish()}>
            Finalizar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
