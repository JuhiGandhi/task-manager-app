import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper } from '@mui/material';
import { AssignmentTurnedIn, WorkOutline, PlaylistAddCheck } from '@mui/icons-material';


const HomePage = () => {
  const lists = useSelector((state) => state.lists.lists);
  const taskCounts = {
    'To Do': lists.find(list => list.title === 'To Do')?.tasks.length || 0,
    'In Progress': lists.find(list => list.title === 'In Progress')?.tasks.length || 0,
    'Done': lists.find(list => list.title === 'Done')?.tasks.length || 0,
  };
  const totalTasks = Object.values(taskCounts).reduce((sum, count) => sum + count, 0);

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 4,backgroundColor: '#f4f6f8'}}>
      {/* Project Overview Section */}
      <Paper elevation={4} sx={{ padding: '20px', borderRadius: '12px', backgroundColor: '#f5f6f8' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '16px', color: '#3f51b5' }}>
          Project Overview
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Total Tasks: {totalTasks}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '12px' }}>
          This project contains tasks spread across different categories. Here's a snapshot of their current status.
        </Typography>
      </Paper>

      {/* Task Categories Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 4, 
        }}
      >
        {/* To Do Box */}
        <Paper
          elevation={4}
          sx={{
            padding: '20px',
            backgroundColor: '#e8f5e9',
            borderRadius: '12px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <PlaylistAddCheck fontSize="large" color="success" />
          <Typography variant="h6" sx={{ marginTop: '8px' }} color="green">
            To Do
          </Typography>
          <Box
            sx={{
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: '#c8e6c9',
              color: '#388e3c',
              fontSize: '2rem',
              fontWeight: 'bold',
              boxShadow: 3,
              marginTop: '8px',
            }}
          >
            {taskCounts['To Do']}
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: '8px' }}>
            Tasks waiting to be picked up.
          </Typography>
        </Paper>

        {/* In Progress Box */}
        <Paper
          elevation={4}
          sx={{
            padding: '20px',
            backgroundColor: '#fff3e0',
            borderRadius: '12px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <WorkOutline fontSize="large" color="warning" />
          <Typography variant="h6" sx={{ marginTop: '8px' }} color="orange">
            In Progress
          </Typography>
          <Box
            sx={{
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: '#ffe0b2',
              color: '#f57c00',
              fontSize: '2rem',
              fontWeight: 'bold',
              boxShadow: 3,
              marginTop: '8px',
            }}
          >
            {taskCounts['In Progress']}
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: '8px' }}>
            Tasks currently being worked on.
          </Typography>
        </Paper>

        {/* Done Box */}
        <Paper
          elevation={4}
          sx={{
            padding: '20px',
            backgroundColor: '#e3f2fd',
            borderRadius: '12px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <AssignmentTurnedIn fontSize="large" color="primary" />
          <Typography variant="h6" sx={{ marginTop: '8px' }} color="blue">
            Done
          </Typography>
          <Box
            sx={{
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: '#bbdefb',
              color: '#1976d2',
              fontSize: '2rem',
              fontWeight: 'bold',
              boxShadow: 3,
              marginTop: '8px',
            }}
          >
            {taskCounts['Done']}
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: '8px' }}>
            Completed tasks.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default HomePage;
