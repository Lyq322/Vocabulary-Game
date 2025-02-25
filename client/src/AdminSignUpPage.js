import React, { useState } from 'react';
import { Center, Heading, Stack, Link as ChakraLink, Input, Button, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_HOST } from './config';

const AdminSignUpPage = ({ getUser }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (email === '' || password === '') {
      setError('Please enter an email and/or password.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Invalid email.');
      return;
    }
    if (code.length !== 6) {
      setError('Invalid class code.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    if (!specialCharRegex.test(password)) {
      setError('Password must contain at least one special character.');
      return;
    }
    if (!numberRegex.test(password)) {
      setError('Password must contain at least one number.');
      return;
    }

    axios.post(`${SERVER_HOST}/create-admin`, {
      email,
      password,
      classCode: code
    })
      .then((response) => {
        if (response.data.authenticated) {
          localStorage.setItem('token', response.data.token);
          getUser();
          navigate('/admin-dashboard');
        } else {
          setError('Failed to create admin');
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.message);
      });
  };

  return (
    <Center h='calc(100vh - 48px)'>
      <Stack w='lg' direction='column' align='center' justify='center' px={10} py={8} bg='blue.100' mx='auto' borderRadius='lg'>
        <Heading size='lg' textAlign='center' mb={3}>Admin Sign Up</Heading>
        <Input bg='gray.100' placeholder='Email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
        <Input bg='gray.100' placeholder='Password' value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
        <Input bg='gray.100' placeholder='Class Code' value={code} type='number' onChange={(e) => setCode(e.target.value)} />
        <Button colorScheme='blue' w='full' onClick={handleSignUp}>Sign Up</Button>
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

export default AdminSignUpPage;