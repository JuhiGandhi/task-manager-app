// src/components/Lists.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, addList } from '../redux/slices/listSlice';
import { Button, TextField, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

const Lists = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists.lists);
  const [newTask, setNewTask] = useState('');
  const [selectedListId, setSelectedListId] = useState(null);

  const handleAddTask = () => {
    if (newTask && selectedListId) {
      dispatch(addTask({ listId: selectedListId, task: { id: Date.now(), title: newTask } }));
      setNewTask('');
    }
  };

  const handleRemoveTask = (listId, taskId) => {
    dispatch(removeTask({ listId, taskId }));
  };

  return (
    <div>
      {lists.map(list => (
        <div key={list.id}>
          <Typography variant="h6">{list.title}</Typography>
          <List>
            {list.tasks.map(task => (
              <ListItem key={task.id}>
                <ListItemText primary={task.title} />
                <Button onClick={() => handleRemoveTask(list.id, task.id)}>Remove</Button>
              </ListItem>
            ))}
          </List>
          <TextField
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
          <Button onClick={() => handleAddTask()}>Add Task</Button>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default Lists;
