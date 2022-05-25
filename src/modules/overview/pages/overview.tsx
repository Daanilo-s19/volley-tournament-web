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
import useOverview from "../hooks/useOverview";
import GenericTable from "../components/genericTable";

export function OverviewPage() {
  const {
    isOpenCreateTeam,
    onOpenCreateTeam,
    onCloseCreateTeam,

    isOpenEditTeam,
    onOpenEditTeam,
    onCloseEditTeam,

    onSubmitTeam,
    onDeleteTeam,
    onDeleteLeague,
    onFetchTeams,
    initializeLeague,

    register,
    handleSubmit,
    errors,

    state,
    teams,
    leagues,
    user,
    currentLeague,
    currentTeam,
    setcurrentTeam,
    reset,
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
                  {...register("urlLogo", { required: true })}
                />
                {errors.urlLogo && (
                  <Text color="red" fontSize="10">
                    Insira o brasão do clube
                  </Text>
                )}
              </FormControl>

              {isOpenCreateTeam && (
                <>
                  <Heading as="h4" size="md" margin="48px 0 12px">
                    Informações do ginásio
                  </Heading>
                  <FormControl mt={4}>
                    <FormLabel>Nome do Ginásio</FormLabel>
                    <Input
                      placeholder="nome do ginásio"
                      {...register("nameStadium", { required: true })}
                    />
                    {errors.nameStadium && (
                      <Text color="red" fontSize="10">
                        Insira o nome do Ginásio
                      </Text>
                    )}
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Estado</FormLabel>
                    <Input
                      placeholder="estado"
                      max={2}
                      {...register("state", {
                        maxLength: {
                          value: 2,
                          message: "Digita apenas o acrônimo da cidade",
                        },
                      })}
                    />
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
  const renderLeagues = () => {
    return (
      <Select
        placeholder=" Selecionar Liga"
        margin="0 0 12px"
        onChange={(e) => onFetchTeams(e.target.value)}
      >
        {leagues.map((e) => (
          <option value={e.id} selected={currentLeague?.id === e.id}>
            {e.nome ?? "-"}
          </option>
        ))}
      </Select>
    );
  };
  return (
    <Box>
      <Heading as="h3" size="lg" margin="48px 0 0">
        {user?.token && `Bem vindo, ${user.token}`}
      </Heading>
      <Heading as="h4" size="md" margin="24px 0 12px">
        Selecionar Liga
      </Heading>
      {renderLeagues()}
      <Box>
        <Text>
          <b>id: </b> {currentLeague?.id}
        </Text>
        <Text>
          <b>Serie: </b>
          {currentLeague?.serie}
        </Text>
        <Text>
          <b>Gênero: </b>
          {currentLeague?.genero}
        </Text>
        <Text>
          <b>iniciada em: </b> {currentLeague?.iniciadaEm}
        </Text>
        {/* <Box>
          <IconButton
            colorScheme="blue"
            aria-label="Iniciar Liga"
            margin="8px 8px 0px 0px"
            icon={<CheckCircleIcon />}
            onClick={() => {
              initializeLeague(currentLeague.id);
            }}
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
        </Box> */}
      </Box>
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
          Acompanhe e realize alterações em um clube.
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
        loading={state.loading}
        error={state.error}
        onEdit={(item) => {
          reset({ ...item });
          setcurrentTeam(item);
          onOpenEditTeam();
        }}
        onDelete={(item) => onDeleteTeam(item.id)}
      />
      {(isOpenCreateTeam || isOpenEditTeam) && renderCreateClubModal()}
    </Box>
  );
}
