
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CardContent, Typography, Chip, Divider, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {  initializeLists, removeTask, reorderTasks } from '../redux/reducers/listSlice'; 

const TaskBoard = ({ setEditDialogOpen, setNewTask, setCurrentListId, setEditingTask }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists.lists);
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    if (!lists.length) {
      dispatch(initializeLists());
    }
  }, [dispatch, lists.length]);

  const handleDelete = (taskId, listId) => {
    dispatch(removeTask({ taskId, listId }));
  };

  const handleEdit = (task, listId) => {
    setEditingTask(task);
    setNewTask({ title: task.title, date: task.date, user: task.user });
    setCurrentListId(listId);
    setEditDialogOpen(true);
  };

  const handleDragStart = (task, listId) => setDraggedTask({ task, listId });

  const handleDrop = (destinationListId) => {
    if (draggedTask && draggedTask.task && draggedTask.listId) {
      const sourceList = lists.find(list => list.id === draggedTask.listId);
      const sourceIndex = sourceList.tasks.findIndex(task => task.id === draggedTask.task.id);

      dispatch(reorderTasks({
        sourceListId: draggedTask.listId,
        destinationListId,
        sourceIndex,
        destinationIndex: null,
      }));
      setDraggedTask(null);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        gap: 3,
        padding: '20px',
        flexWrap: 'wrap',
      }}
    >
      {lists.map((list) => (
        <Box
          key={list.id}
          sx={{
            flex: '1 1 30%',
            maxWidth: { xs: '100%', md: '30%' },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px',
            boxShadow: 3,
            height: '500px',
            overflowY: 'auto',
            marginBottom: '20px',
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(list.id)}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              {list.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {list.tasks.length > 0 ? (
              list.tasks.map((task) => (
                <Box
                  key={task.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                    p: 1,
                    borderRadius: '4px',
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: 1,
                  }}
                  draggable="true"
                  onDragStart={() => handleDragStart(task, list.id)}
                >
                  <Box>
                    <Typography variant="body2">{task.title}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Due: {task.date}
                    </Typography>
                  </Box>
                  <Chip label={task.user} color="primary" />
                  <Box>
                    <IconButton onClick={() => handleEdit(task, list.id)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(task.id, list.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                No Items in This List
              </Typography>
            )}
          </CardContent>
        </Box>
      ))}
    </Box>
  );
};

export default TaskBoard;

