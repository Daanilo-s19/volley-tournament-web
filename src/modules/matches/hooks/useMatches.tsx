import { useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import useLeague from "../../common/hooks/useLeague";
import MatchesService from "../services/matchesServices";
import { Person, PersonOutput } from "../types";

type PersonType = "arbitro" | "delegado";

interface FormType extends Person {
  personType: PersonType;
}

export default function useMatches() {
  const toast = useToast();
  const { fetchReferee, createDelegate, createReferee, fetchDelegate } =
    MatchesService();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [leagueID, setLeagueID] = useState<string>();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>();

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
  const toastError = (message?: string) => {
    toast({
      title: "Ops.",
      description: message ?? "houve um equivoco.",
      status: "error",
      position: "bottom-right",
      duration: 9000,
      isClosable: true,
    });
  };

  const {
    data: referees,
    refetch: refetchReferee,
    isLoading: isLoadingReferee,
    isError: isErrorReferee,
  } = useQuery<PersonOutput[]>(["referees", leagueID], () => fetchReferee(leagueID), {
    enabled: Boolean(leagueID)
  });

  const {
    data: delegates,
    refetch: refetchDelegates,
    isLoading: isLoadingDelegates,
    isError: isErrorDelegates,
  } = useQuery<PersonOutput[]>(["delegates", leagueID], () => fetchDelegate(leagueID),  {
    enabled: Boolean(leagueID)
  });

  const { mutate: onCreateReferee, isLoading: isLoadingCreateReferee } =
    useMutation(createReferee, {
      onSuccess: (d) => console.log(d),
      onError: (d) => console.log(d),
    });

  const { mutate: onCreateDelegate, isLoading: isLoadingCreateDelegate } =
    useMutation(createDelegate, {
      onSuccess: (d) => console.log(d),
      onError: (d) => console.log(d),
    });

  const onSubmit = async (data: FormType) => {
    const input: Omit<Person, PersonType> = {
      ...data,
      idLiga: leagueID,
    };

    try {
      onClose();
      onCloseEdit();

      data.personType === "arbitro"
        ? onCreateReferee(input)
        : onCreateDelegate(input);

      await refetchReferee();
      await refetchDelegates();

      toastSuccess();
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  return {
    referees,
    isLoadingReferee,
    isErrorReferee,
    isLoadingCreateReferee,

    delegates,
    isLoadingDelegates,
    isErrorDelegates,

    isLoadingCreateDelegate,

    register,
    handleSubmit,
    reset,
    errors,

    refetchReferee,
    refetchDelegates,

    isOpen,
    onOpen,
    onClose,

    isOpenEdit,
    onOpenEdit,
    onCloseEdit,

    onSubmit,
    setLeagueID,
  };
}
