import { Box } from '@chakra-ui/react';
import React from 'react';

const NavBar = () => {
  return (
    <Box bg='blue.100' w='full' py={2} px={2}>
      <Box maxWidth='1440px'>
        <Text>Vocabulary Game</Text>
      </Box>
    </Box>
  );
}

export default NavBar;