  // src/slices/listSlice.js
  import { createSlice } from '@reduxjs/toolkit';
  // Helper function to load data from local storage
  const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('tasks');
      if (serializedState === null) {    
      return{ lists:[] // Return default state if no data is present
        }
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return { lists:[] }; // Return default state in case of error
    }
  };

  // Helper function to save data to local storage
  const saveToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('tasks', serializedState);
    } catch (err) {
      console.error('Could not save state', err);
    }
  };
    
  const initialState = loadFromLocalStorage();
  
  const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
      initializeLists: (state) => {
        // Initialize lists with default values if empty
        state.lists = [
          { id: 1, title: 'To Do', tasks: [] },
          { id: 2, title: 'In Progress', tasks: [] },
          { id: 3, title: 'Done', tasks: [] }
        ];
      },
      addTask: (state, action) => {
        const { listId, task } = action.payload;
        const list = state.lists.find(list => list.id === listId);
        if (list) {
          list.tasks.push({ ...task, id: Date.now() }); // Add a unique ID to each task
          saveToLocalStorage(state); // Save the updated state to local storage
        }
      },
      updateTask: (state, action) => {
        
        const { listId, task } = action.payload;
        
        const list = state.lists.find(list => list.id === listId);
        if (list) {
          const taskIndex = list.tasks.findIndex(t => t.id === task.id);
          if (taskIndex > -1) {
            list.tasks[taskIndex] = task;
            saveToLocalStorage(state);
          }
        }
      },
      removeTask: (state, action) => {
        const { listId, taskId } = action.payload;
        const list = state.lists.find(list => list.id === listId);
        if (list) {
          list.tasks = list.tasks.filter(task => task.id !== taskId);
          saveToLocalStorage(state); 
        }
      },
      addList: (state, action) => {
        state.lists.push(action.payload);
      },
      reorderTasks: (state, action) => {
        const { sourceListId, destinationListId, sourceIndex, destinationIndex } = action.payload;
      
        // Get source and destination lists
        const sourceList = state.lists.find(list => list.id === parseInt(sourceListId));
        const destinationList = state.lists.find(list => list.id === parseInt(destinationListId));
      
        if (sourceList && destinationList) {
          // Remove the task from the source list
          const [movedTask] = sourceList.tasks.splice(sourceIndex, 1);
      
          // If moving within the same list, reorder tasks
          if (sourceListId === destinationListId) {
            sourceList.tasks.splice(destinationIndex, 0, movedTask);
          } else {
            // Otherwise, add it to the destination list at the end if no destinationIndex is provided
            if (destinationIndex !== null && destinationIndex !== undefined) {
              destinationList.tasks.splice(destinationIndex, 0, movedTask);
            } else {
              destinationList.tasks.push(movedTask); // Append to the end of the list
            }
          }
      
          // Save the updated state to localStorage
          saveToLocalStorage(state);
        }
      }
      

    },
  });

  export const { addTask, removeTask, updateTask,addList,initializeLists ,reorderTasks} = listSlice.actions;
  export default listSlice.reducer;
