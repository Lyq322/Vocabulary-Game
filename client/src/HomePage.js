import { Divider, Flex, Heading, Stack, Link as ChakraLink, Text, Center } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function HomePage({ language }) {
  return (
    <Center h='calc(100vh - 48px)'>
      <Stack maxW='lg' direction='column' align='center' justify='center' px={10} py={8} bg='blue.100' mx='auto' borderRadius='lg'>
        <Heading size='lg' textAlign='center' mb={5}>{language === 'en' ? 'Welcome to the Vocabulary Game' : '欢迎来到词汇游戏'}</Heading>
        <ChakraLink as={RouterLink} to='/student-login'>
          <Text>{language === 'en' ? 'Student Login' : '学生登录'}</Text>
        </ChakraLink>
        <Flex align='center' w='full' gap={2}>
          <Divider flexGrow={1} borderColor='gray.600' />
          <Text color='gray.600'>or</Text>
          <Divider flexGrow={1} borderColor='gray.600' />
        </Flex>
        <ChakraLink as={RouterLink} to='/admin-login'>
          <Text>{language === 'en' ? 'Admin Login' : '管理员登录'}</Text>
        </ChakraLink>
      </Stack>
    </Center>
  );
}

export default HomePage;