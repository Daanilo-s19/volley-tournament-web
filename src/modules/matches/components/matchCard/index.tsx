import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import dayjs from "dayjs";
import React from "react";
import { matchType } from "../../types";

interface Props {
  mandante: string;
  visistante: string;
  mandantePts: number;
  mandantePtsSet: Array<number>;
  visitantePts: number;
  visitantePtsSet: Array<number>;
  horario: string;
  status: matchType;
  onClick(): void;
}

export default function MatchCard({
  mandante,
  visistante,
  mandantePts,
  visitantePts,
  horario,
  mandantePtsSet,
  visitantePtsSet,
  status,
  onClick,
}: Props) {
  const getBorderByType = () =>
    ({
      agendada: "grey",
      participantes_cadastrados: "orange",
      wo: "red",
      concluida: "green",
    }[status]);

  const getLabelStatus = () =>
    ({
      agendada: "Agendada",
      participantes_cadastrados: " Participantes cadastrados",
      wo: "WO",
      concluida: "concluída",
    }[status]);

  const getLabelState = () =>
    ({
      agendada: "Agendado para:",
      participantes_cadastrados: "Agendadado para:",
      wo: "Disputado em:",
      concluida: "Disputado em:",
    }[status]);

  return (
    <Box
      onClick={onClick}
      cursor={"pointer"}
      borderRadius="16px"
      border="solid grey 1px"
      borderColor={getBorderByType()}
      padding="16px"
      margin="16px"
    >
      <Flex>
        {/* <AspectRatio maxW="40px" ratio={4 / 3} /> */}
        <Text fontSize="medium">{mandante}</Text>
        <Spacer />
        {mandantePtsSet.map((e) => (
          <Text fontSize="medium" marginRight="8px">
            {e}
          </Text>
        ))}

        <Box marginLeft="8px" paddingLeft="8px" borderLeft="1px solid grey">
          <Text fontSize="medium">{mandantePts}</Text>
        </Box>
      </Flex>
      <Flex>
        {/* <AspectRatio maxW="40px" ratio={4 / 3} /> */}
        <Text fontSize="medium"> {visistante}</Text>
        <Spacer />
        {visitantePtsSet.map((e) => (
          <Text fontSize="medium" marginRight="8px">
            {e}
          </Text>
        ))}

        <Box marginLeft="8px" paddingLeft="8px" borderLeft="1px solid grey">
          <Text fontSize="medium">{visitantePts}</Text>
        </Box>
      </Flex>
      <Flex marginTop="16px">
        {getLabelStatus()}
        <Spacer />
        <Text fontSize="medium">
          {getLabelState()}{" "}
          {dayjs(horario).locale("pt-BR").format("DD/MM/YYYY")}
        </Text>
      </Flex>
    </Box>
  );
}
