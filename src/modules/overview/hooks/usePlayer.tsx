import { useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAppState from "../../../hooks/useAppState";
import playerService from "../services/playerService";
import { PlayerOutput } from "../types";

export default function usePlayer() {
  const [user, _] = useAppState().userState;

  const { query } = useRouter();

  const {
    isOpen: isOpenPlayer,
    onOpen: onOpenPlayer,
    onClose: onClosePlayer,
  } = useDisclosure();
  const {
    isOpen: isOpenEditPlayer,
    onOpen: onOpeneditPlayer,
    onClose: onCloseEditPlayer,
  } = useDisclosure();

  const { fetchPlayers, createPlayer, updatePlayer, deletePlayer } =
    playerService();

  const [players, setPlayers] = useState<PlayerOutput[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerOutput | null>();
  const [idEquipe, setIdEquipe] = useState<string>(query.id as string);

  const [state, setState] = useState({ loading: false, error: false });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlayerOutput>();
  const toast = useToast();

  useEffect(() => {
    setIdEquipe(query.id as string);
  }, []);

  useEffect(() => {
    (query.id as string) && onFetchPlayers();
  }, [query.id]);

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

  const onFetchPlayers = async () => {
    try {
      setState({ error: false, loading: true });

      const result = await fetchPlayers(idEquipe ?? (query.id as string));

      setPlayers(result);

      setState({ error: false, loading: false });
    } catch (error) {
      setState({ loading: false, error: true });
      toastError(error.response.data.message);
    }
  };

  const onSubmitTeam = async (data: PlayerOutput) => {
    const date = new Date(data.idade).toISOString();
    const input = {
      idEquipe: idEquipe ?? (query.id as string),
      numero: Number.parseInt(data.numero as unknown as string),
      dataNascimento: date,
      posicao: data.posicao,
      nome: data.nome,
      documento: data.documento,
      genero: data.genero,
      documentoCbv: data.documentoCbv,
    };

    const inputEdit = {
      nome: data.nome,
      dataNascimento: date,
      numero: Number.parseInt(data.numero as unknown as string),
      posicao: data.posicao,
    };

    try {
      onClosePlayer();
      onCloseEditPlayer();

      setState({ error: false, loading: true });

      if (isOpenPlayer) {
        await createPlayer(input);
      } else {
        await updatePlayer(inputEdit, currentPlayer.id);
      }

      onFetchPlayers();

      toastSuccess();
    } catch (error) {
      console.log("error", error);
      toastError(error.response.data.message);
    }
  };

  const onDeletePlayer = async (id: string) => {
    try {
      setState({ error: false, loading: true });

      await deletePlayer(id);
      onFetchPlayers();

      setState({ ...state, loading: false });
      toastSuccess();
    } catch (error) {
      toastError(error.response.data.message);

      setState({ loading: false, error: true });
    }
  };

  return {
    isOpenPlayer,
    onOpenPlayer,
    onClosePlayer,

    isOpenEditPlayer,
    onOpeneditPlayer,
    onCloseEditPlayer,

    onSubmitTeam,
    onDeletePlayer,

    onFetchPlayers,

    register,
    handleSubmit,
    errors,

    state,
    players,
    user,
    currentPlayer,
    setCurrentPlayer,
    reset,
  };
}
