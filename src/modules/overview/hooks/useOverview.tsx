import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OverViewService from "../services/overviewService";
import { TeamOutput } from "../types";

export default function useOverview() {
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
  const { fetchTeams, createTeam, updateTeam, deleteTeam } = OverViewService();
  const [teams, setTeams] = useState<TeamOutput[]>([]);
  const [state, setState] = useState({ loading: false, error: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    onFetchTeams();
  }, []);

  const onFetchTeams = async () => {
    try {
      setState({ ...state, loading: true });
      const result = await fetchTeams();
      setTeams(result.teams);
      setState({ ...state, loading: false });
    } catch (error) {
      setState({ loading: false, error: true });
    }
  };

  const onSubmitTeam = async (data) => {
    //TODO: setar os paramtros corretos
    const input = { nome: data.name, urlBrasao: data.brasao };
    try {
      setState({ ...state, loading: true });

      isOpenCreateTeam
        ? await createTeam({ input })
        : await updateTeam({ input });

      setState({ ...state, loading: false });
    } catch (error) {
      console.error(error);
      setState({ loading: false, error: true });
    }
  };

  const onDeleteTeam = async (id: string) => {
    try {
      setState({ ...state, loading: true });

      await deleteTeam(id);

      setState({ ...state, loading: false });
    } catch (error) {
      console.error(error);
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

    register,
    handleSubmit,
    errors,

    state,
    teams,
  };
}
