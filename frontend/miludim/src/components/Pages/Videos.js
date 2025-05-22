import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  Box,
  Slide,
  Paper,
  Stack
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

export default function Videos() {
  const { lectureId } = useParams();
  const [videos, setVideos] = useState([]);
  const [watchedStatus, setWatchedStatus] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
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

  const handleDescriptionClick = (video) => {
    setSelectedVideo(video);
  };

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
              <Stack direction="row" spacing={1} alignItems="center">
                <Button onClick={(e) => { e.stopPropagation(); handleDescriptionClick(video); }}>
                  <InfoIcon />
                </Button>
                <Box sx={{ width: 24, display: 'flex', justifyContent: 'center' }}>
                  {watchedStatus[video.id] && (
                    <CheckCircleIcon color="success" />
                  )}
                </Box>
              </Stack>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Slide direction="up" in={!!selectedVideo} mountOnEnter unmountOnExit>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 2, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Description</Typography>
          <Typography variant="body1">{selectedVideo?.description}</Typography>
          <Button onClick={() => setSelectedVideo(null)} sx={{ mt: 1 }}>Close</Button>
        </Paper>
      </Slide>
    </Box>
  );
}
