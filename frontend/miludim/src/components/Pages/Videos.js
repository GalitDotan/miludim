import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Button,
  Box
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

export default function Videos() {
  const { lectureId } = useParams();
  const [videos, setVideos] = useState([]);
  const [watchedStatus, setWatchedStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/videos/?q=${lectureId}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setVideos(res.data);
        } else {
          console.error('Expected video array but got:', res.data);
          setVideos([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch videos:', err);
        setVideos([]);
      });

    axios.get('http://localhost:8000/users/4c65cb3c-dc52-4aee-8847-fbd231d6fe26')
      .then((res) => {
        if (res.data && Array.isArray(res.data.courses)) {
          const watchedMap = {};
          res.data.courses.forEach(course => {
            course.lectures_history.forEach(lecture => {
              if (lecture.lecture_id === lectureId) {
                lecture.videos.forEach(video => {
                  watchedMap[video.video_id] = video.watched;
                });
              }
            });
          });
          setWatchedStatus(watchedMap);
        } else {
          console.error('Unexpected user structure:', res.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch user data:', err);
      });
  }, [lectureId]);

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
              <ListItemText
                primary={video.name}
              />
              {watchedStatus[video.id] && (
                <ListItemIcon sx={{ minWidth: 'unset', marginLeft: 1 }}>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
