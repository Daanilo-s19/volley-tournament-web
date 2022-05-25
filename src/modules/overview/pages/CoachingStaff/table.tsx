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
import { Coach } from "../../../../entities/person/coach";

interface CoachingTableProps {
  loading: boolean;
  coaches: Coach[];
  error: unknown;
}

function CoachTable({ loading, coaches, error }: CoachingTableProps) {
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
            <Th>Data de idade</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Boolean(loading || error || coaches.length === 0) && (
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
                      Não foi possivel exibir os treinadores no momento. tente
                      novamente mais tarde
                    </Text>
                  )}
                  {Boolean(coaches.length === 0 && !error && !loading) && (
                    <Text>Ainda não há clubes nessa Liga</Text>
                  )}
                </Center>
              </Td>
            </Tr>
          )}
          {coaches.map((coach) => (
            <Tr key={coach.id}>
              <Td>{coach.nome}</Td>
              <Td>{coach.documento}</Td>
              <Td>{coach.documentoCbv}</Td>
              <Td>{coach.documentoCref}</Td>
              <Td>{coach.genero}</Td>
              <Td>{coach.idade}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export { CoachTable };
