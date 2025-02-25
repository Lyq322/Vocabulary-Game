import { Box, Text, Link as ChakraLink, Flex, Icon, Stack, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { GoPersonFill } from 'react-icons/go';

const NavBar = ({ user, setUser, name, setName, language, setLanguage }) => {
  const navigate = useNavigate();

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

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setUser('');
    setName('');
    navigate('/');
  };

  return (
    <Box bg='blue.100' w='full' py={3} px={4}>
      <Flex justify='space-between' align='center'>
        <Stack maxWidth='1200px' direction='row' gap={4} align='center'>
          <ChakraLink as={RouterLink} to={homeUrl} _hover={{ textDecoration: 'none' }}>
            <Text>{language === 'en' ? 'Vocabulary Game' : '词汇游戏'}</Text>
          </ChakraLink>
          {window.location.pathname !== '/' && window.location.pathname !== '/admin-login' && window.location.pathname !== '/student-login' && (
            <Button size='sm' colorScheme='blue' onClick={handleLogOut}>{language === 'en' ? 'Log Out' : '注销'}</Button>
          )}
        </Stack>
        <Stack direction='row' gap={0}>
          {window.location.pathname !== '/admin-login' && window.location.pathname !== '/admin-signup' && window.location.pathname !== '/admin-dashboard' && window.location.pathname !== '/student-details' && (
            <>
              <Button 
                size='sm' 
                bg={language === 'en' ? 'blue.200' : 'blue.100'} 
                borderWidth='1px' 
                borderColor='black' 
                roundedRight='none'
                _hover={{ bg: 'blue.200' }}
                onClick={() => setLanguage('en')}
              >
                EN
              </Button>
              <Button 
                size='sm' 
                bg={language === 'en' ? 'blue.100' : 'blue.200'} 
                borderTopWidth='1px' 
                borderRightWidth='1px'
                borderBottomWidth='1px'
                borderColor='black' 
                roundedLeft='none'
                _hover={{ bg: 'blue.200' }}
                onClick={() => setLanguage('zh')}
              >
                中文
              </Button>
            </>
          )}
          {user && user !== '' && (
            <Stack ml={12} direction='row' gap={2} align='center'>
              <Icon as={GoPersonFill} color='blue.600' h='20px' w='20px' />
              <Text>{user === 'Student' ? name : user}</Text>
            </Stack>
          )}
          {!user || user === '' && (
            <Box width='150px' />
          )}
        </Stack>
      </Flex>
    </Box>
  );
}

export default NavBar;