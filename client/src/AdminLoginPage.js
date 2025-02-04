import { Center, Heading, Stack, Link as ChakraLink, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Center h='calc(100vh - 48px)'>
      <Stack w='lg' direction='column' align='center' justify='center' px={10} py={8} bg='blue.100' mx='auto' borderRadius='lg'>
        <Heading size='lg' textAlign='center' mb={0}>Admin Log In</Heading>
        <ChakraLink as={RouterLink} to='/admin-signup' color='gray.500' mb={2}>New Admin Account</ChakraLink>
        <Input bg='gray.100' placeholder='Email' type='email' value={email} onChange={setEmail} />
        <Input bg='gray.100' placeholder='Password' type='password' value={password} onChange={setPassword} />
        <Button colorScheme='blue' w='full'>Log In</Button>
      </Stack>
    </Center>
  );
};

export default AdminLoginPage;