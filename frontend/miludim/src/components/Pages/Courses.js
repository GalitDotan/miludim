import React, { useState, useEffect } from 'react';
import { BrowserRouter, useNavigate} from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box
} from '@mui/material';
import axios from 'axios';

export default function Courses() {
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