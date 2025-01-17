import { Box, Button, Center, Flex, Heading, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, ArcElement, LinearScale, Title, Tooltip, Legend, CategoryScale, plugins } from 'chart.js';
import { GoPersonFill } from 'react-icons/go';
import MatchingCard from './MatchingCard';
import { useNavigate } from 'react-router-dom';

Chart.register(ArcElement);

const StudentHome = () => {
  const navigate = useNavigate();

  const data = {
    datasets: [
      {
        data: [3, 3, 3],
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
      tooltip: {
        enabled: false
      }
    }
  }

  return (
    <SimpleGrid columns={2} px={6} py={4} gap={8} maxW='container.lg' w='full' mx='auto'>
      <Box 
        borderWidth='1px' 
        borderColor='blue.700' 
        borderRadius='xl'
        px={8}
        pt={6}
        pb={8}
      >
        <Flex direction='row' justify='space-between'>
          <Heading size='md'>Dashboard</Heading>
          <Button maxW={24} w='full' colorScheme='blue' size='sm' bg='blue.700' onClick={() => navigate('/student-dashboard')}>Go!</Button>
        </Flex>
        <Stack direction='row' h='200px' align='center' justify='center' w='full'>
          <Pie data={data} options={options} />
          <Icon as={GoPersonFill} h='100px' w='100px' color='blue.700' />
        </Stack>
      </Box>
      <Box 
        borderWidth='1px' 
        borderColor='green.500' 
        borderRadius='xl'
        px={8}
        pt={6}
        pb={8}
      >
        <Flex direction='row' justify='space-between'>
          <Heading size='md'>Hangman Game</Heading>
          <Button maxW={24} w='full' colorScheme='green' size='sm' onClick={() => navigate('/hangman')}>Start!</Button>
        </Flex>
        <Center>
          <svg width='200' height='200' viewBox='0 0 200 220'>
            {/* Gallows */}
            <line x1='40' y1='20' x2='142' y2='20' stroke='#38A169' strokeWidth='4' />
            <line x1='140' y1='20' x2='140' y2='50' stroke='#38A169' strokeWidth='4' />
            <line x1='40' y1='18' x2='40' y2='210' stroke='#38A169' strokeWidth='4' />
            <line x1='0' y1='210' x2='80' y2='210' stroke='#38A169' strokeWidth='4' />

            {/* Head */}
            <circle cx='140' cy='70' r='20' stroke='#38A169' strokeWidth='4' fill='none' />

            {/* Body */}
            <line x1='140' y1='90' x2='140' y2='150' stroke='#38A169' strokeWidth='4' />

            {/* Arms */}
            <line x1='170' y1='120' x2='110' y2='120' stroke='#38A169' strokeWidth='4' />

            {/* Legs */}
            <line x1='140' y1='150' x2='120' y2='180' stroke='#38A169' strokeWidth='4' />
            <line x1='140' y1='150' x2='160' y2='180' stroke='#38A169' strokeWidth='4' />
          </svg>
        </Center>
      </Box>
      <Box 
        borderWidth='1px' 
        borderColor='red.500' 
        borderRadius='xl'
        px={8}
        pt={6}
        pb={8}
      >
        <Flex direction='row' justify='space-between'>
          <Heading size='md'>Word Search Game</Heading>
          <Button maxW={24} w='full' colorScheme='red' size='sm' onClick={() => navigate('/word-search')}>Start!</Button>
        </Flex>
        <Center fontFamily='Courier New, Courier, monospace' mt={4}>
          <Stack gap={0} fontSize='lg' fontWeight='bold' color='red.500'>
            <Text>S J C A M P M C</Text>
            <Text>W G L A M C H M</Text>
            <Text>I J M M P Y Y Z</Text>
            <Text>M V K B E A C H</Text>
            <Text>S U M M E R M S</Text>
            <Text>M H O T E B H U</Text>
            <Text>C V E R N O N S</Text>
          </Stack>
        </Center>
      </Box>
      <Box 
        borderWidth='1px' 
        borderColor='blue.300' 
        borderRadius='xl'
        px={8}
        pt={6}
        pb={8}
      >
        <Flex direction='row' justify='space-between'>
          <Heading size='md'>Matching Game</Heading>
          <Button maxW={24} w='full' colorScheme='blue' size='sm' onClick={() => navigate('/matching')}>Start!</Button>
        </Flex>
        <Center w='full' mt={5}>
          <SimpleGrid columns={2} rowGap={2} columnGap={24} w='full'>
            <MatchingCard word='bird' />
            <MatchingCard word='食物' />
            <MatchingCard word='food' />
            <MatchingCard word='猫' />
            <MatchingCard word='cat' />
            <MatchingCard word='鸟' />
          </SimpleGrid>
        </Center>
      </Box>
    </SimpleGrid>
  );
};

export default StudentHome;