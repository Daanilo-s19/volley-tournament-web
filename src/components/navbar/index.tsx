import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import AuthModal from "../authModal/authModal";
import useAuthModal from "../authModal/useAuthModal";

export default function Navbar() {
  const router = useRouter();
  const { isOpenAuthModal, onOpenAuthModal, onCloseAuthModal } = useAuthModal();

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" paddingY="16px">
        <ButtonGroup variant="link" spacing="8">
          <Button onClick={() => router.push("/visao-geral")}>
            Visão geral
          </Button>
          <Button onClick={() => router.push("/partidas")}>Partidas</Button>
          <Button onClick={() => router.push("/ligas")}>Classificação</Button>
          <Button onClick={() => router.push("/estatisticas")}>Estatísticas</Button>
        </ButtonGroup>
        <Button colorScheme="blue" onClick={onOpenAuthModal}>
          Entrar
        </Button>
      </Flex>
      {isOpenAuthModal && (
        <AuthModal
          isOpen={isOpenAuthModal}
          onClose={onCloseAuthModal}
          onOpen={onOpenAuthModal}
        />
      )}
    </>
  );
}
