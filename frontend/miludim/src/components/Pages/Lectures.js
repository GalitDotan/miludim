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

export default function Lectures() {
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