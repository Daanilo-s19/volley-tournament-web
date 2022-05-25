import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useAuthModal from "./useAuthModal";

interface Props {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}
export default function AuthModal({ isOpen, onClose, onOpen }: Props) {
  const { errors, handleSubmit, register, onSubmit } = useAuthModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Login</FormLabel>
              <Input
                placeholder="Login"
                {...register("login", { required: true })}
              />
              {errors.login && (
                <Text color="red" fontSize="10">
                  Insira o login
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>senha</FormLabel>
              <Input
                type={"password"}
                placeholder="senha"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <Text color="red" fontSize="10">
                  Insira a senha
                </Text>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit" mr={3}>
              Entrar
            </Button>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
