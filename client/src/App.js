import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react'
import NavBar from './NavBar';
import HomePage from './HomePage';
import StudentLoginPage from './StudentLoginPage';
import AdminLoginPage from './AdminLoginPage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Flex direction='column' justify='stretch' height='100%'>
          <NavBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/student-login' element={<StudentLoginPage />} />
            <Route path='/admin-login' element={<AdminLoginPage />} />
          </Routes>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
