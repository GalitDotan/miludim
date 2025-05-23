'use client';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  CssBaseline,
  Box,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import {Home, About, Courses, Lectures, Videos, VideoPlayer} from '@/components/Pages'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Course App
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box width={250} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/about">
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/courses">
                <ListItemText primary="Courses" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<Lectures />} />
            <Route path="/lectures/:lectureId" element={<Videos />} />
            <Route path="/videos/:videoId" element={<VideoPlayer />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
}
