import { Box, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoPersonFill } from 'react-icons/go';
import { SERVER_HOST } from './config';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const StudentDashboardPage = () => {
  const [words, setWords] = useState({});

  useEffect(() => {
    // Fetch the student's words from the server
    const id = 1;
    axios.get(`${SERVER_HOST}/students/${id}/words`)
      .then(response => {
        setWords(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const data = {
    labels: ['Known', 'Still Learning', 'Haven\'t Seen Yet'],
    datasets: [
      {
        data: [
          Object.keys(words['Known'] || {}).length,
          Object.keys(words['Still Learning'] || {}).length,
          Object.keys(words['Have not Seen Yet'] || {}).length
        ],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(75, 192, 192)'
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

  return (
    <Stack px={6} py={4} gap={8} maxW='container.lg' w='full' mx='auto' align='center'>
      <Heading size='lg' mt={10} alignSelf='flex-start'>
        <Icon as={GoPersonFill} color='blue.500' verticalAlign='middle' mb={1} mr={2} />
        Student Name's Progress!
      </Heading>
      <Stack direction='row' gap={12} align='center' w='full' justify='center'>
        <Box h='300px'>
          <Pie data={data} options={options} />
        </Box>
        <Box rounded='xl' borderColor='blue.100' borderWidth={1} px={8} py={6} w='50%'>
          <Text fontWeight='semibold' fontSize='lg' mb={6}>Great Job!</Text>
          <Text fontWeight='bold' color='green.500'>You already know {Object.keys(words['Known'] || {}).length} words!</Text>
          <Text fontWeight='bold' color='blue.500'>You are still learning {Object.keys(words['Still Learning'] || {}).length} words!</Text>
          <Text fontWeight='bold' color='red.500'>You haven't seen {Object.keys(words['Have not Seen Yet'] || {}).length} words yet!</Text>
        </Box>
      </Stack>
      <Flex align='stretch' direction='row' w='full' gap={4}>
        <Stack align='center' gap={2} bg='red.100' rounded='lg' p={6} flexGrow={1}>
          <Text fontSize='lg' mb={1}>Haven't seen yet...</Text>
          {words['Have not Seen Yet'] && Object.keys(words['Have not Seen Yet']).map((word) => (
            <Text key={word} fontSize='md' fontWeight='bold' color='red.500'>{word}</Text>
          ))}
        </Stack>
        <Stack align='center' gap={2} bg='blue.100' rounded='lg' p={6} flexGrow={1}>
          <Text fontSize='lg' mb={1}>Still learning...</Text>
          {words['Still Learning'] && Object.keys(words['Still Learning']).map((word) => (
            <Text key={word} fontSize='md' fontWeight='bold' color='blue.500'>{word}</Text>
          ))}
        </Stack>
        <Stack align='center' gap={2} bg='green.100' rounded='lg' p={6} flexGrow={1}>
          <Text fontSize='lg' mb={1}>Known...</Text>
          {words['Known'] && Object.keys(words['Known']).map((word) => (
            <Text key={word} fontSize='md' fontWeight='bold' color='green.500'>{word}</Text>
          ))}
        </Stack>
      </Flex>
    </Stack>
  );
};

export default StudentDashboardPage;