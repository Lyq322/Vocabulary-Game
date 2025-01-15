import { Center, Heading, Stack, Link as ChakraLink, Text, Flex, Divider, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const StudentLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Center h='calc(100vh - 48px)'>
      <Stack w='lg' direction='column' align='center' justify='center' px={10} py={8} bg='blue.100' mx='auto' borderRadius='lg'>
        <Heading size='lg' textAlign='center' mb={5}>Student Log In</Heading>
        <Input bg='gray.100' placeholder='Email' value={email} onChange={setEmail} />
        <Input bg='gray.100' placeholder='Password' value={password} onChange={setPassword} />
        <Button colorScheme='blue' w='full'>Log In</Button>
      </Stack>
    </Center>
  );
};

export default StudentLoginPage;