import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import { AspectRatio, Link, Center } from "@chakra-ui/layout";
import {
  Th,
  Tr,
  Td,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Spinner,
  Image,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { TeamOutput } from "../types";
interface Props {
  items: Array<TeamOutput>;
  loading: boolean;
  error: boolean;
  onEdit(item: TeamOutput): void;
  onDelete(item: TeamOutput): void;
}
export default function GenericTable({
  items,
  loading,
  error,
  onEdit,
  onDelete,
}: Props) {
  const getHead = () =>
    [
      "Brasao",
      "nome",

      "atletas",
      "comissão técnica",
      "Comissão médica",
      "total",
      "",
      "",
    ].map((e, key) => <Th key={key}>{e}</Th>);
  // const mockItem: TeamOutput = {
  //   id: "id mockado",
  //   nome: "nome mockado",
  //   equipe: "equipe mockado",
  //   urlBrasao: "url mockado",
  //   apta: false,
  //   descricaoAptidao: undefined,
  //   dataAtualizacao: "data mockado",
  //   dataCriacao: "data mockado",
  //   cidade: "cidade mockado",
  //   estado: "estado mockado",
  //   idLiga: "",
  //   idGinasio: "",
  //   quantidadeAtletas: 0,
  // };
  const getBody = () =>
    items.map((e, key) => (
      <Tr key={key}>
        <Td>
          <AspectRatio maxW="40px" ratio={4 / 3}>
            <Image src={e.urlBrasao} alt="brasao" objectFit="cover" />
          </AspectRatio>
        </Td>
        <Td>
          <Link href="">{e?.nome ?? "-"}</Link>
        </Td>
        <Td>
          <Link href="">{"-"}</Link>
        </Td>
        <Td>
          <Link href="">-</Link>
        </Td>
        <Td>
          <Link href="">-</Link>
        </Td>
        <Td>
          <Text>{e?.quantidadeAtletas ?? ""}</Text>
        </Td>
        <Td>
          <IconButton
            aria-label="Editar"
            icon={<EditIcon />}
            onClick={() => onEdit(e)}
            isRound
          />
        </Td>
        <Td>
          <IconButton
            aria-label="Deletar"
            icon={<DeleteIcon />}
            onClick={() => onDelete(e)}
            isRound
          />
        </Td>
      </Tr>
    ));

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>{getHead()}</Tr>
        </Thead>
        <Tbody>
          {(loading || error) && (
            <Tr>
              <Td colSpan={10}>
                <Center>
                  {loading && (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  )}
                  {error && (
                    <Text>
                      Não foi possivel exibir os clubes no momento. tente
                      novamente mais tarde
                    </Text>
                  )}
                </Center>
              </Td>
            </Tr>
          )}

          {items && getBody()}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
