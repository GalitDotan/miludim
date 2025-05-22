import React, { useState, useEffect } from 'react';
import { BrowserRouter, useNavigate, useParams} from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  Box
} from '@mui/material';
import axios from 'axios';

export default function Videos() {
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