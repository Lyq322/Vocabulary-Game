import { Box, Divider, Flex, Heading, Stack, Link as ChakraLink, Text, Center } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function HomePage() {
  return (
    <Center h='calc(100vh - 48px)'>
      <Stack maxW='lg' direction='column' align='center' justify='center' px={10} py={8} bg='blue.100' mx='auto' borderRadius='lg'>
        <Heading size='lg' textAlign='center' mb={5}>Welcome to the Vocabulary Game</Heading>
        <ChakraLink as={RouterLink} to='/student-login'>
          <Text>Student Log In</Text>
        </ChakraLink>
        <Flex align='center' w='full' gap={2}>
          <Divider flexGrow={1} borderColor='gray.600' />
          <Text color='gray.600'>or</Text>
          <Divider flexGrow={1} borderColor='gray.600' />
        </Flex>
        <ChakraLink as={RouterLink} to='/admin-login'>
          <Text>Admin Log In</Text>
        </ChakraLink>
      </Stack>
    </Center>
  );
}

export default HomePage;