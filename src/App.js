import React from 'react';
import {Routes,BrowserRouter,Route} from "react-router-dom";
import { Box } from '@mui/material';
import HeaderFile from './components/HeaderFile'; 
import { HomePage } from './components/HomePage';
import BoardPage from './components/BoardPage';
const drawerWidth = 240;


export default function App() {
  return (
    <BrowserRouter>
      <HeaderFile /> {/* HeaderFile should be rendered first */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px',
          marginLeft: { lg: `${drawerWidth}px`, xs: '0px' }, // Shift content for large screens
          // width: { lg: `calc(100% - ${drawerWidth}px)`, xs: '100%' }, // Handle width based on screen size
          backgroundColor: '#e0e0e0', 
          height:""
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board" element={<BoardPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
   
  );
}


