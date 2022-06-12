import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
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
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useLeague from "../../hooks/useLeague";

export interface Props {
  onChange(value: string): void;
}

export default function SelectLeague({ onChange }: Props) {
  const {
    leagues,
    currentLeague,
    isOpen,
    onOpen,
    onClose,
    register,
    handleSubmit,
    reset,
    errors,
    onSubmit,
  } = useLeague();

  const renderLeagues = () => {
    return (
      <Select
        placeholder=" Selecionar Liga"
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

  const renderCreateLeague = () => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Criar Liga"}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nome da liga</FormLabel>
                <Input
                  placeholder="Nome da liga"
                  {...register("nome", { required: true })}
                />
                {errors.nome && (
                  <Text color="red" fontSize="10">
                    Insira o nome da liga
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Gênero</FormLabel>
                <Select
                  placeholder="Gênero"
                  {...register("genero", { required: true })}
                >
                  <option value="masculino">masculino</option>
                  <option value="feminino">feminino</option>
                </Select>
                {errors.genero && (
                  <Text color="red" fontSize="10">
                    Insira o genero
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">serie</FormLabel>
                <Select
                  placeholder="Série"
                  {...register("serie", { required: true })}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="Open">Open</option>
                </Select>
                {errors.serie && (
                  <Text color="red" fontSize="10">
                    Insira a serie
                  </Text>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit" mr={3}>
                Criar Liga
              </Button>
              <Button onClick={onClose}>Fechar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  };
  return (
    <>
      <Heading as="h4" size="md" margin="24px 0 12px">
        Selecionar Liga
      </Heading>
      <Flex alignItems="center" justifyContent="space-between">
        {renderLeagues()}
        <Spacer />
        <IconButton
          colorScheme="blue"
          aria-label="Adicionar Liga"
          margin="8px 8px 0px 0px"
          icon={<AddIcon />}
          onClick={() => {
            reset();
            onOpen();
          }}
          isRound
        />
      </Flex>
      {isOpen && renderCreateLeague()}
    </>
  );
}
