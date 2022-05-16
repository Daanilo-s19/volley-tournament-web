import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function Navbar() {
  const router = useRouter();
  return (
    <Flex justifyContent="space-between" alignItems="center" paddingY="16px">
      <ButtonGroup variant="link" spacing="8">
        <Button onClick={() => router.push("/visao-geral")}>Visão geral</Button>
        <Button onClick={() => router.push("/partidas")}>Partidas</Button>
        <Button>classificação</Button>
      </ButtonGroup>
      <Button colorScheme="blue">Entrar</Button>
    </Flex>
  );
}
