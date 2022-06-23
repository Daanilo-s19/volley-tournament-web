import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
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
      agendada: "orange",
      participantes_cadastrados: "green",
      wo: "red",
      concluida: "grey",
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
        <Text fontSize="medium">{mandantePtsSet.map((e) => e)}</Text>

        <Box marginLeft="8px" paddingLeft="8px" borderLeft="1px solid grey">
          <Text fontSize="medium">{mandantePts}</Text>
        </Box>
      </Flex>
      <Flex>
        {/* <AspectRatio maxW="40px" ratio={4 / 3} /> */}
        <Text fontSize="medium"> {visistante}</Text>
        <Spacer />
        <Text fontSize="medium">{visitantePtsSet}</Text>

        <Box marginLeft="8px" paddingLeft="8px" borderLeft="1px solid grey">
          <Text fontSize="medium">{visitantePts}</Text>
        </Box>
      </Flex>
      <Flex marginTop="16px">
        <Spacer />
        <Text fontSize="medium">{horario}</Text>
      </Flex>
    </Box>
  );
}
