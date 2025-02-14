import { Center, Heading, Stack, Link as ChakraLink, Input, Button, Alert, AlertDescription, AlertIcon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_HOST } from './config';

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    axios.post(`${SERVER_HOST}/admin-login`, { email, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/admin-dashboard');
        } else {
          setError('Invalid email or password.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data.message);
      });
  };

  return (
    <Center h='calc(100vh - 48px)'>
      <Stack w='lg' direction='column' align='center' justify='center' px={10} py={8} bg='blue.100' mx='auto' borderRadius='lg'>
        <Heading size='lg' textAlign='center' mb={0}>Admin Log In</Heading>
        <ChakraLink as={RouterLink} to='/admin-signup' color='gray.500' mb={2}>New Admin Account</ChakraLink>
        <Input bg='gray.100' placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input bg='gray.100' placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button colorScheme='blue' w='full' onClick={handleLogin}>Log In</Button>
        {error !== '' && (
          <Alert status='error'>
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Stack>
    </Center>
  );
};

export default AdminLoginPage;