import { useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAppState from "../../hooks/useAppState";

export default function useAuthModal() {
  const [_, setUser] = useAppState().userState;
  const {
    isOpen: isOpenAuthModal,
    onOpen: onOpenAuthModal,
    onClose: onCloseAuthModal,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setUser({ token: data.login + data.password });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,

    isOpenAuthModal,
    onOpenAuthModal,
    onCloseAuthModal,
  };
}
