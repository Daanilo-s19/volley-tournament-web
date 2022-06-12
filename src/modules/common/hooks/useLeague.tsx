import { useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import LeagueService from "../services/leagueServices";
import { LeagueOutput } from "../types/leagueType";

export default function useLeague() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { fetchLeague, deleteLeague, createLeague, initLeague } =
    LeagueService();

  const [currentLeague, setCurrentLeague] = useState<LeagueOutput | null>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toastSuccess = () => {
    toast({
      title: "Sucesso.",
      description: "Operação realizada com sucesso.",
      status: "success",
      duration: 9000,
      position: "bottom-right",
      isClosable: true,
    });
  };
  const toastError = () => {
    toast({
      title: "Ops.",
      description: "houve um equivoco.",
      status: "error",
      position: "bottom-right",
      duration: 9000,
      isClosable: true,
    });
  };

  const { mutate: onCreateLeague } = useMutation(createLeague, {
    onSuccess: (d) => {
      toastSuccess();
      onFetchLeague();
    },
    onError: (d) => toastError(),
  });

  const onSubmit = async (data) => {
    onClose();

    try {
      onCreateLeague(data);
    } catch (error) {
      throw error;
    }
  };

  const {
    data: leagues,
    refetch: onFetchLeague,
    isLoading: isLoadingLeagues,
  } = useQuery<LeagueOutput[]>("fetchLeague", fetchLeague, {
    onSuccess: (d) => {
      const league = d?.[0];
      setCurrentLeague(league);
    },
  });

  return {
    currentLeague,
    setCurrentLeague,
    fetchLeague,
    deleteLeague,
    createLeague,
    onFetchLeague,
    leagues,
    isLoadingLeagues,
    initLeague,

    isOpen,
    onOpen,
    onClose,

    register,
    handleSubmit,
    reset,
    errors,

    onSubmit,
  };
}
