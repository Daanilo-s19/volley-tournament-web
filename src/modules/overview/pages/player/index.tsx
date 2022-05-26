import React from "react";
import { AddIcon, DeleteIcon, CheckCircleIcon } from "@chakra-ui/icons";
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
  Select,
  Divider,
} from "@chakra-ui/react";
import usePlayer from "../../hooks/usePlayer";
import PlayerTable from "../../components/playerTable";
import dayjs from "dayjs";

export function PlayerPage() {
  const {
    isOpenPlayer,
    onOpenPlayer,
    onClosePlayer,

    isOpenEditPlayer,
    onOpeneditPlayer,
    onCloseEditPlayer,

    onSubmitTeam,
    onDeletePlayer,
    onFetchPlayers,

    register,
    handleSubmit,
    errors,

    state,
    players,
    user,
    currentPlayer,
    setCurrentPlayer,
    reset,
  } = usePlayer();

  const renderModal = () => {
    return (
      <Modal
        isOpen={isOpenPlayer || isOpenEditPlayer}
        onClose={onClosePlayer || onCloseEditPlayer}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isOpenPlayer ? "Adicionar jogador" : "Editar Jogador"}
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmitTeam)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nome do jogador</FormLabel>
                <Input
                  placeholder="Nome do jogador"
                  defaultValue={currentPlayer?.nome}
                  {...register("nome", { required: true })}
                />
                {errors.nome && (
                  <Text color="red" fontSize="10">
                    Insira o nome do jogador
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">data de nascimento</FormLabel>
                <Input
                  type="date"
                  {...register("idade", {
                    required: true,
                    validate: (date) => {
                      return dayjs(date).diff(dayjs(), "y") <= -15;
                    },
                  })}
                />
                {errors.idade && (
                  <Text color="red" fontSize="10">
                    Insira a idade do jogador
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Posição</FormLabel>
                <Select
                  defaultValue={currentPlayer?.posicao}
                  placeholder="Posição"
                  {...register("posicao", { required: true })}
                >
                  <option value="ponta">ponta</option>
                  <option value="oposto">oposto</option>
                  <option value="central">central</option>
                  <option value="libero">libero</option>
                  <option value="levantador">levantador</option>
                </Select>
                {errors.posicao && (
                  <Text color="red" fontSize="10">
                    Insira a posição do jogador
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Número</FormLabel>
                <Input
                  placeholder="Número do jogador"
                  defaultValue={currentPlayer?.numero}
                  {...register("numero", { required: true })}
                />
                {errors.numero && (
                  <Text color="red" fontSize="10">
                    Insira o número do jogador
                  </Text>
                )}
              </FormControl>
              {isOpenPlayer && (
                <>
                  <FormControl>
                    <FormLabel marginTop="12px">RG/CPF</FormLabel>
                    <Input
                      placeholder="RG/CPF"
                      defaultValue={currentPlayer?.documento}
                      {...register("documento", { required: true })}
                    />
                    {errors.documento && (
                      <Text color="red" fontSize="10">
                        Insira documento do jogador
                      </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel marginTop="12px">Documento CBV</FormLabel>
                    <Input
                      placeholder="Documento CBV"
                      defaultValue={currentPlayer?.documentoCbv}
                      {...register("documentoCbv", { required: true })}
                    />
                    {errors.documentoCbv && (
                      <Text color="red" fontSize="10">
                        Insira o documentoCbv do jogador
                      </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel marginTop="12px">Gênero</FormLabel>
                    <Select
                      defaultValue={currentPlayer?.genero}
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
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit" mr={3}>
                {isOpenPlayer ? "Cadastrar jogador" : "Editar jogador"}
              </Button>
              <Button
                onClick={() => {
                  onClosePlayer();
                  onCloseEditPlayer();
                  setCurrentPlayer(null);
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
      <Heading as="h3" size="lg" margin="48px 0 12px">
        Atletas do clube {currentPlayer?.nome ?? ""}
      </Heading>
      <Flex
        flexDirection="row"
        alignContent="center"
        justifyContent="space-between"
      >
        <Text fontSize="lg" marginY="24px">
          Acompanhe e realize alterações nos jogadores
        </Text>
        <Tooltip label="Adicionar jogador">
          <IconButton
            colorScheme="blue"
            aria-label="adicionar jogador"
            icon={<AddIcon />}
            onClick={() => {
              reset();
              onOpenPlayer();
            }}
            isRound
          />
        </Tooltip>
      </Flex>
      <PlayerTable
        items={players}
        loading={state.loading}
        error={state.error}
        onEdit={(item) => {
          reset({ ...item });
          setCurrentPlayer(item);
          onOpeneditPlayer();
        }}
        onDelete={(item) => onDeletePlayer(item.id)}
      />
      {(isOpenPlayer || isOpenEditPlayer) && renderModal()}
    </Box>
  );
}
