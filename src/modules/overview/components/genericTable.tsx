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
import { useRouter } from "next/router";
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
      "Nome",
      "Atletas",
      "Comissão técnica",
      "Total",
      "Apto",
      "Observação",
      // "Criado em",
      // "Atualizado em",
      "",
      "",
    ].map((e) => <Th key={e}>{e}</Th>);

  const getBody = () => {
    if (items.length === 0 && !error)
      return (
        <Td colSpan={10}>
          <Center>
            <Text> Ainda não há Técnicos nessa Liga</Text>
          </Center>
        </Td>
      );

    return items.map((e) => (
      <Tr key={e.id}>
        <Td>
          <AspectRatio maxW="40px" ratio={4 / 3}>
            <Image src={e.urlBrasao} alt="brasao" objectFit="cover" />
          </AspectRatio>
        </Td>
        <Td>
          <Link href={`/visao-geral/classificacao?id=${e.id}`}>
            {e?.nome ?? "-"}
          </Link>
        </Td>
        <Td>
          <Link href={`/visao-geral/jogadores?id=${e.id}`}>
            {e?.quantidadeAtletas ?? "-"}
          </Link>
        </Td>
        <Td>
          <Link href={`/visao-geral/comissao-tecnica/${e.id}`}>
            {e?.quantidadeAuxiliares ?? "-"}
          </Link>
        </Td>
        <Td>
          <Text>{e?.quantidadeAtletas + e?.quantidadeAuxiliares ?? 0}</Text>
        </Td>
        <Td>
          <Text>{e?.apta ? "Sim" : " Não"}</Text>
        </Td>
        <Td>
          <Text>{e?.descricaoAptidao[0]}</Text>
        </Td>
        {/* <Td>
          <Text>{e?.dataCriacao ?? "-"}</Text>
        </Td>
        <Td>
          <Text>{e?.dataAtualizacao ?? "-"}</Text>
        </Td> */}
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
  };
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
