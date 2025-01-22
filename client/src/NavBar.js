import { Box, Text, Link as ChakraLink } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  const [homeUrl, setHomeUrl] = useState('/');

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === 'student-login' || pathname === 'admin-login') {
      setHomeUrl('/');
    } else if (pathname === 'student-home' || pathname === 'student-dashboard' || pathname === 'hangman' || pathname === 'matching' || pathname === 'word-search')
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