import { Center, Heading, Stack, Link as ChakraLink, Text, Flex, Divider, Input, Button, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_HOST } from './config';
import { useNavigate } from 'react-router-dom';

const StudentLoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogIn = () => {
    axios.post(`${SERVER_HOST}/student-login`, { email, password })
      .then((res) => {
        if (res.data.authenticated) {
          navigate('/student-home');
        } else {
          setError('Invalid email or password.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Center h='calc(100vh - 48px)'>
      <Stack w='lg' direction='column' align='center' justify='center' px={10} py={8} bg='blue.100' mx='auto' borderRadius='lg'>
        <Heading size='lg' textAlign='center' mb={5}>Student Log In</Heading>
        <Input bg='gray.100' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input bg='gray.100' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button colorScheme='blue' w='full' mt={2} onClick={handleLogIn}>Log In</Button>
        {error !== '' && (
          <Alert type='error'>
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Stack>
    </Center>
  );
};

export default StudentLoginPage;