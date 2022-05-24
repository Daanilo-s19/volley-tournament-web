import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Text,
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
import useOverview from "../hooks/useOverview";
import GenericTable from "../components/genericTable";

export function OverviewPage() {
  const {
    isOpenCreateTeam,
    onCloseCreateTeam,
    onOpenCreateTeam,

    isOpenEditTeam,
    onOpenEditTeam,
    onCloseEditTeam,

    onDeleteTeam,
    onSubmitTeam,

    register,
    handleSubmit,
    errors,
    teams,
    state,
  } = useOverview();

  const renderCreateClubModal = () => {
    return (
      <Modal
        isOpen={isOpenCreateTeam || isOpenEditTeam}
        onClose={onCloseCreateTeam || onCloseEditTeam}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isOpenCreateTeam ? "Adicionar clube" : "Editar Clube"}
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmitTeam)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nome do clube</FormLabel>
                <Input
                  placeholder="Nome do clube"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <Text color="red" fontSize="10">
                    Insira o nome do clube
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Brasão</FormLabel>
                <Input
                  placeholder="brasão"
                  {...register("brasao", { required: true })}
                />
                {errors.brasao && (
                  <Text color="red" fontSize="10">
                    Insira o brasão do clube
                  </Text>
                )}
              </FormControl>
              {/* <FormControl mt={4}>
                <FormLabel>Endereço do clube</FormLabel>
                <Input
                  placeholder="Endereço do clube"
                  {...register("nameTeam", { required: true })}
                />
              </FormControl> */}
              {/* <FormControl mt={4}>
                <FormLabel>Estádio</FormLabel>
                <Input
                  placeholder="Estádio"
                  {...register("nameTeam", { required: true })}
                />
              </FormControl> */}
              {/* <FormControl mt={4}>
                <FormLabel>Mascote</FormLabel>
                <Input
                  placeholder="Descreva o seu mascote."
                  {...register("nameTeam", { required: true })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Cores do clube</FormLabel>
                <Input
                  placeholder="cores do clube"
                  {...register("nameTeam", { required: true })}
                />
              </FormControl> */}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" type="submit" mr={3}>
                Criar clube
              </Button>
              <Button
                onClick={() => {
                  onCloseCreateTeam();
                  onCloseEditTeam();
                }}
              >
                Fechar
              </Button>
            </ModalFooter>
          </form>
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
            onClick={onOpenCreateTeam}
            isRound
          />
        </Tooltip>
      </Flex>
      <GenericTable
        items={teams}
        loading={state.loading}
        error={state.error}
        onEdit={(item) => {
          onOpenEditTeam();
        }}
        onDelete={onDeleteTeam}
      />
      {(isOpenCreateTeam || isOpenEditTeam) && renderCreateClubModal()}
    </Box>
  );
}
