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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Coach } from "../../../../entities/person/coach";
import { api } from "../../../../libs/axios";
import parseResponseData from "../../../../utils/parsers";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { CoachTable } from "./table";

type ModalType = "create" | "edit";

interface CreateCoachForm {
  name: string;
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

  const {
    query: { idEquipe },
  } = useRouter();

  function onSubmitTeam() {}

  function closeCreateCoachingStaff() {
    setModalStatus(undefined);
  }

  return (
    <Box>
      <Heading as="h3" size="lg" margin="48px 0 0">
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
        <Tooltip label="Adicionar clube">
          <IconButton
            colorScheme="blue"
            aria-label="adicionar Clube"
            icon={<AddIcon />}
            onClick={() => setModalStatus("create")}
            isRound
          />
        </Tooltip>
      </Flex>
      <CoachTable coaches={[]} />

      <Modal isOpen={Boolean(modalStatus)} onClose={closeCreateCoachingStaff}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            {modalStatus === "create" ? "Adicionar Técnico" : "Editar Técnico"}
          </ModalHeader>

          <form onSubmit={handleSubmit(onSubmitTeam)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input {...register("name", { required: true })} />
                {errors.name && (
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
                  })}
                />
                {errors.documentoCbv && (
                  <Text color="red" fontSize="10">
                    Insira um documento CBV
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Documento CREF</FormLabel>
                <Input
                  {...register("documentoCref", {
                    required: true,
                  })}
                />
                {errors.documentoCref && (
                  <Text color="red" fontSize="10">
                    Insira um documento CREF
                  </Text>
                )}
              </FormControl>
              {modalStatus === "create" && (
                <FormControl>
                  <FormLabel>Data de nascimento</FormLabel>
                  <Input
                    {...register("dataNascimento", {
                      required: true,
                    })}
                  />
                  {errors.documentoCref && (
                    <Text color="red" fontSize="10">
                      Insira um documento CREF
                    </Text>
                  )}
                </FormControl>
              )}
            </ModalBody>
          </form>
          <ModalFooter>
            <Button
              onClick={() => {
                setModalStatus(undefined);
              }}
              mr={3}
            >
              Fechar
            </Button>
            <Button colorScheme="blue" type="submit">
              {modalStatus === "create" ? "Criar" : "Editar"}
            </Button>
          </ModalFooter>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </Box>
  );
}
