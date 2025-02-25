import { Box, Button, Fade, Flex, Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MatchingCard from './MatchingCard';
import axios from 'axios';
import { SERVER_HOST } from './config';
import InstructionsButtonModal from './InstructionsButtonModal';

const MatchingPage = ({ language }) => {
  const [words, setWords] = useState({});
  
  const [learning, setLearning] = useState(0);
  const [notSeen, setNotSeen] = useState(0);

  const [clickedCard, setClickedCard] = useState();
  const [displayedWords, setDisplayedWords] = useState(null);
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${SERVER_HOST}/matching-words`, {
      headers: {
        Authorization: token,
      },
    })  
      .then((response) => {
        setWords(response.data.words);
        setLearning(response.data.learning);
        setNotSeen(response.data.notSeen);

        const newDisplayedWords = []
        for (var word of Object.keys(response.data.words)) {
          newDisplayedWords.push(response.data.words[word]);
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
      const token = localStorage.getItem('token');
      axios.post(`${SERVER_HOST}/completed-game`, {
        words_changed: {
          'Known': learning,
          'Still Learning': notSeen,
        },
        words,
        game: 'Matching'
      }, {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          console.log('Game records updated');
        })
        .catch((error) => {
          console.error('Error updating game records: ', error);
        });
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
  };

  return (
    <Box px={8} py={6} maxW='container.lg' w='full' mx='auto'>
      <Flex direction='row' justify='space-between' mt={10}>
        <Heading size='lg'>{language === 'en' ? 'Matching!' : '匹配!'}</Heading>
        <InstructionsButtonModal 
          language={language}
          zhInstructions='将英文单词与其对应的中文翻译配对。单击一张卡将其选中，然后单击另一张卡以查找其匹配项。如果卡片匹配，它们就会消失。匹配所有配对即可完成游戏!'
          enInstructions='Match the English words with their corresponding Chinese translations. Click on a card to select it, then click on another card to find its match. If the cards match, they will disappear. Complete the game by matching all the pairs!' 
          color='green'
        />
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
          <ModalHeader pb={1}>{language === 'en' ? 'Congrats' : '恭喜'}</ModalHeader>
          <ModalBody pb={6}>{language === 'en' ? 'Yay you completed the game!' : '你完成了游戏!'}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MatchingPage;