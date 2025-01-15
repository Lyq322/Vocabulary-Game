import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Flex } from '@chakra-ui/react'
import NavBar from './NavBar';
import HomePage from './HomePage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Flex direction='column' justify='stretch' height='100%'>
          <NavBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
