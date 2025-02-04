import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';

const MatchingCard = ({ word, handleClickCard, clicked }) => {
  return (
    <Center 
      bg='green.100' 
      px={4} 
      py={4} 
      w='full' 
      borderRadius='md' 
      borderWidth={clicked ? '3px' : '1px'} 
      borderColor='green.500' 
      onClick={handleClickCard}
      boxSizing='border-box'
      cursor='pointer'
    >
      <Text>{word}</Text>
    </Center>
  );
};

export default MatchingCard;