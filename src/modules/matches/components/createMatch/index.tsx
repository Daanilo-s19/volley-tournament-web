import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { PlayerOutput } from "../../../overview/types";
import { PersonOutput } from "../../types";

export type DataSelectType = "mandante" | "visitante" | "arbitro" | "delegado";
export interface DataSelect {
  position: string;
  id: string;
  team: DataSelectType;
}
interface Props {
  isOpen: boolean;
  onClose(): void;
  onFinish(data: DataSelect[]): void;
  homePlayer: PlayerOutput[];
  visitingPlayer: PlayerOutput[];

  arbitros: PersonOutput[];
  delegados: PersonOutput[];
  mandante: string;
  visitante: string;
  loading?: boolean;
}

export default function CreateMatchModal({
  isOpen,
  onClose,
  arbitros,
  delegados,
  mandante,
  visitante,
  loading = false,
  homePlayer,
  visitingPlayer,
  onFinish,
}: Props) {
  const toast = useToast();

  const toastError = (message?: string) => {
    toast({
      title: "Ops.",
      description: message ?? "houve um equivoco.",
      status: "warning",
      position: "bottom-right",
      duration: 9000,
      isClosable: true,
    });
  };

  const [selectedPlayer, setSelectedPlayer] = useState<DataSelect[]>([]);

  const addSelectedPlayer = (
    id: string,
    position: string,
    team: DataSelectType
  ) => {
    if (!id) {
      const filter = selectedPlayer.filter(
        (e) => e.id !== id && e.position !== position
      );
      setSelectedPlayer(filter);
      return;
    }

    const search = selectedPlayer.find((selected) => selected.id === id);

    if (search) {
      toastError("O participante já foi selecionado!");
      return;
    }

    const containPlayer = selectedPlayer.find(
      (e) => e.position === position && e.team === team
    );

    if (!containPlayer) {
      setSelectedPlayer([...selectedPlayer, { id, position, team }]);
      return;
    }

    if (containPlayer.id === id) {
      const filter = selectedPlayer.filter(
        (e) => e.id !== id && e.position !== position
      );
      setSelectedPlayer(filter);
    } else {
      containPlayer.id = id;
      setSelectedPlayer([...selectedPlayer, containPlayer]);
    }
  };

  const renderReferees = (arbitros ?? []).map((e) => (
    <option value={e.id}>
      {e.nome}{" "}
      {selectedPlayer.find((selected) => selected.id === e.id)
        ? "(Selecionado)"
        : ""}
    </option>
  ));

  const renderDelegate = (delegados ?? []).map((e) => (
    <option value={e.id}>{e.nome}</option>
  ));

  const renderHomePlayer = (homePlayer ?? []).map((e, index) => (
    <option value={e.id}>
      {e.nome}
      {selectedPlayer.find((selected) => selected.id === e.id)
        ? "(Selecionado)"
        : ""}
    </option>
  ));

  const renderVisitingPlayer = (visitingPlayer ?? []).map((e) => (
    <option value={e.id}>
      {e.nome}
      {selectedPlayer.find((selected) => selected.id === e.id)
        ? "(Selecionado)"
        : ""}
    </option>
  ));

  const selectReferees = () => {
    return (
      <FormControl>
        <FormLabel marginTop="28px">Selecionar Árbitros</FormLabel>
        <Grid gridTemplateColumns="repeat(4,1fr)" gap="20px">
          {["principal", "secundário", "juiz_quadra"].map((e) => (
            <Select
              marginBottom="8px"
              placeholder={`Árbitro ${e}`}
              onChange={(select) =>
                addSelectedPlayer(select.target.value, e, "arbitro")
              }
            >
              {renderReferees}
            </Select>
          ))}
        </Grid>
      </FormControl>
    );
  };

  const renderPlayersClub = () => {
    return (
      <Grid
        gridTemplateColumns="repeat(2,1fr)"
        justifyContent="center"
        gap="60px"
      >
        <Box>
          <FormControl>
            <FormLabel marginTop="28px">Mandante:{mandante}</FormLabel>
            <Checkbox>Desistência</Checkbox>
          </FormControl>
          {renderPlayerByPosition(renderHomePlayer, "mandante")}
        </Box>
        <Box>
          <FormControl>
            <FormLabel marginTop="28px">Visitante: {visitante}</FormLabel>
            <Checkbox>Desistência</Checkbox>
          </FormControl>
          {renderPlayerByPosition(renderVisitingPlayer, "visitante")}
        </Box>
      </Grid>
    );
  };

  const renderPlayerByPosition = (
    options: JSX.Element[],
    teamType: "mandante" | "visitante"
  ) => {
    return (
      <Box>
        {["ponta", "oposto", "central", "libero", "levantador"].map(
          (e, index) => (
            <FormControl key={index}>
              <FormLabel marginTop="12px">{e}</FormLabel>
              <Select
                placeholder={e}
                onChange={(select) =>
                  addSelectedPlayer(select.target.value, e, teamType)
                }
              >
                {options}
              </Select>
            </FormControl>
          )
        )}
        <Heading marginTop="24px" as="h4" size="md">
          Banco de reserva
        </Heading>
        <FormControl>
          {Array.from<Number>(new Array(7)).map((_, index) => (
            <Select
              key={index}
              marginTop="12px"
              placeholder="reserva"
              onChange={(select) =>
                addSelectedPlayer(
                  select.target.value,
                  `reserva${index}`,
                  teamType
                )
              }
            >
              {options}
            </Select>
          ))}
        </FormControl>
      </Box>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Selecionar Participantes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          ) : (
            <Box>
              <FormControl>
                <FormLabel marginTop="12px">Selecionar delegado</FormLabel>
                <Select
                  placeholder="Selecionar delegado"
                  onChange={(select) =>
                    addSelectedPlayer(
                      select.target.value,
                      "delegado",
                      "delegado"
                    )
                  }
                >
                  {renderDelegate}
                </Select>
              </FormControl>
              {selectReferees()}
              {renderPlayersClub()}
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => onFinish(selectedPlayer)}
          >
            Finalizar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
