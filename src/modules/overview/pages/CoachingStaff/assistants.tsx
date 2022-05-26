import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Text,
  Flex,
  Tooltip,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  Select,
  Button,
  ModalCloseButton,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ModalType } from ".";
import {
  Assistant,
  AssistantType,
} from "../../../../entities/person/assistant";
import { api } from "../../../../libs/axios";
import { ASSISTANT_TYPES } from "../../../../utils/assistants";
import { AssistantTable } from "./table";

interface CreateAssistantForm {
  documentoCref: string;
  idEquipe: string;
  tipoAuxiliar: AssistantType;
  nome: string;
  documento: string;
  genero: string;
  dataNascimento: string;
  documentoCbv: string;
}

interface AssistantStaffProps {
  isLoadingAssistants?: boolean;
  assistants?: Assistant[];
  isErrorAssistants?: boolean;
  refetchAssistants(): void;
}

function AssistantStaff({
  assistants,
  isLoadingAssistants,
  isErrorAssistants,
  refetchAssistants,
}: AssistantStaffProps) {
  const [modalStatus, setModalStatus] = useState<ModalType>(undefined);

  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAssistantForm>();

  const {
    query: { idEquipe },
  } = useRouter();

  const {
    mutate: createAssistantMutation,
    isLoading: isLoadingCreateAssistantCoach,
  } = useMutation(
    (newAssistant: CreateAssistantForm) =>
      api.post("/pessoa/auxiliar", { idEquipe: idEquipe, ...newAssistant }),
    {
      onSuccess: () => {
        toast({
          title: "Sucesso.",
          description: "Auxiliar criado com sucesso.",
          status: "success",
          duration: 9000,
          position: "bottom-right",
          isClosable: true,
        });
        reset();
        setModalStatus(undefined);
        refetchAssistants();
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

  function closeCreateCoachingStaff() {
    setModalStatus(undefined);
  }

  function createAssistant({
    dataNascimento,
    genero,
    ...rest
  }: CreateAssistantForm) {
    createAssistantMutation({
      dataNascimento: dayjs(dataNascimento).toISOString(),
      genero: genero.toLowerCase(),
      ...rest,
    });
  }

  function editAssistant() {}

  return (
    <Box>
      <Heading as="h4" size="lg" margin="48px 0 0">
        Comissão Técnica
      </Heading>
      <Flex
        flexDirection="row"
        alignContent="center"
        justifyContent="space-between"
      >
        <Text fontSize="lg" marginY="24px">
          Acompanhe e realize alterações na comissão técnica do clube.
        </Text>
        <Tooltip label="Adicionar assistente técnico">
          <IconButton
            colorScheme="blue"
            aria-label="adicionar assistente técnico"
            icon={<AddIcon />}
            onClick={() => setModalStatus("create")}
            isRound
          />
        </Tooltip>
      </Flex>
      <AssistantTable
        items={assistants}
        loading={isLoadingAssistants}
        error={isErrorAssistants}
      />
      <Modal isOpen={Boolean(modalStatus)} onClose={closeCreateCoachingStaff}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalStatus === "create"
              ? "Adicionar assistente técnico"
              : "Editar  assistente técnico"}
          </ModalHeader>

          <form
            onSubmit={handleSubmit(
              modalStatus === "create" ? createAssistant : editAssistant
            )}
          >
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input {...register("nome", { required: true })} />
                {errors.nome && (
                  <Text color="red" fontSize="10">
                    Insira o nome do assistente técnico
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Tipo</FormLabel>
                <Select {...register("tipoAuxiliar", { required: true })}>
                  {Object.entries(ASSISTANT_TYPES).map((tipoAuxiliar) => (
                    <option key={tipoAuxiliar[0]} value={tipoAuxiliar[0]}>
                      {tipoAuxiliar[1]}
                    </option>
                  ))}
                </Select>
                {errors.tipoAuxiliar && (
                  <Text color="red" fontSize="10">
                    Insira o tipo do assistente técnico
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
                isLoading={isLoadingCreateAssistantCoach}
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

export { AssistantStaff };
