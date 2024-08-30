import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SidebarListItem = () => {
  const [openBoards, setOpenBoards] = useState(false);
  const [projects, setProjects] = useState([
    { name: 'Project', open: false, subprojects: ['Key Tasks'] },
  ]);

  const handleBoardsClick = () => {
    setOpenBoards(!openBoards);
  };

  const handleProjectClick = (index) => {
    const newProjects = [...projects];
    newProjects[index].open = !newProjects[index].open;
    setProjects(newProjects);
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
    </>
  );
};

export default SidebarListItem;
