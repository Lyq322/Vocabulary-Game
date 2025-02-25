import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SERVER_HOST } from './config';
import { Box, Flex, Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react';
import InstructionsButtonModal from './InstructionsButtonModal';

const WordSearchPage = ({ language }) => {
  const [words, setWords] = useState([]);
  
  const [learning, setLearning] = useState(0);
  const [notSeen, setNotSeen] = useState(0);

  const [foundWords, setFoundWords] = useState([]);
  const [grid, setGrid] = useState([]);
  const [highlightedLetters, setHighlightedLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState('');

  console.log('words', words)

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${SERVER_HOST}/word-search-words`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setGrid(response.data.grid);
        setWords(response.data.words);
        setLearning(response.data.learning);
        setNotSeen(response.data.notSeen);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleClickLetter = (rowIndex, colIndex) => {
    if (selectedLetter === '') {
      setSelectedLetter(`${rowIndex}-${colIndex}`);
    } else {
      var [selectedRow, selectedCol] = selectedLetter.split('-');
      console.log(selectedRow, selectedCol)
      selectedRow = parseInt(selectedRow);
      selectedCol = parseInt(selectedCol);

      if (rowIndex === selectedRow && colIndex === selectedCol) {
        setSelectedLetter('');
      } else if (rowIndex === selectedRow || colIndex === selectedCol || Math.abs(rowIndex - selectedRow) === Math.abs(colIndex - selectedCol)) {
        var word = '';
        const newHighlightedLetters = [];
        if (rowIndex === selectedRow) {
          for (var i = Math.min(colIndex, selectedCol); i <= Math.max(colIndex, selectedCol); i++) {
            word += grid[rowIndex][i];
            newHighlightedLetters.push(`${rowIndex}-${i}`);
          }
          if (colIndex < selectedCol) {
            word = word.split('').reverse().join('');
          }
        } else if (colIndex === selectedCol) {
          for (var i = Math.min(rowIndex, selectedRow); i <= Math.max(rowIndex, selectedRow); i++) {
            word += grid[i][colIndex];
            newHighlightedLetters.push(`${i}-${colIndex}`);
          }
          if (rowIndex < selectedRow) {
            word = word.split('').reverse().join('');
          }
        } else if (rowIndex < selectedRow && colIndex < selectedCol) {
          for (var i = 0; i <= Math.abs(rowIndex - selectedRow); i++) {
            word += grid[rowIndex + i][colIndex + i];
            newHighlightedLetters.push(`${rowIndex + i}-${colIndex + i}`);
          }
          word = word.split('').reverse().join('');
        } else if (rowIndex < selectedRow && colIndex > selectedCol) {
          for (var i = 0; i <= Math.abs(rowIndex - selectedRow); i++) {
            word += grid[rowIndex + i][colIndex - i];
            newHighlightedLetters.push(`${rowIndex + i}-${colIndex - i}`);
          }
          word = word.split('').reverse().join('');
        } else if (rowIndex > selectedRow && colIndex < selectedCol) {
          for (var i = 0; i <= Math.abs(rowIndex - selectedRow); i++) {
            word += grid[rowIndex - i][colIndex + i];
            newHighlightedLetters.push(`${rowIndex - i}-${colIndex + i}`);
          }
          word = word.split('').reverse().join('');
        } else if (rowIndex > selectedRow && colIndex > selectedCol) {
          for (var i = 0; i <= Math.abs(rowIndex - selectedRow); i++) {
            word += grid[rowIndex - i][colIndex - i];
            newHighlightedLetters.push(`${rowIndex - i}-${colIndex - i}`);
          }
          word = word.split('').reverse().join('');
        }

        if (Object.keys(words).includes(word.toLowerCase())) {
          setFoundWords((prev) => [...prev, word.toLowerCase()]);
          setHighlightedLetters((prev) => [...prev, ...newHighlightedLetters]);
          setSelectedLetter('');
          if (foundWords.length + 1 === Object.keys(words).length) {
            onOpen();

            const token = localStorage.getItem('token');
            axios.post(`${SERVER_HOST}/completed-game`, {
              words_changed: {
                'Known': learning,
                'Still Learning': notSeen,
              },
              words,
              game: 'Word search'
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
        } else {
          setSelectedLetter('');
        }
      } else {
        setSelectedLetter('');
      }
    }
  };

  return (
    <Box px={8} py={6} maxW='container.lg' w='full' mx='auto'>
      <Flex direction='row' justify='space-between'>
        <Heading size='lg'>{language === 'en' ? 'Word Search!' : '单词搜索'}</Heading>
        <InstructionsButtonModal 
          language={language}
          zhInstructions='在网格中找到所有隐藏的单词。单词可以水平、垂直或对角放置。'
          enInstructions='Find all the hidden words in the grid. Words can be placed horizontally, vertically, or diagonally.' 
          color='red'
        />
      </Flex>
      <Stack direction='row' mt={6} gap={6} justify='center'>
        <Box rounded='lg' borderWidth='1px' borderColor='red.500' p={4}>
          {grid.map((row, rowIndex) => (
            <Flex key={rowIndex}>
              {row.map((letter, colIndex) => (
                <Box
                  key={colIndex}
                  w='1.5em'
                  h='1.5em'
                  fontSize='3xl'
                  fontWeight='bold'
                  textAlign='center'
                  lineHeight='1.5em'
                  bg={highlightedLetters.includes(`${rowIndex}-${colIndex}`) ? 'red.300' : 'transparent'}
                  color={highlightedLetters.includes(`${rowIndex}-${colIndex}`) ? 'white' : 'red.500'}
                  rounded='full'
                  cursor='pointer'
                  borderWidth={selectedLetter === `${rowIndex}-${colIndex}` ? '2px' : '0px'}
                  borderColor='red.500'
                  onClick={() => handleClickLetter(rowIndex, colIndex)}
                >
                  {letter}
                </Box>         
              ))}
            </Flex>
          ))}
        </Box>
        <Flex direction='column' align='stretch' gap={6}>
          <Stack flexGrow={1} bg='red.100' rounded='lg' align='center' px={8} py={6}>
            {Object.keys(words).map((word, index) => (
              <Box key={index} fontSize='lg' fontWeight={foundWords.includes(word) ? 'bold' : ''}>{word}</Box>
            ))}
          </Stack>
          <Box px={8} py={6} bg='red.100' rounded='lg' align='center'>
            {foundWords.length} / {Object.keys(words).length} found
          </Box>
        </Flex>
      </Stack>
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

export default WordSearchPage;