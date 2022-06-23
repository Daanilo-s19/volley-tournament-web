import { useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import useLeague from "../../leagues/hooks/useLeague";
import PlayerService from "../../overview/services/playerService";
import { PlayerOutput } from "../../overview/types";
import MatchesService from "../services/matchesServices";
import { MatchOutput, Person, PersonOutput } from "../types";

type PersonType = "arbitro" | "delegado";

interface FormType extends Person {
  personType: PersonType;
}

export default function useMatches() {
  const toast = useToast();
  const {
    fetchReferee,
    createDelegate,
    createReferee,
    fetchDelegate,
    fetchMatchPerRound,
  } = MatchesService();

  const { fetchPlayers } = PlayerService();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreateMatch,
    onOpen: onOpenCreateMatch,
    onClose: onCloseCreateMatch,
  } = useDisclosure();

  const [match, setMatch] = useState<MatchOutput>();

  const [leagueID, setLeagueID] = useState<string>();
  const [delegates, setDelegates] = useState<PersonOutput[]>();
  const [referees, setreferees] = useState<PersonOutput[]>();
  const [round, setRound] = useState<number>(1);

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

  const openMatch = (value: MatchOutput) => {
    setMatch(value);
    onOpenCreateMatch();

    refetchHomePlayers();
    refetchVisitingPlayers();
  };

  const {
    data: dataHomePlayers,
    refetch: refetchHomePlayers,
    isLoading: isLoadingHomePlayers,
    isError: isErrorHomePlayers,
  } = useQuery<PlayerOutput[]>(
    ["fetchHomePlayers", match?.mandante?.idEquipe ?? ""],
    () => fetchPlayers(match.mandante.idEquipe),
    {
      onSuccess: (d) => toastSuccess(),
      onError: (d: any) => toastError(d.response.data.message),
      enabled: match?.mandante?.idEquipe != null,
    }
  );

  const {
    data: dataVisitingPlayers,
    refetch: refetchVisitingPlayers,
    isLoading: isLoadingVisitingPlayers,
    isError: isErrorVisitingPlayers,
  } = useQuery<PlayerOutput[]>(
    ["fetchVisitingPlayers", match?.visitante?.idEquipe ?? ""],
    () => fetchPlayers(match.visitante.idEquipe),
    {
      onSuccess: (d) => toastSuccess(),
      onError: (d: any) => toastError(d.response.data.message),
      enabled: match?.visitante?.idEquipe != null,
    }
  );

  const {
    refetch: refetchReferee,
    isLoading: isLoadingReferee,
    isError: isErrorReferee,
    isFetchedAfterMount: isRefetchingReferee,
  } = useQuery<PersonOutput[]>(
    ["fetchReferee", leagueID],
    () => fetchReferee(leagueID),
    {
      onSuccess: (e) => setreferees(e),
      onError: (d: any) => toastError(d.response.data.message),
      enabled: leagueID != null,
    }
  );

  const {
    refetch: refetchDelegates,
    isLoading: isLoadingDelegates,
    isError: isErrorDelegates,
    isFetchedAfterMount: isRefetchingDelegate,
  } = useQuery<PersonOutput[]>(
    ["fetchDelegate", leagueID],
    () => fetchDelegate(leagueID),
    {
      onSuccess: (e) => setDelegates(e),
      onError: (d: any) => toastError(d.response.data.message),
      enabled: leagueID != null,
    }
  );

  const { mutate: onCreateReferee, isLoading: isLoadingCreateReferee } =
    useMutation(createReferee, {
      onSuccess: (d) => toastSuccess(),
      onError: (d: any) => toastError(d.response.data.message),
    });

  const { mutate: onCreateDelegate, isLoading: isLoadingCreateDelegate } =
    useMutation(createDelegate, {
      onSuccess: (d) => toastSuccess(),
      onError: (d: any) => toastError(d.response.data.message),
    });

  const onSubmit = (data: FormType) => {
    const input: Omit<Person, PersonType> = {
      ...data,
      idLiga: leagueID,
    };

    onClose();
    onCloseEdit();

    data.personType === "arbitro"
      ? onCreateReferee(input)
      : onCreateDelegate(input);

    refetchReferee();
    refetchDelegates();
  };

  const {
    data: dataMatches,
    refetch: refetchMatchRound,
    isLoading: isLoadingMatchRound,
    isError: isErrorMatchRound,
  } = useQuery<MatchOutput[]>(
    ["fetchMatchPerRound", leagueID, round],
    () => fetchMatchPerRound(leagueID, round),
    {
      onSuccess: (d) => toastSuccess(),
      onError: (d: any) => toastError(d.response.data.message),
      enabled: leagueID != null,
    }
  );

  const selectRound = (round: string) => {
    setRound(Number.parseInt(round));
    refetchMatchRound();
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

    leagueID,
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
  };
}
