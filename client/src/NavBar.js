import { Box, Text, Link as ChakraLink, Flex, Icon, Stack, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_HOST } from './config';
import { GoPersonFill } from 'react-icons/go';

const NavBar = () => {
  const navigate = useNavigate();

  const [homeUrl, setHomeUrl] = useState('/');

  const [user, setUser] = useState('');

  useEffect(() => {
    const pathname = window.location.pathname.substring(1);
    console.log('window.location.pathname', pathname)
    if (pathname === 'student-home' || pathname === 'student-dashboard' || pathname === 'hangman' || pathname === 'matching' || pathname === 'word-search') {
      setHomeUrl('/student-home');
    } else if (pathname === 'admin-dashboard' || pathname === 'student-details') {
      setHomeUrl('/admin-dashboard');
    } else {
      setHomeUrl('/');
    }
  }, [window.location.pathname]);

  useEffect(() => {
    axios.get(`${SERVER_HOST}/user`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        setUser(response.data.account_type);
      })
      .catch(error => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error(error);
      });
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box bg='blue.100' w='full' py={3} px={4}>
      <Flex justify='space-between' align='center'>
        <Stack maxWidth='1200px' direction='row' gap={4} align='center'>
          <ChakraLink as={RouterLink} to={homeUrl} _hover={{ textDecoration: 'none' }}>
            <Text>Vocabulary Game</Text>
          </ChakraLink>
          {window.location.pathname !== '/' && window.location.pathname !== '/admin-login' && window.location.pathname !== '/student-login' && <Button size='sm' colorScheme='blue' onClick={handleLogOut}>Log Out</Button>}
        </Stack>
        <Stack direction='row' gap={2} align='center'>
          <Icon as={GoPersonFill} color='blue.600' h='20px' w='20px' />
          <Text>{user}</Text>
        </Stack>
      </Flex>
    </Box>
  );
}

export default NavBar;