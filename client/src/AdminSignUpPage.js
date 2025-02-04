import React, { useState } from 'react';
import { Center, Heading, Stack, Link as ChakraLink, Input, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const AdminSignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  return (
    <Center h='calc(100vh - 48px)'>
      <Stack w='lg' direction='column' align='center' justify='center' px={10} py={8} bg='blue.100' mx='auto' borderRadius='lg'>
        <Heading size='lg' textAlign='center' mb={3}>Admin Log In</Heading>
        <Input bg='gray.100' placeholder='Email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
        <Input bg='gray.100' placeholder='Password' value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
        <Input bg='gray.100' placeholder='Class Code' value={code} type='number' onChange={(e) => setCode(e.target.value)} />
        <Button colorScheme='blue' w='full'>Log In</Button>
      </Stack>
    </Center>
  );
};

export default AdminSignUpPage;