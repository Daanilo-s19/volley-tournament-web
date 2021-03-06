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
  Checkbox,
  Stack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Badge,
  Grid,
} from "@chakra-ui/react";
import useOverview from "../hooks/useOverview";
import GenericTable from "../components/genericTable";
import SelectLeague from "../../leagues/components/selectLeague";
import dayjs from "dayjs";
import { DayType } from "../../leagues/types/leagueType";
import { statesList } from "../../../utils/states";

export function OverviewPage() {
  const {
    isOpenCreateTeam,
    onOpenCreateTeam,
    onCloseCreateTeam,

    isOpenEditTeam,
    onOpenEditTeam,
    onCloseEditTeam,

    isOpenInitializeLeague,
    onOpenInitializeLeague,
    onCloseInitializeLeague,
    initializeLeague,

    onSubmitTeam,
    onDeleteTeam,
    onDeleteLeague,
    onFetchTeams,

    register,
    handleSubmit,
    errors,
    registerLeague,
    handleSubmitLeague,
    resetLeague,
    errorsLeague,

    checkDayofWeek,
    addNewHour,

    addNewDay,

    state,
    teams,
    leagues,
    user,
    currentLeague,
    currentTeam,
    setcurrentTeam,
    reset,
    isLoadingLeagues,
    hoursGame,
    setCurrentHour,
    setLeagueID,
  } = useOverview();

  const missingHour =
    checkDayofWeek.length > 0
      ? (6 / checkDayofWeek.length - hoursGame.length).toFixed()
      : "-";

  const renderInitializeLeague = () => {
    return (
      <Modal isOpen={isOpenInitializeLeague} onClose={onCloseInitializeLeague}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inicializar liga</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmitLeague(initializeLeague)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel marginTop="12px">Inicializar:</FormLabel>
                <Select
                  placeholder="Inicializar:"
                  {...registerLeague("inicializar", { required: true })}
                >
                  <option value="inicializa">Classifica????o</option>
                  <option value="inicializa-quartas">quartas de final</option>
                  <option value="inicializa-semis">Semi final</option>
                  <option value="inicializa-final">Final</option>
                </Select>
                {errorsLeague.inicializar && (
                  <Text color="red" fontSize="10">
                    insira a chave de inicializa????o
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Inicar em:</FormLabel>
                <Input
                  type="date"
                  {...registerLeague("startAt", {
                    required: true,
                    validate: (date) => {
                      return dayjs(date).diff(dayjs(), "y") <= 1;
                    },
                  })}
                />
                {errorsLeague.startAt && (
                  <Text color="red" fontSize="10">
                    Insira a data de inicio da liga
                  </Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Dias da semana:</FormLabel>
                <Grid gridTemplateColumns="repeat(3, 1fr)">
                  {(
                    [
                      "Segunda",
                      "Ter??a",
                      "Quarta",
                      "Quinta",
                      "Sexta",
                      "S??bado",
                      "Domingo",
                    ] as DayType[]
                  ).map((e) => (
                    <Checkbox
                      isChecked={checkDayofWeek.includes(e)}
                      disabled={
                        checkDayofWeek.length === 6 &&
                        !checkDayofWeek.includes(e)
                      }
                      onChange={(_) => addNewDay(e)}
                    >
                      {e}
                    </Checkbox>
                  ))}
                </Grid>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>
                  {[NaN, 4, 5].includes(checkDayofWeek.length)
                    ? "Necess??rio adicionar mais um dia da semana"
                    : `Hor??rio dos jogos: Faltam (${missingHour}) hor??rios`}
                </FormLabel>
                <Flex>
                  <Input
                    type="time"
                    onChange={(time) => setCurrentHour(time.target.value)}
                  />
                  {missingHour > "0" && (
                    <IconButton
                      marginLeft="16px"
                      colorScheme="green"
                      aria-label="adicionar hor??rio"
                      icon={<AddIcon />}
                      onClick={() => {
                        addNewHour();
                      }}
                      isRound
                    />
                  )}
                </Flex>
                {hoursGame.map((e) => (
                  <Badge
                    variant="outline"
                    colorScheme="green"
                    onClick={() => addNewHour(e)}
                  >
                    {e}
                  </Badge>
                ))}
              </FormControl>
              {/* <FormControl mt={4}>
                <FormLabel>Intervalo dos jogos</FormLabel>
                <Input
                  type="number"
                  max="5"
                  {...registerLeague("interval", {
                    required: true,
                  })}
                />
                {errorsLeague.interval && (
                  <Text color="red" fontSize="10">
                    Insirao intervalo dos jogos
                  </Text>
                )}
              </FormControl> */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit" mr={3}>
                confirmar
              </Button>
              <Button
                onClick={() => {
                  resetLeague();
                  onCloseInitializeLeague();
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
                  defaultValue={currentTeam?.nome}
                  {...register("nameTeam", { required: true })}
                />
                {errors.nameTeam && (
                  <Text color="red" fontSize="10">
                    Insira o nome do clube
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>url do brasao</FormLabel>
                <Input
                  placeholder="url do brasao"
                  defaultValue={currentTeam?.urlBrasao}
                  {...register("urlLogo", { required: false })}
                />
              </FormControl>

              {isOpenCreateTeam && (
                <>
                  <Heading as="h4" size="md" margin="48px 0 12px">
                    Informa????es do gin??sio
                  </Heading>
                  <FormControl mt={4}>
                    <FormLabel>Nome do Gin??sio</FormLabel>
                    <Input
                      placeholder="nome do gin??sio"
                      {...register("nameStadium", { required: true })}
                    />
                    {errors.nameStadium && (
                      <Text color="red" fontSize="10">
                        Insira o nome do Gin??sio
                      </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Estado</FormLabel>
                    <Select
                      placeholder="Estado"
                      {...register("state", { required: true })}
                    >
                      {statesList.map((e) => (
                        <option value={e}>{e}</option>
                      ))}
                    </Select>
                    {errors.state && (
                      <Text color="red" fontSize="10">
                        Insira o estado
                      </Text>
                    )}
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Cidade</FormLabel>
                    <Input
                      placeholder="Cidade"
                      {...register("city", { required: true })}
                    />
                    {errors.city && (
                      <Text color="red" fontSize="10">
                        Insira a cidade
                      </Text>
                    )}
                  </FormControl>
                </>
              )}
            </ModalBody>{" "}
            <ModalFooter>
              <Button colorScheme="blue" type="submit" mr={3}>
                {isOpenCreateTeam ? "Criar clube" : "Editar clube"}
              </Button>
              <Button
                onClick={() => {
                  onCloseCreateTeam();
                  onCloseEditTeam();
                  setcurrentTeam(null);
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
        {user?.token && `Bem vindo, ${user.token}`}
      </Heading>
      <SelectLeague
        onChange={(e) => {
          onFetchTeams(e);
          setLeagueID(e);
        }}
      />
      <Box>
        <Text>
          <b>id: </b> {currentLeague?.id}
        </Text>
        <Text>
          <b>Serie: </b>
          {currentLeague?.serie}
        </Text>
        <Text>
          <b>G??nero: </b>
          {currentLeague?.genero}
        </Text>
        <Text>
          <b>iniciada em: </b> {currentLeague?.iniciadaEm}
        </Text>
        <Box>
          <IconButton
            colorScheme="green"
            aria-label="Iniciar Liga"
            margin="8px 8px 0px 0px"
            icon={<CheckCircleIcon />}
            onClick={onOpenInitializeLeague}
            isRound
          />
          <IconButton
            colorScheme="red"
            aria-label="Excluir Liga"
            margin="8px 8px 0px 0px"
            icon={<DeleteIcon />}
            onClick={() => {
              onDeleteLeague(currentLeague.id);
            }}
            isRound
          />
        </Box>
      </Box>
      {currentLeague && (
        <>
          <Divider margin={"24px 0"} />
          <Heading as="h3" size="lg" margin="48px 0 12px">
            Gerenciamento da Liga {currentLeague?.nome ?? ""}
          </Heading>

          <Flex
            flexDirection="row"
            alignContent="center"
            justifyContent="space-between"
          >
            <Text fontSize="lg" marginY="24px">
              Acompanhe e realize altera????es em um clube.
            </Text>
            <Tooltip label="Adicionar clube">
              <IconButton
                colorScheme="blue"
                aria-label="adicionar Clube"
                icon={<AddIcon />}
                onClick={() => {
                  reset();
                  onOpenCreateTeam();
                }}
                isRound
              />
            </Tooltip>
          </Flex>
          <GenericTable
            items={teams}
            loading={state.loading || isLoadingLeagues}
            error={state.error}
            onEdit={(item) => {
              reset({ ...item });
              setcurrentTeam(item);
              onOpenEditTeam();
            }}
            onDelete={(item) => onDeleteTeam(item.id)}
          />
        </>
      )}

      {(isOpenCreateTeam || isOpenEditTeam) && renderCreateClubModal()}
      {isOpenInitializeLeague && renderInitializeLeague()}
    </Box>
  );
}
