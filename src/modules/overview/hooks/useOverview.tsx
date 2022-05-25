import { useDisclosure } from "@chakra-ui/react";
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

  useEffect(() => {
    onFetchLeague();
  }, []);

  useEffect(() => {
    onFetchTeams(currentLeague?.id ?? "");
  }, [currentLeague]);

  const onFetchTeams = async (id: string) => {
    try {
      setState({ error: false, loading: true });
      const result = await fetchTeams(id);
      setTeams(result.teams);
      setState({ ...state, loading: false });
    } catch (error) {
      setState({ loading: false, error: true });
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
      setState({ error: false, loading: true });

      if (isOpenCreateTeam) {
        const result = await createStadium(stadiumInput);
        await createTeam({ input: { ...input, idGinasio: result.id } });
      } else {
        await updateTeam(
          { ...input, idGinasio: currentTeam.id },
          currentTeam.id
        );
      }

      setState({ ...state, loading: false });
    } catch (error) {
      console.error(error);
      setState({ loading: false, error: true });
    }
  };

  const onDeleteTeam = async (id: string) => {
    try {
      setState({ error: false, loading: true });

      await deleteTeam(id);

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

      setState({ ...state, loading: false });
    } catch (error) {
      setState({ loading: false, error: true });
    }
  };
  const initializeLeague = async (id: string) => {
    try {
      setState({ error: false, loading: true });
      await createLeague(id);

      setState({ ...state, loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteLeague = async (id: string) => {
    try {
      setState({ error: false, loading: true });
      await deleteLeague(id);
      await onFetchLeague();

      setState({ ...state, loading: false });
    } catch (error) {
      setState({ loading: false, error: true });
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
