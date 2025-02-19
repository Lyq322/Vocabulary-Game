import { Box, Button, Center, Divider, Flex, Heading, Icon, IconButton, Input, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoPersonFill } from 'react-icons/go';
import { SERVER_HOST } from './config';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

Chart.register(ArcElement, Tooltip, Legend);

const StudentDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState('');

  const [words, setWords] = useState({});
  const [known, setKnown] = useState(0);
  const [learning, setLearning] = useState(0);
  const [notSeen, setNotSeen] = useState(0);
  const [records, setRecords] = useState([]);

  const [englishWord, setEnglishWord] = useState('');
  const [chineseWord, setChineseWord] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the student's words from the server
    axios.get(`${SERVER_HOST}/students/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        var newWords = response.data.words;
        if (!newWords) {
          newWords = {};
        }
        setWords(newWords);
        setKnown(Object.keys(newWords['Known'] || {}).length);
        setLearning(Object.keys(newWords['Still Learning'] || {}).length);
        setNotSeen(Object.keys(newWords['Have not Seen Yet'] || {}).length);

        setRecords(response.data.records);
        setName(response.data.name);
      })
      .catch(error => {
        if (error.response.status === 401) {
          navigate('/admin-login');
        }
        console.error(error);
      });
  }, []);


  const data = {
    labels: ['Known', 'Still Learning', 'Haven\'t Seen Yet'],
    datasets: [
      {
        data: [
          known,
          learning,
          notSeen
        ],
        backgroundColor: [
          'rgba(75, 192, 192)',
          'rgba(54, 162, 235)',
          'rgba(255, 99, 132)'
        ]
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 16
          }
        }
      }
    }
  };

  const handleAddWord = () => {
    if (englishWord === '' || chineseWord === '') {
      setError('Please enter both an English and Chinese word.');
      return;
    }

    axios.post(`${SERVER_HOST}/add-word/${id}`, {
      englishWord,
      chineseWord
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        setWords(response.data.words);
        setKnown(Object.keys(response.data.words['Known'] || {}).length);
        setLearning(Object.keys(response.data.words['Still Learning'] || {}).length);
        setNotSeen(Object.keys(response.data.words['Have not Seen Yet'] || {}).length);
        setEnglishWord('');
        setChineseWord('');
        console.log('no error??')
      })
      .catch(error => {
        console.log(error.response);
        if (error.response.status === 401) {
          navigate('/admin-login');
        }
        console.error(error);
        setError(error.response.data.message);
      });
  };

  const handleDeleteWord = (word) => {
    axios.post(`${SERVER_HOST}/delete-word/${id}`, {
      word
    }, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        setWords(response.data.words);
        setKnown(Object.keys(response.data.words['Known']).length);
        setLearning(Object.keys(response.data.words['Still Learning']).length);
        setNotSeen(Object.keys(response.data.words['Have not Seen Yet']).length);
      })
      .catch(error => {
        if (error.response.status === 401) {
          navigate('/admin-login');
        }
        console.error(error);
        setError(error.response.data.message);
      });
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };

  return (
    <Stack px={6} py={4} gap={8} maxW='container.lg' w='full' mx='auto' align='center' h='90vh'>
      <Heading size='lg' mt={10}>
        <Icon as={GoPersonFill} color='blue.500' verticalAlign='middle' mb={1} mr={2} />
        {name}'s Progress
      </Heading>
      <Flex direction='row' gap={8} w='full' h='full'>
        <Flex direction='column' gap={12} align='center' w='50%'>
          {!(known === 0 && learning === 0 && notSeen === 0) && (
            <Box h='300px'>
              <Pie data={data} options={options} />
            </Box>
          )}
          {(known === 0 && learning === 0 && notSeen === 0) && (
            <Center textAlign='center' bg='gray.100' p={8} borderRadius='full' h='200px' w='200px'>
              No words have been assigned to this student yet.
            </Center>
          )}
          <Box rounded='xl' w='full' borderWidth={1} borderColor='blue.100' px={8} py={6} flexGrow={1}>
            <Text fontSize='lg' fontWeight='semibold'>Recent Activity</Text>
            <Stack pl={4} mt={3} pr={8}>
              <ul>
                {records.map(record => (
                  <li key={record.id}>
                    <Text>
                      {record.game}: +<Box as='span'>{record.words_changed['Known']}</Box> known, +{record.words_changed['Still Learning']} still learning @ {formatDateTime(record.time)}
                    </Text>
                  </li>
                ))}
              </ul>
            </Stack>
            {records.length === 0 && (
              <Center h='full' mt={-8}>No recent activity.</Center>
            )}
          </Box>
        </Flex>
        <Flex direction='column' rounded='xl' w='50%' borderWidth={1} borderColor='blue.100' py={6}>
          <Text px={8} fontSize='lg' fontWeight='semibold'>Word List</Text>
          <Stack pl={12} mt={3} pr={8} flexGrow={1}>
            <ul>
              {Object.keys(words['Still Learning'] || {}).map(word => (
                <li key={word}>
                  <Stack direction='row' align='center'>
                    <Text color='blue.500' fontWeight='bold'>{word}</Text>
                    <IconButton onClick={() => handleDeleteWord(word)} icon={<FaTimes />} variant='ghost' size='sm' />
                  </Stack>
                </li>
              ))}
              {Object.keys(words['Have not Seen Yet'] || {}).map(word => (
                <li key={word}>
                  <Stack direction='row' align='center'>
                    <Text color='red.500' fontWeight='bold'>{word}</Text>
                    <IconButton onClick={() => handleDeleteWord(word)} icon={<FaTimes />} variant='ghost' size='sm' />
                  </Stack>
                </li>
              ))}
              {Object.keys(words['Known'] || {}).map(word => (
                <li key={word}>
                  <Stack direction='row' align='center'>
                    <Text color='green.500' fontWeight='bold'>{word}</Text>
                    <IconButton onClick={() => handleDeleteWord(word)} icon={<FaTimes />} variant='ghost' size='sm' />
                  </Stack>
                </li>
              ))}
            </ul>
            {known === 0 && learning === 0 && notSeen === 0 && (
              <Center pl={-4} mt={-8} h='full'>No words found.</Center>
            )}
          </Stack>
          <Divider my={4} borderColor='blue.100' borderWidth={1} />
          <Flex direction='row' gap={3} px={8}>
            <Stack direction='column' gap={3} flexGrow={1}>
              <Input placeholder='New English Word...' value={englishWord} onChange={(e) => setEnglishWord(e.target.value)} />
              <Input placeholder='New Chinese Word...' value={chineseWord} onChange={(e) => setChineseWord(e.target.value)} />
            </Stack>
            <Button colorScheme='blue' my='auto' onClick={handleAddWord}>Add</Button>
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default StudentDetailsPage;