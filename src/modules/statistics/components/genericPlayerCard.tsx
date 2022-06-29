import { Box, CircularProgress, Flex, Heading, Text } from "@chakra-ui/react";
interface genericPlayerCard {
  title: string;
  player?: Player  
  loading: boolean;
}

interface Player {
  name: string;
  votes: number;
  age: number;
  team: string;
}

export const GenericPlayerCard = ({title, player, loading}: genericPlayerCard) => {

  function renderPlayer(){
    if(player){
      return (
        <Box mt="2">
          <Flex>
            <Text>Nome: <strong>{player.name}</strong></Text>
            <Text ml="2">Votos: <strong>{player.votes}</strong></Text>
          </Flex>
          <Flex mt="2">
            <Text>Idade: <strong>{player.age}</strong></Text>
            <Text ml="2">Time: <strong>{player.team}</strong></Text>
          </Flex>
        </Box>
      )
    }else {
      return  <Text>Nenhum jogador escolhido</Text>
    }  
  }

  return (
    <Box minW={200} minH={130} border="1px" borderRadius="md" padding="5" width="fit-content">
      <Heading as="h3" size="md">{title}</Heading>
      {loading ? 
        <Flex align="center" justify="center" pt="3">
          <CircularProgress isIndeterminate />      
        </Flex>
        :
        renderPlayer()
      }
    </Box>
  );
}