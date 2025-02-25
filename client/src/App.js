import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react'
import NavBar from './NavBar';
import HomePage from './HomePage';
import StudentLoginPage from './StudentLoginPage';
import AdminLoginPage from './AdminLoginPage';
import StudentHomePage from './StudentHomePage';
import WordSearchPage from './WordSearchPage';
import MatchingPage from './MatchingPage';
import StudentDashboardPage from './StudentDashboardPage';
import AdminDashboardPage from './AdminDashboardPage';
import AdminSignUpPage from './AdminSignUpPage';
import StudentDetailsPage from './StudentDetailsPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_HOST } from './config';

function App() {
  const [user, setUser] = useState('');
  const [name, setName] = useState('');

  const [language, setLanguage] = useState('en');

  const getUser = () => {
    axios.get(`${SERVER_HOST}/user`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        setUser(response.data.account_type);
        setName(response.data.name);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(getUser, []);

  return (
    <ChakraProvider>
      <Router>
        <Flex direction='column' justify='stretch' height='100%'>
          <NavBar user={user} name={name} setUser={setUser} setName={setName} language={language} setLanguage={setLanguage} />
          <Routes>
            <Route path='/' element={<HomePage language={language} />} />
            <Route path='/student-login' element={<StudentLoginPage getUser={getUser} language={language} />} />
            <Route path='/admin-login' element={<AdminLoginPage getUser={getUser} />} />
            <Route path='/admin-signup' element={<AdminSignUpPage getUser={getUser} />} />
            <Route path='/student-home' element={<StudentHomePage language={language} />} />
            <Route path='/student-dashboard' element={<StudentDashboardPage language={language} />} />
            <Route path='/word-search' element={<WordSearchPage language={language} />} />
            <Route path='/matching' element={<MatchingPage language={language} />} />
            <Route path='/admin-dashboard' element={<AdminDashboardPage />} />
            <Route path='/student-details/:id' element={<StudentDetailsPage />} />
          </Routes>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
