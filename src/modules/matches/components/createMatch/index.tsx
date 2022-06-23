import { useDisclosure } from "@chakra-ui/hooks";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose(): void;
}

export default function CreateMatchModal({ isOpen, onClose }: Props) {
  const renderReferees = () => {
    return (
      <FormControl>
        <FormLabel marginTop="28px">Selecionar Árbitros</FormLabel>
        <Grid gridTemplateColumns="repeat(4,1fr)" gap="20px">
          <Select
            marginBottom="8px"
            placeholder="Árbitro principal"
            // {...register("personType", { required: true })}
          >
            <option value="NOME">NOME</option>
          </Select>
          {/* {errors.genero && (
                <Text color="red" fontSize="10">
                  Insira o tipo do cadastro
                </Text>
              )} */}

          <Select
            marginBottom="8px"
            placeholder="Segundo Árbitro"
            // {...register("personType", { required: true })}
          >
            <option value="NOME">NOME</option>
          </Select>
          <Select
            marginBottom="8px"
            placeholder="Terceiro Árbitro"
            // {...register("personType", { required: true })}
          >
            <option value="NOME">NOME</option>
          </Select>
          <Select
            marginBottom="8px"
            placeholder="Quarto Árbitro"
            // {...register("personType", { required: true })}
          >
            <option value="NOME">NOME</option>
          </Select>
        </Grid>
      </FormControl>
    );
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
            <FormLabel marginTop="28px">Mandante: Clube A</FormLabel>
            <Checkbox>Desistência</Checkbox>
          </FormControl>
          {renderPlayerByPosition()}
        </Box>
        <Box>
          <FormControl>
            <FormLabel marginTop="28px">Visitante: Clube B</FormLabel>
            <Checkbox>Desistência</Checkbox>
          </FormControl>
          {renderPlayerByPosition()}
        </Box>
      </Grid>
    );
  };

  const renderPlayerByPosition = () => {
    return (
      <Box>
        <FormControl>
          <FormLabel marginTop="12px">Ponta</FormLabel>
          <Select
            placeholder="Ponta"
            // {...register("personType", { required: true })}
          >
            <option value="NOME">NOME</option>
          </Select>
          {/* {errors.genero && (
                <Text color="red" fontSize="10">
                  Insira o tipo do cadastro
                </Text>
              )} */}
        </FormControl>
        <FormControl>
          <FormLabel marginTop="12px">Oposto</FormLabel>
          <Select
            placeholder="Oposto"
            // {...register("personType", { required: true })}
          >
            <option value="NOME">NOME</option>
          </Select>
          {/* {errors.genero && (
                <Text color="red" fontSize="10">
                  Insira o tipo do cadastro
                </Text>
              )} */}
        </FormControl>
        <FormControl>
          <FormLabel marginTop="12px">Central</FormLabel>
          <Select
            placeholder="Central"
            // {...register("personType", { required: true })}
          >
            <option value="NOME">NOME</option>
          </Select>
          {/* {errors.genero && (
                <Text color="red" fontSize="10">
                  Insira o tipo do cadastro
                </Text>
              )} */}
        </FormControl>
        <FormControl>
          <FormLabel marginTop="12px">Libero</FormLabel>
          <Select
            placeholder="Libero"
            // {...register("personType", { required: true })}
          >
            <option value="NOME">NOME</option>
          </Select>
          {/* {errors.genero && (
                <Text color="red" fontSize="10">
                  Insira o tipo do cadastro
                </Text>
              )} */}
        </FormControl>
        <FormControl>
          <FormLabel marginTop="12px">Levantador</FormLabel>
          <Select
            placeholder="Levantador"
            // {...register("personType", { required: true })}
          >
            <option value="NOME">NOME</option>
          </Select>
          {/* {errors.genero && (
                <Text color="red" fontSize="10">
                  Insira o tipo do cadastro
                </Text>
              )} */}
        </FormControl>
      </Box>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar partida</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormControl>
              <FormLabel marginTop="12px">Selecionar delegado</FormLabel>
              <Select
                placeholder="Selecionar delegado"
                // {...register("personType", { required: true })}
              >
                <option value="NOME">NOME</option>
              </Select>
              {/* {errors.genero && (
                <Text color="red" fontSize="10">
                  Insira o tipo do cadastro
                </Text>
              )} */}
            </FormControl>
            {renderReferees()}
            {renderPlayersClub()}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
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
