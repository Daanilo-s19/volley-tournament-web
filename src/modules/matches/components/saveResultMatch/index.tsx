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
import { useForm } from "react-hook-form";

export interface ResultMatchProps {
  mandante: number[];
  visitante: number[];
}
interface Props {
  isOpen: boolean;
  onClose(): void;
  onFinish(data: ResultMatchProps): void;

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

  const [totalSets, setTotalSets] = useState<number>(0);
  const [mandanteSets, setMandanteSets] = useState<number[]>([]);
  const [visitanteSets, setVisitanteSets] = useState<number[]>([]);

  const onChangeMandanteSets = (value: string, set: number) => {
    if (value <= "0") {
      toastError("Insira o valor do set Válido");
      return;
    }

    mandanteSets[set] = parseInt(value);
    setMandanteSets(mandanteSets);
  };

  const onChangeVisitanteSets = (value: string, set: number) => {
    if (value <= "0") {
      toastError("Insira o valor do set Válido");
      return;
    }

    visitanteSets[set] = parseInt(value);
    setVisitanteSets(visitanteSets);
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

  const checkSets = () => {
    const error =
      visitanteSets.includes(NaN) ||
      mandanteSets.includes(NaN) ||
      visitanteSets.length < totalSets ||
      mandanteSets.length < totalSets;

    if (error) {
      toastError("Preencha todos os sets da partida");
      return;
    }

    onFinish({ visitante: visitanteSets, mandante: mandanteSets });
  };

  const renderPlayersClub = () => {
    return (
      <Box>
        <FormControl>
          <FormLabel marginTop="12px">Total de sets da partida:</FormLabel>
          <Select
            placeholder="Total de sets:"
            onChange={(select) => setTotalSets(parseInt(select.target.value))}
          >
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Select>
        </FormControl>
        {totalSets > 0 && (
          <>
            <FormLabel marginTop="12px">Mandante:</FormLabel>
            <Grid gridTemplateColumns={`repeat(${totalSets}, 1fr)`} gap="20px">
              {Array.from<Number>(new Array(totalSets)).map((_, index) => (
                <FormControl marginTop="12x">
                  <FormLabel>{index + 1} SET</FormLabel>
                  <Input
                    placeholder=""
                    type="number"
                    onChange={(e) =>
                      onChangeMandanteSets(e.target.value, index)
                    }
                  />
                </FormControl>
              ))}
            </Grid>
            <FormLabel marginTop="12px">Visitante:</FormLabel>
            <Grid gridTemplateColumns={`repeat(${totalSets}, 1fr)`} gap="20px">
              {Array.from<Number>(new Array(totalSets)).map((_, index) => (
                <FormControl marginTop="12x">
                  <FormLabel>{index + 1} SET</FormLabel>
                  <Input
                    placeholder=""
                    type="number"
                    onChange={(e) =>
                      onChangeVisitanteSets(e.target.value, index)
                    }
                  />
                </FormControl>
              ))}
            </Grid>
          </>
        )}
      </Box>
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
          {totalSets > 0 && (
            <Button colorScheme="blue" mr={3} onClick={checkSets}>
              Finalizar
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
