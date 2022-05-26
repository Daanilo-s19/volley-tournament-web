import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
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
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Coach } from "../../../../entities/person/coach";
import { api } from "../../../../libs/axios";
import parseResponseData from "../../../../utils/parsers";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { CoachTable } from "./table";
import dayjs from "dayjs";
import { AssistantStaff } from "./assistants";
import { Team } from "../../../../entities/team";

export type ModalType = "create" | "edit";

interface CreateCoachForm {
  nome: string;
  documento: string;
  genero: string;
  dataNascimento: string;
  documentoCbv: string;
  documentoCref: string;
}

export default function CoachingStaff() {
  const [modalStatus, setModalStatus] = useState<ModalType>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCoachForm>();

  const toast = useToast();

  const {
    query: { idEquipe },
  } = useRouter();

  const {
    data: team,
    refetch: refetchEquipe,
    isLoading: isLoadingTeam,
    isError: isErrorTeam,
  } = useQuery<Team>(
    ["equipe", idEquipe],
    () => api.get(`/equipe/${idEquipe}`).then(parseResponseData),
    { onSuccess: (d) => console.log(d), enabled: Boolean(idEquipe) }
  );

  const { mutate: createCoachMutation, isLoading: isLoadingCreateCoach } =
    useMutation(
      (newCoach: CreateCoachForm) =>
        api.post("/pessoa/tecnico", {
          idEquipe: idEquipe,
          ...newCoach,
        }),
      {
        onSuccess: () => {
          toast({
            title: "Sucesso.",
            description: "Técnico criado com sucesso.",
            status: "success",
            duration: 9000,
            position: "bottom-right",
            isClosable: true,
          });
          reset();
          setModalStatus(undefined);
          refetchEquipe();
        },
        onError: () => {
          toast({
            title: "Ops.",
            description: "Houve algum erro ao cadastrar um técnico. ",
            status: "error",
            position: "bottom-right",
            duration: 9000,
            isClosable: true,
          });
        },
      }
    );

  function createCoach({ dataNascimento, genero, ...rest }: CreateCoachForm) {
    createCoachMutation({
      dataNascimento: dayjs(dataNascimento).toISOString(),
      genero: genero.toLowerCase(),
      ...rest,
    });
  }

  function editCoach(updatedCoach: CreateCoachForm) {
    console.log(updatedCoach);
  }

  function closeCreateCoachingStaff() {
    setModalStatus(undefined);
  }

  return (
    <Box>
      <Flex direction="column" gap="4">
        <Box>
          <Heading as="h3" size="lg" margin="48px 0 0">
            Técnico
          </Heading>
          <Flex
            flexDirection="row"
            alignContent="center"
            justifyContent="space-between"
          >
            <Text fontSize="lg" marginY="24px">
              Dados do técnico do clube.
            </Text>
            <Tooltip label="Adicionar técnico">
              <IconButton
                colorScheme="blue"
                aria-label="adicionar técnico"
                icon={<AddIcon />}
                onClick={() => setModalStatus("create")}
                isRound
              />
            </Tooltip>
          </Flex>
          <CoachTable
            items={team?.tecnico ? [team.tecnico] : []}
            loading={isLoadingTeam}
            error={isErrorTeam}
          />
        </Box>

        <AssistantStaff
          assistants={team?.auxiliares ?? []}
          isLoadingAssistants={isLoadingTeam}
          isErrorAssistants={isErrorTeam}
          refetchAssistants={refetchEquipe}
        />
      </Flex>

      <Modal isOpen={Boolean(modalStatus)} onClose={closeCreateCoachingStaff}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            {modalStatus === "create" ? "Adicionar Técnico" : "Editar Técnico"}
          </ModalHeader>

          <form
            onSubmit={handleSubmit(
              modalStatus === "create" ? createCoach : editCoach
            )}
          >
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input {...register("nome", { required: true })} />
                {errors.nome && (
                  <Text color="red" fontSize="10">
                    Insira o nome do técnico
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Gênero</FormLabel>
                <Input
                  {...register("genero", {
                    required: true,
                    validate: (genero) =>
                      genero.toLowerCase() === "feminino" ||
                      genero.toLowerCase() === "masculino",
                  })}
                />
                {errors.genero && (
                  <Text color="red" fontSize="10">
                    Insira um gênero valido
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>CPF</FormLabel>
                <Input
                  {...register("documento", {
                    required: true,
                    validate: isValidCPF,
                  })}
                />
                {errors.documento && (
                  <Text color="red" fontSize="10">
                    Insira um CPF valido
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Documento CBV</FormLabel>
                <Input
                  {...register("documentoCbv", {
                    required: true,
                    minLength: 11,
                    maxLength: 11,
                  })}
                />
                {errors.documentoCbv && (
                  <Text color="red" fontSize="10">
                    {errors.documentoCbv.type === "minLength" ||
                    errors.documentoCbv.type === "maxLength"
                      ? "Insira um documento CBV válido"
                      : "Insira um documento CBV"}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Documento CREF</FormLabel>
                <Input
                  {...register("documentoCref", {
                    required: true,
                    maxLength: 11,
                    minLength: 11,
                  })}
                />
                {errors.documentoCref && (
                  <Text color="red" fontSize="10">
                    {errors.documentoCref.type === "minLength" ||
                    errors.documentoCref.type === "maxLength"
                      ? "Insira um documento CREF válido"
                      : "Insira um documento CREF"}
                  </Text>
                )}
              </FormControl>
              {modalStatus === "create" && (
                <FormControl>
                  <FormLabel>Data de nascimento</FormLabel>
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
                      {errors.dataNascimento.type === "validate"
                        ? "O técnico não pode possuir idade inferior a 15 anos"
                        : "Insira uma data de nascimento"}
                    </Text>
                  )}
                </FormControl>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  setModalStatus(undefined);
                }}
                mr={3}
              >
                Fechar
              </Button>
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isLoadingCreateCoach}
              >
                {modalStatus === "create" ? "Criar" : "Editar"}
              </Button>
            </ModalFooter>
          </form>

          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </Box>
  );
}
