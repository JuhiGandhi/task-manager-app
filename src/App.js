import React from 'react';
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Box } from '@mui/material';
import HeaderPage from './components/HeaderPage'; 
import HomePage from './components/HomePage';
import BoardPage from './components/BoardPage';

const drawerWidth = 240;

export default function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <HeaderPage /> {/* HeaderFile should be rendered first */}      
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: '64px', 
            marginLeft: { lg: `${drawerWidth}px`, xs: '0px' }, 
            backgroundColor: '#e0e0e0', 
          
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/board" element={<BoardPage />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}



