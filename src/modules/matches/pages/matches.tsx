import React from "react";
import Link from "next/link";
import {
  EditIcon,
  AddIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@chakra-ui/icons";
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
  Select,
  Grid,
  Spacer,
} from "@chakra-ui/react";
import MatchesTables from "../components/matchesTable";
import PersonTable from "../components/personTable";

import useMatches from "../hooks/useMatches";
import SelectLeague from "../../leagues/components/selectLeague";
import dayjs from "dayjs";
import MatchCard from "../components/matchCard";
import CreateMatchModal from "../components/createMatch";

export function MatchesPage() {
  const {
    referees,
    isLoadingReferee,
    isErrorReferee,
    refetchReferee,
    isLoadingCreateReferee,

    delegates,
    isLoadingDelegates,
    isErrorDelegates,
    refetchDelegates,
    isLoadingCreateDelegate,

    register,
    handleSubmit,
    reset,
    errors,

    isOpen,
    onOpen,
    onClose,

    isOpenEdit,
    onOpenEdit,
    onCloseEdit,

    onSubmit,
    setLeagueID,
    round,
    selectRound,

    registerResult,
    handleSubmitResult,
    resetResult,
    errorsResult,

    isOpenCreateResult,
    onOpenCreateResult,
    onCloseCreateResult,

    isOpenEditResult,
    onOpenEditResult,
    onCloseEditResult,

    isOpenCreateMatch,
    onOpenCreateMatch,
    onCloseCreateMatch,

    dataMatches,
    openMatch,
    match,

    dataHomePlayers,
    dataVisitingPlayers,
    isLoadingHomePlayers,
    isLoadingVisitingPlayers,
  } = useMatches();

  const renderModal = () => {
    return (
      <Modal isOpen={isOpen || isOpenEdit} onClose={onClose || onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isOpen ? "Adicionar" : "Editar"}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel marginTop="12px">Tipo de cadastro</FormLabel>
                <Select
                  placeholder="Tipo de cadastro"
                  {...register("personType", { required: true })}
                >
                  <option value="arbitro">arbitro</option>
                  <option value="delegado">delegado</option>
                </Select>
                {errors.genero && (
                  <Text color="red" fontSize="10">
                    Insira o tipo do cadastro
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input
                  placeholder="Nome "
                  {...register("nome", { required: true })}
                />
                {errors.nome && (
                  <Text color="red" fontSize="10">
                    Insira o nome
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">data de nascimento</FormLabel>
                <Input
                  type="date"
                  {...register("dataNascimento", {
                    required: true,
                    validate: (date) => {
                      return dayjs(date).diff(dayjs(), "y") <= -15;
                    },
                  })}
                />
                {errors.dataNascimento && (
                  <Text color="red" fontSize="10">
                    Insira a data de nascimento
                  </Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel marginTop="12px">RG/CPF</FormLabel>
                <Input
                  placeholder="RG/CPF"
                  {...register("documento", { required: true })}
                />
                {errors.documento && (
                  <Text color="red" fontSize="10">
                    Insira o documento
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Documento CBV</FormLabel>
                <Input
                  placeholder="Documento CBV"
                  {...register("documentoCbv", { required: true })}
                />
                {errors.documentoCbv && (
                  <Text color="red" fontSize="10">
                    Insira o documentoCbv
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
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit" mr={3}>
                {isOpen ? "Cadastrar" : "Editar jogador"}
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  onCloseEdit();
                  // setCurrentPlayer(null);
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

  const renderModalResult = () => {
    return (
      <Modal isOpen={isOpenCreateResult || isOpenEditResult} onClose={onCloseCreateResult || onCloseEditResult}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isOpenCreateResult ? "Adicionar" : "Editar"}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmitResult(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Primeiro Time</FormLabel>
                <Input
                  placeholder="Nome Time "
                  {...registerResult("nomeTime1", { required: true })}
                />
                {errorsResult.nomeTime1 && (
                  <Text color="red" fontSize="10">
                    Insira o nome do Primeiro Time
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Segundo Time</FormLabel>
                <Input
                  placeholder="Nome Time "
                  {...registerResult("nomeTime2", { required: true })}
                />
                {errorsResult.nomeTime2 && (
                  <Text color="red" fontSize="10">
                    Insira o nome do Segundo Time
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Data do Jogo</FormLabel>
                <Input
                  type="date"
                  {...registerResult("dataJogo", {
                    required: true,
                    validate: (date) => {
                      return dayjs(date).diff(dayjs(), "d") < 0; // Testar essa condição
                    },
                  })}
                />
                {errorsResult.dataNascimento && (
                  <Text color="red" fontSize="10">
                    Insira a data do jogo
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Primeiro Set Time 1</FormLabel>
                <Input
                  type="number"
                  min="0"
                  placeholder="Primeiro Set Time 1"
                  {...registerResult("primeiroSetT1", { required: true })}
                />
                {errorsResult.primeiroSetT1 && (
                  <Text color="red" fontSize="10">
                    Insira o Resultado do primeiro Set do Time 1
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Primeiro Set Time 2</FormLabel>
                <Input
                  type="number"
                  min="0"
                  placeholder="Primeiro Set Time 2"
                  {...registerResult("primeiroSetT2", { required: true })}
                />
                {errorsResult.primeiroSetT2 && (
                  <Text color="red" fontSize="10">
                    Insira o Resultado do primeiro Set do Time 2
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Segundo Set Time 1</FormLabel>
                <Input
                  type="number"
                  min="0"
                  placeholder="Segundo Set Time 1"
                  {...registerResult("segundoSetT1", { required: true })}
                />
                {errorsResult.segundoSetT1 && (
                  <Text color="red" fontSize="10">
                    Insira o Resultado do segundo Set do Time 1
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Segundo Set Time 2</FormLabel>
                <Input
                  type="number"
                  min="0"
                  placeholder="Segundo Set Time 2"
                  {...registerResult("segundoSetT2", { required: true })}
                />
                {errorsResult.segundoSetT2 && (
                  <Text color="red" fontSize="10">
                    Insira o Resultado do segundo Set do Time 2
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Terceiro Set Time 1</FormLabel>
                <Input
                  type="number"
                  min="0"
                  placeholder="Terceiro Set Time 1"
                  {...registerResult("terceiroSetT1", { required: true })}
                />
                {errorsResult.terceiroSetT1 && (
                  <Text color="red" fontSize="10">
                    Insira o Resultado do terceiro Set do Time 1
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Terceiro Set Time 2</FormLabel>
                <Input
                  type="number"
                  min="0"
                  placeholder="Terceiro Set Time 2"
                  {...registerResult("terceiroSetT2", { required: true })}
                />
                {errorsResult.terceiroSetT2 && (
                  <Text color="red" fontSize="10">
                    Insira o Resultado do terceiro Set do Time 2
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Quarto Set Time 1</FormLabel>
                <Input
                  type="number"
                  min="0"
                  placeholder="Quarto Set Time 1"
                  {...registerResult("quartoSetT1", { required: true })}
                />
                {errorsResult.quartoSetT1 && (
                  <Text color="red" fontSize="10">
                    Insira o Resultado do quarto Set do Time 1
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Quarto Set Time 2</FormLabel>
                <Input
                  type="number"
                  min="0"
                  placeholder="Quarto Set Time 2"
                  {...registerResult("quartoSetT2", { required: true })}
                />
                {errorsResult.quartoSetT2 && (
                  <Text color="red" fontSize="10">
                    Insira o Resultado do quarto Set do Time 2
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Quinto Set Time 1</FormLabel>
                <Input
                  type="number"
                  min="0"
                  placeholder="Quinto Set Time 1"
                  {...registerResult("quintoSetT1", { required: true })}
                />
                {errorsResult.quintoSetT1 && (
                  <Text color="red" fontSize="10">
                    Insira o Resultado do quinto Set do Time 1
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Quinto Set Time 2</FormLabel>
                <Input
                  type="number"
                  min="0"
                  placeholder="Quinto Set Time 2"
                  {...registerResult("quintoSetT2", { required: true })}
                />
                {errorsResult.quintoSetT2 && (
                  <Text color="red" fontSize="10">
                    Insira o Resultado do quinto Set do Time 2
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Sets Vencidos Time 1</FormLabel>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  placeholder="Sets Vencidos Time 1"
                  {...registerResult("setsVencidosT1", { required: true })}
                />
                {errorsResult.setsVencidosT1 && (
                  <Text color="red" fontSize="10">
                    Insira a Quantidade de Sets vencidos pelo Time 1
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel marginTop="12px">Sets Vencidos Time 2</FormLabel>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  placeholder="Sets Vencidos Time 2"
                  {...registerResult("setsVencidosT2", { required: true })}
                />
                {errorsResult.setsVencidosT2 && (
                  <Text color="red" fontSize="10">
                    Insira a Quantidade de Sets vencidos pelo Time 2
                  </Text>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit" mr={3}>
                {isOpenCreateResult ? "Cadastrar Resultado" : "Editar Resultado"}
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  onCloseEdit();
                  // setCurrentPlayer(null);
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
      <SelectLeague onStart={false} onChange={setLeagueID} />

      <Heading as="h3" size="lg" margin="48px 0 24px">
        Gerenciamento de Partida
      </Heading>
      <Flex
        flexDirection="row"
        alignContent="center"
        justifyContent="space-between"
      >
        <Text fontSize="lg" marginBottom="24px">
          Acompanhe e gerencie as partidas da liga.
        </Text>
        <Tooltip label="Adicionar Resultado">
          <IconButton
            colorScheme="blue"
            aria-label="adicionar Resultado"
            icon={<AddIcon />}
            onClick={onOpenCreateResult ?? onOpenEditResult}
            isRound
          />
        </Tooltip>
      </Flex>
      <FormControl>
        <FormLabel marginTop="12px">Selecionar rodada</FormLabel>
        <Select
          placeholder="rodada"
          onChange={(e) => selectRound(e.target.value)}
        >
          {Array.from<Number>(new Array(30)).map((_, index) => (
            <option value={index + 1}>{index + 1}</option>
          ))}

          {/* <option value="feminino">quartas de finais</option> */}
        </Select>
      </FormControl>
      <Box background="gray" padding="16px">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="medium" fontWeight="bold" color="white">
            Rodada {round}
          </Text>
        </Flex>
      </Box>
      <Grid gridTemplateColumns="1fr 1fr" gridAutoRows="1fr" gridGap="32px">
        {(dataMatches ?? []).map((e) => (
          <MatchCard
            mandante={e.mandante.equipe.nome}
            visistante={e.visitante.equipe.nome}
            mandantePts={e.mandante.pontuacao}
            visitantePts={e.visitante.pontuacao}
            horario={e.dataComeco}
            mandantePtsSet={e.mandante.pontosNosSets}
            visitantePtsSet={e.visitante.pontosNosSets}
            status={e.status}
            onClick={() => openMatch(e)}
          />
        ))}
      </Grid>
      <Flex
        flexDirection="row"
        alignContent="center"
        justifyContent="space-between"
        margin="60px 0 24px"
      >
        <Heading as="h3" size="lg">
          Gerenciamento de Arbitro e Delegado
        </Heading>

        <Tooltip label="Adicionar">
          <IconButton
            colorScheme="blue"
            aria-label="adicionar"
            icon={<AddIcon />}
            onClick={onOpen ?? onOpenEdit}
            isRound
          />
        </Tooltip>
      </Flex>
      <Heading as="h4" size="md" margin="48px 0 24px">
        Árbitros
      </Heading>

      <PersonTable
        items={referees}
        loading={isLoadingReferee || isLoadingCreateReferee}
        error={isErrorReferee}
        onEdit={(e) => console.log(e)}
        onDelete={(e) => console.log(e)}
      />
      <Heading as="h4" size="md" margin="48px 0 24px">
        Delegados
      </Heading>
      <PersonTable
        items={delegates}
        loading={isLoadingDelegates || isLoadingCreateDelegate}
        error={isErrorDelegates}
        onEdit={(e) => console.log(e)}
        onDelete={(e) => console.log(e)}
      />
      {(isOpen || isOpenEdit) && renderModal()}
      {(isOpenCreateResult || isOpenEditResult) && renderModalResult()}
      {isOpenCreateMatch && (
        <CreateMatchModal
          arbitros={referees}
          delegados={delegates}
          isOpen={isOpenCreateMatch}
          onClose={onCloseCreateMatch}
          mandante={match.mandante.equipe.nome}
          visitante={match.visitante.equipe.nome}
          homePlayer={dataHomePlayers}
          visitingPlayer={dataVisitingPlayers}
          loading={isLoadingHomePlayers || isLoadingVisitingPlayers}
        />
      )}
    </Box>
  );
}
