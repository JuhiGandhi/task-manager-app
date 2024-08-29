// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Box, Card, CardContent, Typography, Grid, Chip, Divider, TextField, Button, MenuItem, IconButton } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import { addTask, initializeLists, updateTask, removeTask, reorderTasks } from '../redux/slices/listSlice'; 
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const users = ['John', 'Bob', 'villains', 'Amelie'];

// const TaskBoard = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const lists = useSelector(state => state.lists.lists);
  
//   const [newTask, setNewTask] = useState({ title: '', date: '', user: '' });
//   const [currentListId, setCurrentListId] = useState(1);
//   const [draggedTask, setDraggedTask] = useState(null);
//   const [editingTask, setEditingTask] = useState(null);

//   useEffect(() => {
//     if (!lists.length) {
//       dispatch(initializeLists());
//     }
//   }, [dispatch, lists.length]);

//   const handleChange = (e) => {
//     setNewTask({ ...newTask, [e.target.name]: e.target.value });
//   };

//   const handleAddTask = () => {
//     if (newTask.title && newTask.date && newTask.user) {
//       if (editingTask) {
//         dispatch(updateTask({ listId: currentListId, task: { ...newTask, id: editingTask.id } }));
//         setEditingTask(null);
//       } else {
//         dispatch(addTask({ listId: currentListId, task: newTask }));
//       }
//       setNewTask({ title: '', date: '', user: '' });
//     }
//   };

//   const handleEdit = (task, listId) => {
//     setEditingTask(task);
//     setNewTask({ title: task.title, date: task.date, user: task.user });
//     setCurrentListId(listId);
//   };

//   const handleDelete = (taskId, listId) => {
//     dispatch(removeTask({ taskId, listId }));
//   };

//   // Native drag and drop handlers
//   const handleDragStart = (task, listId) => {
//     console.log('Drag Start Task:', task);  // Log the task object
//   console.log('Drag Start List ID:', listId);  // Log the listId
//     setDraggedTask({ task, listId });
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault(); // Necessary to allow dropping
//   };

//   const handleDrop = (destinationListId) => {
//     if (draggedTask && draggedTask.task && draggedTask.listId) {
//       const sourceList = lists.find(list => list.id === draggedTask.listId);
//       const sourceIndex = sourceList.tasks.findIndex(task => task.id === draggedTask.task.id);
  
//       // When dropping, the task should go to the bottom of the destination list
//       dispatch(reorderTasks({
//         sourceListId: draggedTask.listId,
//         destinationListId,
//         sourceIndex,
//         destinationIndex: null // Append to the end of the list
//       }));
//       setDraggedTask(null); // Reset dragged task
//     }
//   };
  
  

//   return (
//     <Box sx={{ flexGrow: 1, p: 2 }}>
//       <Grid container spacing={3}>
//         {lists.map((list) => (
//           <Grid item xs={12} sm={4} key={list.id}>
//             <Card
//               sx={{ borderRadius: '8px', boxShadow: 3 }}
//               onDragOver={handleDragOver}
//               onDrop={() => handleDrop(list.id)}
//             >
//               <CardContent>
//                 <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
//                   {list.title}
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />

//                 {list.tasks.length > 0 ? (
//                   list.tasks.map((task) => (
//                     <Box
//                       key={task.id}
//                       sx={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         mb: 1,
//                         p: 1,
//                         borderRadius: '4px',
//                         backgroundColor: theme.palette.background.paper,
//                         boxShadow: 1,
//                       }}
//                       draggable="true"
//                       onDragStart={() => handleDragStart(task, list.id)}
//                     >
//                       <Box>
//                         <Typography variant="body2">{task.title}</Typography>
//                         <Typography variant="caption" color="textSecondary">
//                           Due: {task.date}
//                         </Typography>
//                       </Box>
//                       <Chip label={task.user} color="primary" />
//                       <Box>
//                         <IconButton onClick={() => handleEdit(task, list.id)} color="primary">
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton onClick={() => handleDelete(task.id, list.id)} color="secondary">
//                           <DeleteIcon />
//                         </IconButton>
//                       </Box>
//                     </Box>
//                   ))
//                 ) : (
//                   <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
//                     No tasks yet
//                   </Typography>
//                 )}

//                 {list.title === 'To Do' && (
//                   <Box sx={{ mt: 2 }}>
//                     <TextField
//                       fullWidth
//                       name="title"
//                       label="Task Title"
//                       variant="outlined"
//                       value={newTask.title}
//                       onChange={handleChange}
//                       sx={{ mb: 1 }}
//                     />
//                     <TextField
//                       fullWidth
//                       name="date"
//                       type="date"
//                       variant="outlined"
//                       value={newTask.date}
//                       onChange={handleChange}
//                       sx={{ mb: 1 }}
//                     />
//                     <TextField
//                       select
//                       fullWidth
//                       name="user"
//                       label="Assign User"
//                       variant="outlined"
//                       value={newTask.user}
//                       onChange={handleChange}
//                       sx={{ mb: 1 }}
//                     >
//                       {users.map((user, index) => (
//                         <MenuItem key={index} value={user}>
//                           {user}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={handleAddTask}
//                       disabled={!newTask.title || !newTask.date || !newTask.user}
//                     >
//                       {editingTask ? 'Update Task' : 'Add Task'}
//                     </Button>
//                   </Box>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default TaskBoard;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardContent, Typography, Grid, Chip, Divider, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { addTask, initializeLists, updateTask, removeTask, reorderTasks } from '../redux/slices/listSlice'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskBoard = ({setEditDialogOpen,setNewTask,setCurrentListId,setEditingTask}) => {
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
    <Grid container spacing={3}>
      {lists.map((list) => (
        <Grid item xs={12} sm={4} key={list.id}>
          <Card
            sx={{ borderRadius: '8px', boxShadow: 3, height: '500px', overflowY: 'auto' }}
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
                  No tasks yet
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskBoard;
