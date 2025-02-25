import { Box, Button, Center, Flex, Heading, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, ArcElement, LinearScale, Title, Tooltip, Legend, CategoryScale, plugins } from 'chart.js';
import { GoPersonFill } from 'react-icons/go';
import MatchingCard from './MatchingCard';
import { useNavigate } from 'react-router-dom';

Chart.register(ArcElement);

const StudentHome = ({ language }) => {
  console.log('StudentHome language:', language);
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
  };

  return (
    <Stack px={6} py={4} gap={8} maxW='container.lg' w='full' mx='auto'>
      <Flex gap={8} align='stretch'>
        <Box 
          borderWidth='1px' 
          borderColor='blue.300' 
          borderRadius='xl'
          px={8}
          pt={6}
          pb={8}
          w='50%'
        >
          <Flex direction='row' justify='space-between'>
            <Heading size='md'>{language === 'en' ? 'Dashboard' : '仪表板'}</Heading>
            <Button maxW={24} w='full' colorScheme='blue' size='sm' bg='blue.500' onClick={() => navigate('/student-dashboard')}>
              {language === 'en' ? 'Go!' : '出发!'}
            </Button>
          </Flex>
          <Stack direction='row' h='200px' align='center' justify='center' w='full'>
            <Pie data={data} options={options} />
            <Icon as={GoPersonFill} h='100px' w='100px' color='blue.500' />
          </Stack>
        </Box>
        <Box 
          borderWidth='1px' 
          borderColor='green.300' 
          borderRadius='xl'
          px={8}
          pt={6}
          pb={8}
          w='50%'
        >
          <Flex direction='row' justify='space-between'>
            <Heading size='md'>
              {language === 'en' ? 'Matching Game' : '匹配'}
            </Heading>
            <Button maxW={24} w='full' colorScheme='green' size='sm' onClick={() => navigate('/matching')}>
              {language === 'en' ? 'Start!' : '开始!'}
            </Button>
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
      </Flex>
      <Box 
        borderWidth='1px' 
        borderColor='red.500' 
        borderRadius='xl'
        px={8}
        pt={6}
        pb={8}
        w='calc(50% - 1em)'
        mx='auto'
      >
        <Flex direction='row' justify='space-between'>
          <Heading size='md'>
            {language === 'en' ? 'Word Search Game' : '单词搜索'}
          </Heading>
          <Button maxW={24} w='full' colorScheme='red' size='sm' onClick={() => navigate('/word-search')}>
            {language === 'en' ? 'Start!' : '开始!'}
          </Button>
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
    </Stack>
  );
};

export default StudentHome;