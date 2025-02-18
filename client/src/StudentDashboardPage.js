import { Box, Center, Flex, Heading, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoPersonFill } from 'react-icons/go';
import { SERVER_HOST } from './config';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

Chart.register(ArcElement, Tooltip, Legend);

const StudentDashboardPage = () => {
  const navigate = useNavigate();

  const [words, setWords] = useState({});
  const [name, setName] = useState('');

  const [known, setKnown] = useState(0);
  const [learning, setLearning] = useState(0);
  const [notSeen, setNotSeen] = useState(0);

  useEffect(() => {
    // Fetch the student's words from the server
    axios.get(`${SERVER_HOST}/student`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        setWords(response.data.words);
        setName(response.data.name);
        setKnown(Object.keys(response.data.words['Known'] || {}).length);
        setLearning(Object.keys(response.data.words['Still Learning'] || {}).length);
        setNotSeen(Object.keys(response.data.words['Have not Seen Yet'] || {}).length);
      })
      .catch(error => {
        if (error.response.status === 401) {
          navigate('/student-login');
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
        position: 'left',
        labels: {
          font: {
            size: 16
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <Stack px={6} py={4} gap={8} maxW='container.lg' w='full' mx='auto' align='center'>
      <Heading size='lg' mt={10} alignSelf='flex-start'>
        <Icon as={GoPersonFill} color='blue.500' verticalAlign='middle' mb={1} mr={2} />
        {name}'s Progress!
      </Heading>
      <Stack direction='row' gap={12} align='center' w='full' justify='center'>
        {!(known === 0 && learning === 0 && notSeen === 0) && (
          <Box width='400px' height='200px'>
            <Pie data={data} options={options}/>
          </Box>
        )}
        {(known === 0 && learning === 0 && notSeen === 0) && (
          <Center textAlign='center' bg='gray.100' p={8} borderRadius='full' h='200px' w='200px'>
            No words have been assigned to this student yet.
          </Center>
        )}
        <Box rounded='xl' borderColor='blue.100' borderWidth={1} px={8} py={6} w='50%'>
          <Text fontWeight='semibold' fontSize='lg' mb={4}>Great Job!</Text>
          <Text fontWeight='bold' color='green.500'>You already know {Object.keys(words['Known'] || {}).length} words!</Text>
          <Text fontWeight='bold' color='blue.500'>You are still learning {Object.keys(words['Still Learning'] || {}).length} words!</Text>
          <Text fontWeight='bold' color='red.500'>You haven't seen {Object.keys(words['Have not Seen Yet'] || {}).length} words yet!</Text>
        </Box>
      </Stack>
      <SimpleGrid columns={3} w='full' gap={4}>
        <Stack align='center' gap={2} bg='red.100' rounded='lg' p={6} flexGrow={1}>
          <Text fontSize='lg' mb={1}>Haven't seen yet...</Text>
          {words['Have not Seen Yet'] && Object.keys(words['Have not Seen Yet']).map((word) => (
            <Text key={word} fontSize='md' fontWeight='bold' color='red.500'>{word}</Text>
          ))}
          {notSeen === 0 && (
            <Text fontSize='md' fontWeight='bold' color='red.500'>No words to show.</Text>
          )}
        </Stack>
        <Stack align='center' gap={2} bg='blue.100' rounded='lg' p={6} flexGrow={1}>
          <Text fontSize='lg' mb={1}>Still learning...</Text>
          {words['Still Learning'] && Object.keys(words['Still Learning']).map((word) => (
            <Text key={word} fontSize='md' fontWeight='bold' color='blue.500'>{word}</Text>
          ))}
          {learning === 0 && (
            <Text fontSize='md' fontWeight='bold' color='blue.500'>No words to show.</Text>
          )}
        </Stack>
        <Stack align='center' gap={2} bg='green.100' rounded='lg' p={6} flexGrow={1}>
          <Text fontSize='lg' mb={1}>Known...</Text>
          {words['Known'] && Object.keys(words['Known']).map((word) => (
            <Text key={word} fontSize='md' fontWeight='bold' color='green.500'>{word}</Text>
          ))}
          {known === 0 && (
            <Text fontSize='md' fontWeight='bold' color='green.500'>No words to show.</Text>
          )}
        </Stack>
      </SimpleGrid>
    </Stack>
  );
};

export default StudentDashboardPage;