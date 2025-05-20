'use client';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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
  Container,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import PositionedMenu from "../components/menu.js";
import Transcript from "../components/transcript.js";


function Home() {
  return <Typography variant="h4">Home</Typography>;
}

function About() {
  return <Typography variant="h4">About</Typography>;
}

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/courses/all').then((res) => {
      if (Array.isArray(res.data)) {
        setCourses(res.data);
      } else {
        console.error('Expected array but got:', res.data);
        setCourses([]);
      }
    }).catch(err => {
      console.error('Failed to fetch courses:', err);
      setCourses([]);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Courses</Typography>
      <List>
        {courses.map((course) => (
          <ListItem key={course.id} disablePadding>
            <ListItemButton onClick={() => navigate(`/courses/${course.id}`)}>
              <ListItemText primary={course.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function Lectures() {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/lectures/?q=${courseId}`).then((res) => {
      if (Array.isArray(res.data)) {
        setLectures(res.data);
      } else {
        console.error('Expected array but got:', res.data);
        setLectures([]);
      }
    }).catch(err => {
      console.error('Failed to fetch lectures:', err);
      setLectures([]);
    });
  }, [courseId]);

  return (
    <Box>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>
      <Typography variant="h5" gutterBottom>Lectures</Typography>
      <List>
        {lectures.map((lecture) => (
          <ListItem key={lecture.id} disablePadding>
            <ListItemButton onClick={() => navigate(`/lectures/${lecture.id}`)}>
              <ListItemText primary={lecture.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function Videos() {
  const { courseId, lectureId } = useParams();
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/videos/?q=${lectureId}`).then((res) => {
      if (Array.isArray(res.data)) {
        setVideos(res.data);
      } else {
        console.error('Expected array but got:', res.data);
        setVideos([]);
      }
    }).catch(err => {
      console.error('Failed to fetch videos:', err);
      setVideos([]);
    });
  }, [courseId, lectureId]);

  return (
    <Box>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>
      <Typography variant="h5" gutterBottom>Videos</Typography>
      <List>
        {videos.map((video) => (
          <ListItem key={video.id} disablePadding>
            <ListItemButton onClick={() => navigate(`/videos/${video.id}`)}>
              <ListItemText primary={video.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function VideoPlayer() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/videos/${videoId}`).then((res) => {
      setVideo(res.data);
    }).catch(err => {
      console.error('Failed to fetch video:', err);
      setVideo(null);
    });
  }, [videoId]);

  if (!video) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>
      <Typography variant="h5">{video.name}</Typography>
      {/* <video controls width="100%"> */}
      {/* <source src={video.url} type="video/mp4" /> */}
      Your browser does not support the video tag.
      {/* </video> */}
      <PositionedMenu />
      <Transcript />
    </Box>
  );
}

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Router>
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
    </Router>
  );
}
