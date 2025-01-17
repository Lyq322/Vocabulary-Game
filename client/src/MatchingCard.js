import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';

const MatchingCard = ({ word }) => {
  return (
    <Center bg='blue.100' px={4} py={4} w='full' borderRadius='md' borderWidth='1px' borderColor='blue.500'>
      <Text>{word}</Text>
    </Center>
  );
};

export default MatchingCard;