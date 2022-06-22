import { Box, Flex, Grid, Spacer, Text } from "@chakra-ui/layout";
import React from "react";

export default function MatchCard() {
  return (
    <Box
      borderRadius="16px"
      border="solid grey 1px"
      padding="16px"
      margin="16px"
    >
      <Flex>
        {/* <AspectRatio maxW="40px" ratio={4 / 3} /> */}
        <Text fontSize="medium"> Cruzeiro</Text>
        <Spacer />
        <Text fontSize="medium"> 34 45 46 54 50</Text>

        <Box marginLeft="8px" paddingLeft="8px" borderLeft="1px solid grey">
          <Text fontSize="medium">03</Text>
        </Box>
      </Flex>
      <Flex>
        {/* <AspectRatio maxW="40px" ratio={4 / 3} /> */}
        <Text fontSize="medium"> Minas</Text>
        <Spacer />
        <Text fontSize="medium"> 34 45 46 54 50</Text>

        <Box marginLeft="8px" paddingLeft="8px" borderLeft="1px solid grey">
          <Text fontSize="medium">03</Text>
        </Box>
      </Flex>
      <Flex marginTop="16px">
        <Spacer />
        <Text fontSize="medium">Fim. Sáb. 04/06</Text>
      </Flex>
    </Box>
  );
}
