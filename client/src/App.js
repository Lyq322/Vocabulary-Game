import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react'
import NavBar from './NavBar';
import HomePage from './HomePage';
import StudentLoginPage from './StudentLoginPage';
import AdminLoginPage from './AdminLoginPage';
import StudentHome from './StudentHome';
import WordSearchPage from './WordSearchPage';
import MatchingPage from './MatchingPage';
import StudentDashboardPage from './StudentDashboardPage';
import AdminDashboardPage from './AdminDashboardPage';
import AdminSignUpPage from './AdminSignUpPage';
import StudentDetailsPage from './StudentDetailsPage';

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
            <Route path='/admin-signup' element={<AdminSignUpPage />} />
            <Route path='/student-home' element={<StudentHome />} />
            <Route path='/student-dashboard' element={<StudentDashboardPage />} />
            <Route path='/word-search' element={<WordSearchPage />} />
            <Route path='/matching' element={<MatchingPage />} />
            <Route path='/admin-dashboard' element={<AdminDashboardPage />} />
            <Route path='/student-details/:id' element={<StudentDetailsPage />} />
          </Routes>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
