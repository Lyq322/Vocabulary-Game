import { Box, Text, Link as ChakraLink } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  const [homeUrl, setHomeUrl] = useState('/');

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

  return (
    <Box bg='blue.100' w='full' py={3} px={4}>
      <Box maxWidth='1200px'>
        <ChakraLink as={RouterLink} to={homeUrl} _hover={{ textDecoration: 'none' }}>
          <Text>Vocabulary Game</Text>
        </ChakraLink>
      </Box>
    </Box>
  );
}

export default NavBar;