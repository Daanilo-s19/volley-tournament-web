import { useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAppState from "../../../hooks/useAppState";
import useLeague from "../../leagues/hooks/useLeague";
import { DayType, InitLeagueInput } from "../../leagues/types/leagueType";
import OverViewService from "../services/overviewService";
import {
  CreateStadiumInput,
  CreateTeamInput,
  FormType,
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

  const {
    isOpen: isOpenInitializeLeague,
    onOpen: onOpenInitializeLeague,
    onClose: onCloseInitializeLeague,
  } = useDisclosure();

  const {
    currentLeague,
    setLeagueID,
    leagueId,
    deleteLeague,
    initLeague,
    leagues,
    onFetchLeague,
    isLoadingLeagues,
  } = useLeague();

  const { fetchTeams, createTeam, updateTeam, deleteTeam, createStadium } =
    OverViewService();

  const [currentTeam, setcurrentTeam] = useState<TeamOutput | null>();

  const [teams, setTeams] = useState<TeamOutput[]>([]);
  const [state, setState] = useState({ loading: false, error: false });

  const [checkDayofWeek, setDayOfWeek] = useState<DayType[]>([]);
  const [hoursGame, setHoursGame] = useState<string[]>([]);
  const [currentHour, setCurrentHour] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>();

  const {
    register: registerLeague,
    handleSubmit: handleSubmitLeague,
    reset: resetLeague,
    formState: { errors: errorsLeague },
  } = useForm();
  const toast = useToast();

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
  const toastError = (erroMessage?: string) => {
    toast({
      title: "Ops.",
      description: erroMessage ?? "houve um equivoco.",
      status: "error",
      position: "bottom-right",
      duration: 9000,
      isClosable: true,
    });
  };

  const addNewDay = (day: DayType) => {
    if (checkDayofWeek.includes(day)) {
      const removeDay = checkDayofWeek.filter((e) => e !== day);

      setDayOfWeek(removeDay);
    } else {
      setDayOfWeek([...checkDayofWeek, day]);
    }
  };

  const addNewHour = (value?: string) => {
    const hour = value ?? currentHour;
    const contain = hoursGame.includes(hour);
    if (contain) {
      const removeHour = hoursGame.filter((e) => e !== hour);
      setHoursGame(removeHour);

      return;
    }
    setHoursGame([...hoursGame, currentHour]);
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
      urlBrasao: data?.urlLogo != "" ? data?.urlLogo : null,
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

  const initializeLeague = async (data) => {
    if (hoursGame.length * checkDayofWeek.length != 6) {
      toastError("Verifique os dias e os horários selecionados");
      return;
    }
    const input: InitLeagueInput = {
      diasDaSemana: checkDayofWeek,
      horarios: hoursGame.map((e) => convertH2M(e)),
      data: data.startAt,
      intervaloDeDiasUteisEntreTurnos: 5,
    };

    try {
      setState({ error: false, loading: true });
      await initLeague(leagueId, input, data.inicializar);

      toastSuccess();
    } catch (error) {
      toastError(error?.response?.data?.message);
    }
  };

  function convertH2M(timeInHour: string) {
    var timeParts = timeInHour.split(":");
    return Number(timeParts[0]) * 60 + Number(timeParts[1]);
  }

  const onDeleteLeague = async (id: string) => {
    try {
      setState({ error: false, loading: true });
      await deleteLeague(id);
      await onFetchLeague();

      toastSuccess();
    } catch (error) {
      toastError(error.response.data.message);
    }
  };

  return {
    isOpenCreateTeam,
    onOpenCreateTeam,
    onCloseCreateTeam,

    isOpenEditTeam,
    onOpenEditTeam,
    onCloseEditTeam,

    isOpenInitializeLeague,
    onOpenInitializeLeague,
    onCloseInitializeLeague,

    onSubmitTeam,
    onDeleteTeam,
    onDeleteLeague,
    onFetchTeams,
    initializeLeague,

    register,
    handleSubmit,
    errors,
    registerLeague,
    handleSubmitLeague,
    resetLeague,
    errorsLeague,

    addNewDay,
    addNewHour,

    checkDayofWeek,
    setDayOfWeek,
    hoursGame,
    setHoursGame,

    state,
    teams,
    leagues,
    user,
    currentLeague,
    currentTeam,
    setcurrentTeam,
    reset,
    isLoadingLeagues,
    setCurrentHour,
    setLeagueID,
  };
}
