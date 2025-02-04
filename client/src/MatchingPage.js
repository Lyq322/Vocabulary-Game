import { Box, Button, Fade, Flex, Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MatchingCard from './MatchingCard';
import axios from 'axios';
import { SERVER_HOST } from './config';
import InstructionsButtonModal from './InstructionsButtonModal';

const MatchingPage = () => {
  const [words, setWords] = useState({});
  const [clickedCard, setClickedCard] = useState();
  const [displayedWords, setDisplayedWords] = useState(null);
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios.get(`${SERVER_HOST}/words/matching`)
      .then((response) => {
        setWords(response.data);
        console.log('response.data', response.data)
        const newDisplayedWords = []
        for (var word of Object.keys(response.data)) {
          newDisplayedWords.push(response.data[word]);
          newDisplayedWords.push(word);
        }
        setDisplayedWords(newDisplayedWords);
        console.log('displayedWords', newDisplayedWords, !newDisplayedWords.includes('fall'))
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    if (displayedWords && displayedWords.length === 0) {
      onOpen();
    }
  }, [displayedWords]);

  const handleClickCard = (word) => {
    if (clickedCard) {
      console.log(words[word], clickedCard, words[clickedCard], word)
      if (words[word] === clickedCard || words[clickedCard] === word) {
        setDisplayedWords((prev) => prev.filter((w) => w !== word && w !== clickedCard));
      } 
      setClickedCard(null);
    } else {
      setClickedCard(word);
    }
  }

  return (
    <Box px={8} py={6} maxW='container.lg' w='full' mx='auto'>
      <Flex direction='row' justify='space-between'>
        <Heading size='lg'>Matching!</Heading>
        <InstructionsButtonModal instructions='Match the English words with their corresponding Chinese translations. Click on a card to select it, then click on another card to find its match. If the cards match, they will disappear. Complete the game by matching all the pairs!' color='green' />
      </Flex>
      <SimpleGrid columns={3} mt={12} gap={4}>
        {Object.keys(words).map((englishWord, index) => {
          const chineseWord = words[englishWord];

          return (
            <React.Fragment key={index}>
              <Fade in={displayedWords.includes(englishWord)}>
                <MatchingCard clicked={clickedCard === englishWord} key={`english-${index}`} word={englishWord} handleClickCard={() => handleClickCard(englishWord)} />
              </Fade>
              <Fade in={displayedWords.includes(chineseWord)}>
                <MatchingCard clicked={clickedCard === chineseWord} key={`chinese-${index}`} word={chineseWord} handleClickCard={() => handleClickCard(chineseWord)} />
              </Fade>
            </React.Fragment>
          );
        })}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={1}>Congrats</ModalHeader>
          <ModalBody pb={6}>Yay you completed the game!</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MatchingPage;