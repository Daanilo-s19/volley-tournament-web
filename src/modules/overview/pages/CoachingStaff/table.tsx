import {
  Center,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { Assistant } from "../../../../entities/person/assistant";
import { Coach } from "../../../../entities/person/coach";
import { ASSISTANT_TYPES } from "../../../../utils/assistants";

interface TableProps<T> {
  loading?: boolean;
  items: T[];
  error?: unknown;
}

function CoachTable({ loading, items, error }: TableProps<Coach>) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Documento</Th>
            <Th>Documneto CBV</Th>
            <Th>Documneto CREF</Th>
            <Th>Gênero</Th>
            <Th>Idade</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Boolean(loading || error || items.length === 0) ? (
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
                  {Boolean(error) && (
                    <Text>
                      Não foi possivel exibir os treinadores no momento. Tente
                      novamente mais tarde.
                    </Text>
                  )}
                  {Boolean(items.length === 0 && !error && !loading) && (
                    <Text>Ainda não há técnicos nessa liga</Text>
                  )}
                </Center>
              </Td>
            </Tr>
          ) : (
            items.map((coach) => (
              <Tr key={coach.id}>
                <Td>{coach.nome}</Td>
                <Td>{coach.documento}</Td>
                <Td>{coach.documentoCbv}</Td>
                <Td>{coach.documentoCref}</Td>
                <Td>{coach.genero}</Td>
                <Td>{coach.idade}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function AssistantTable({ items, loading, error }: TableProps<Assistant>) {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Posição</Th>
            <Th>Documento</Th>
            <Th>Documneto CBV</Th>
            <Th>Documneto CREF</Th>
            <Th>Gênero</Th>
            <Th>Idade</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Boolean(loading || error || items.length === 0) ? (
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
                  {Boolean(error) && (
                    <Text>
                      Não foi possivel exibir os auxiliares no momento. Tente
                      novamente mais tarde.
                    </Text>
                  )}
                  {Boolean(items.length === 0 && !error && !loading) && (
                    <Text>Ainda não há auxiliares nessa liga</Text>
                  )}
                </Center>
              </Td>
            </Tr>
          ) : (
            items.map((assistant) => (
              <Tr key={assistant.id}>
                <Td>{assistant.nome}</Td>
                <Td>{ASSISTANT_TYPES[assistant.tipoAuxiliar]}</Td>
                <Td>{assistant.documento}</Td>
                <Td>{assistant.documentoCbv}</Td>
                <Td>{assistant.documentoCref}</Td>
                <Td>{assistant.genero}</Td>
                <Td>{assistant.idade}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export { CoachTable, AssistantTable };
