import { Box, Flex, Heading, Stack, Link as ChakraLink, VStack, Divider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Input, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_HOST } from './config';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [known, setKnown] = useState(0);
  const [learning, setLearning] = useState(0);
  const [notSeen, setNotSeen] = useState(0);

  const [code, setCode] = useState('');

  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    axios.get(`${SERVER_HOST}/students`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then((res) => {
        setStudents(res.data);

        var newKnown = 0;
        var newLearning = 0;
        var newNotSeen = 0;
        for (const student of res.data) {
          newKnown += Object.keys(student.words['Known']).length;
          newLearning += Object.keys(student.words['Still Learning']).length;
          newNotSeen += Object.keys(student.words['Have not Seen Yet']).length;
        }
        setKnown(newKnown);
        setLearning(newLearning);
        setNotSeen(newNotSeen);
        console.log(newKnown, newLearning, newNotSeen);
      })
      .catch((err) => {
        console.error(err);
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

  const handleCreateAccount = () => {
    axios.post(`${SERVER_HOST}/create-student`, { name: studentName, email: studentEmail, password: studentPassword, classCode: code })
      .then((res) => {
        setStudents([...students, res.data]);
        onClose();
        toast({
          title: 'Success!',
          description: 'Student account created successfully.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error(err);

        toast({
          title: 'Error',
          description: err.response.data.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleOpenModal = () => {
    axios.get(`${SERVER_HOST}/class-code`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then((res) => {
        setCode(res.data.classCode);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate('/admin-login');
        }
        console.error(err);
      });
    onOpen();
  };

  return (
    <Stack px={6} py={4} gap={8} maxW='container.lg' w='full' mx='auto' align='center'>
      <Heading size='lg' mt={10}>View Your Students' Progress</Heading>
      <Flex align='center' gap={12}>
        <Flex direction='column' justify='space-between' bg='blue.100' px={0} pt={6} rounded='lg' gap={0} h='50vh'>
          <VStack gap={3} px={12}>
            {students.map((student) => (
              <ChakraLink fontSize='lg' as={RouterLink} to={`/student-details/${student.user_id}`} fontWeight='bold' textDecoration='underline' key={student.userId} target='_blank'>{student.name}</ChakraLink>
            ))}
            {students.length === 0 && (
              <Text fontSize='lg'>No students found.</Text>
            )}
          </VStack>
          <VStack gap={0}>
            <Divider borderColor='blue.300' />
            <Button onClick={handleOpenModal} h='36px' size='lg' w='full' roundedTop='none' bg='blue.100' color='blue.500' _hover={{ bg: 'blue.300'  }}>+</Button>
          </VStack>
        </Flex>
        {students.length > 0 && (known != 0 || learning != 0 || notSeen != 0) && (
          <Box>
            <Pie data={data} options={options} />
          </Box>
        )}
        {students.length > 0 && (known === 0 && learning === 0 && notSeen === 0) && (
          <Text fontSize='lg' ml={12}>No words found.</Text>
        )}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={0}>Create a New Student Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text color='gray.500' mb={3}>Class Code: {code}</Text>
            <Input mb={2} placeholder='Student Name' value={studentName} onChange={(e) => setStudentName(e.target.value)} />
            <Input mb={2} type='email' placeholder='Student Email' value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
            <Input type='password' placeholder='Student Password' value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} />
            <Button colorScheme='blue' mt={4} w='full' onClick={handleCreateAccount}>Create Account</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default AdminDashboardPage;