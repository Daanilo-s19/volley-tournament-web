import { useDisclosure } from "@chakra-ui/react";

export default function useOverview() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return { isOpen, onOpen, onClose };
}
