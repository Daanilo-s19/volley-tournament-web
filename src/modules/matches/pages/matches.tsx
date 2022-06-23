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
