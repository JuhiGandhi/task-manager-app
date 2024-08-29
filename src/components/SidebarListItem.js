import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Divider, List, ListItem, ListItemText, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

const SidebarListItem = () => {
  const [openBoards, setOpenBoards] = useState(false);
  const [projects, setProjects] = useState([
    { name: 'Project 1', open: false, subprojects: ['Big Things to Do'] },
    { name: 'Project 2', open: false, subprojects: ['Big Things to Do'] }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const handleBoardsClick = () => {
    setOpenBoards(!openBoards);
  };

  const handleProjectClick = (index) => {
    const newProjects = [...projects];
    newProjects[index].open = !newProjects[index].open;
    setProjects(newProjects);
  };

  const handleAddProject = () => {
    if (newProjectName) {
      setProjects([
        ...projects,
        { name: newProjectName, open: false, subprojects: ['Big Things to Do'] }
      ]);
      setNewProjectName('');
      setOpenDialog(false);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ p: 2, color: '#172b4d', fontWeight: 600 }}>
        Menu
      </Typography>
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={handleBoardsClick}>
          <ListItemText primary="Boards" />
          {openBoards ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBoards} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {projects.map((project, index) => (
              <div key={index}>
                <ListItem button onClick={() => handleProjectClick(index)}>
                  <ListItemText primary={project.name} sx={{ pl: 4 }} />
                  {project.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={project.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {project.subprojects.map((subproject, subIndex) => (
                      <ListItem button key={subIndex} sx={{ pl: 8 }} component={Link} to="/board">  
                        <ListItemText primary={subproject} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
        </Collapse>
      </List>
      <Divider />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ m: 2 }}
        onClick={() => setOpenDialog(true)}
      >
        Add New Project
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="project-name"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddProject}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SidebarListItem;
