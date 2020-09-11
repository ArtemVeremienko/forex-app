import React from 'react';
import Main from './components/Main/Main';
import Box from '@material-ui/core/Box';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />

      <Main />

      <Footer />
    </Box>
  );
}
