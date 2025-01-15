import { Box, Text, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Box bg='blue.100' w='full' py={3} px={4}>
      <Box maxWidth='1200px'>
        <ChakraLink as={RouterLink} to='/' _hover={{ textDecoration: 'none' }}>
          <Text>Vocabulary Game</Text>
        </ChakraLink>
      </Box>
    </Box>
  );
}

export default NavBar;