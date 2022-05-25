import { useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAppState from "../../../hooks/useAppState";
import LeagueService from "../services/leagueServices";
import OverViewService from "../services/overviewService";
import {
  CreateStadiumInput,
  CreateTeamInput,
  FormType,
  LeagueOutput,
  TeamOutput,
} from "../types";

export default function useOverview() {
  const [user, _] = useAppState().userState;
  const {
    isOpen: isOpenCreateTeam,
    onOpen: onOpenCreateTeam,
    onClose: onCloseCreateTeam,
  } = useDisclosure();
  const {
    isOpen: isOpenEditTeam,
    onOpen: onOpenEditTeam,
    onClose: onCloseEditTeam,
  } = useDisclosure();

  const { fetchTeams, createTeam, updateTeam, deleteTeam, createStadium } =
    OverViewService();
  const { fetchLeague, deleteLeague, createLeague } = LeagueService();

  const [leagues, setLeagues] = useState<LeagueOutput[]>([]);
  const [currentLeague, setCurrentLeague] = useState<LeagueOutput | null>();
  const [currentTeam, setcurrentTeam] = useState<TeamOutput | null>();

  const [teams, setTeams] = useState<TeamOutput[]>([]);
  const [state, setState] = useState({ loading: false, error: false });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>();
  const toast = useToast();

  useEffect(() => {
    onFetchLeague();
  }, []);

  useEffect(() => {
    currentLeague?.id && onFetchTeams(currentLeague?.id);
  }, [currentLeague]);

  const toastSuccess = () => {
    setState({ error: false, loading: false });

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

  const onFetchTeams = async (id: string) => {
    try {
      setState({ error: false, loading: true });
      const result = await fetchTeams(id);

      setTeams(result);

      setState({ error: false, loading: false });
    } catch (error) {
      setState({ loading: false, error: true });
      toastError();
    }
  };

  const onSubmitTeam = async (data: FormType) => {
    const stadiumInput: CreateStadiumInput = {
      cidade: data.city,
      estado: data.state,
      nome: data.nameStadium,
    };

    const input: Omit<CreateTeamInput, "idGinasio"> = {
      idLiga: currentLeague.id,
      nome: data.nameTeam,
      urlBrasao: data.urlLogo,
      cidade: data.city,
      estado: data.state,
    };
    try {
      onCloseCreateTeam();
      onCloseEditTeam();

      setState({ error: false, loading: true });

      if (isOpenCreateTeam) {
        const result = await createStadium(stadiumInput);
        await createTeam({ input: { ...input, idGinasio: result.id } });
      } else {
        await updateTeam(
          { ...input, idGinasio: currentTeam.idGinasio },
          currentTeam.id
        );
      }

      onFetchTeams(currentLeague?.id);

      toastSuccess();
    } catch (error) {
      toastError();
    }
  };

  const onDeleteTeam = async (id: string) => {
    try {
      setState({ error: false, loading: true });

      await deleteTeam(id);
      onFetchTeams(currentLeague?.id);

      setState({ ...state, loading: false });
    } catch (error) {
      console.error(error);
      setState({ loading: false, error: true });
    }
  };

  const onFetchLeague = async () => {
    try {
      setState({ error: false, loading: true });
      const result = await fetchLeague();
      setLeagues(result);

      const league = result?.[0];
      setCurrentLeague(league);

      setState({ error: false, loading: false });
    } catch (error) {
      setState({ loading: false, error: true });
      toastError();
    }
  };
  const initializeLeague = async (id: string) => {
    try {
      setState({ error: false, loading: true });
      await createLeague(id);

      toastSuccess();
    } catch (error) {
      toastError();
    }
  };

  const onDeleteLeague = async (id: string) => {
    try {
      setState({ error: false, loading: true });
      await deleteLeague(id);
      await onFetchLeague();

      toastSuccess();
    } catch (error) {
      toastError();
    }
  };

  return {
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
  };
}
