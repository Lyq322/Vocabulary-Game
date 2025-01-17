import { Box, Button, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MatchingCard from './MatchingCard';
import axios from 'axios';
import { SERVER_HOST } from './config';

const MatchingPage = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    axios.get(`${SERVER_HOST}/words/matching`)
      .then((response) => {
        setWords(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <Box px={8} py={6} maxW='container.lg' w='full' mx='auto'>
      <Flex direction='row' justify='space-between'>
        <Heading size='lg'>Matching!</Heading>
        <Button 
          size='sm'
          bg='blue.100' 
          borderColor='blue.500' 
          borderWidth='1px'
          color='blue.500'
        >
          INSTRUCTIONS
        </Button>
      </Flex>
      <SimpleGrid columns={3} mt={12} gap={4}>
        {words.map((word, index) => {
          const [englishWord, chineseWord] = Object.entries(word)[0];
          return (
            <>
              <MatchingCard key={`english-${index}`} word={englishWord} />
              <MatchingCard key={`chinese-${index}`} word={chineseWord} />
            </>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default MatchingPage;