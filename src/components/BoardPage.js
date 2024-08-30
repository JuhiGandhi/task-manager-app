import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask,updateTask } from '../redux/reducers/listSlice'; 
import TaskBoard from './TaskBoard';

const users = ['John', 'Bob', 'villains', 'Amelie'];

const BoardPage = () => {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', date: '', user: '' });
  const [currentListId, setCurrentListId] = useState(1);
  const [editingTask, setEditingTask] = useState(null);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };
  

   const handleAddTask = () => {
    if (newTask.title && newTask.date && newTask.user) {
      if (editingTask) {
        dispatch(updateTask({ listId: currentListId, task: { ...newTask, id: editingTask.id } }));
        setEditingTask(null);
      } else {
        dispatch(addTask({ listId: currentListId, task: newTask }));
      }
      setNewTask({ title: '', date: '', user: '' });
    }
    setOpen(false);
  };

  

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f4f4f9', 
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
        }}
      >
        <div style={{display:"flex",justifyContent:'space-between',alignItems:"center"}}>
        <h2>Key Tasks</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
        
        >
        Add Task
        </Button>
        </div>
        <TaskBoard setEditDialogOpen={setOpen} setNewTask={setNewTask} setCurrentListId={setCurrentListId} setEditingTask={setEditingTask}/>
      </Box>

      {/* Dialog for Adding New Task */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingTask ? 'Update Task' : 'Add Task'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            name="title"
            label="Task Title"
            variant="outlined"
            value={newTask.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="date"
            type="date"
            variant="outlined"
            value={newTask.date}
            onChange={handleChange}
            sx={{ mb: 2 }}    
          />
          <TextField
            select
            fullWidth
            name="user"
            label="Assign User"
            variant="outlined"
            value={newTask.user}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            {users.map((user, index) => (
              <MenuItem key={index} value={user}>
                {user}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddTask}
            color="primary"
            variant="contained"
            disabled={!newTask.title || !newTask.date || !newTask.user}
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BoardPage;
