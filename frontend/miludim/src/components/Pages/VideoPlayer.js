import React, { useState, useEffect } from 'react';
import { BrowserRouter, useNavigate, useParams} from 'react-router-dom';
import {
  Typography,
  Box,
  Button
} from '@mui/material';
import axios from 'axios';
import { VideoComponent } from '../Video';
import PositionedMenu from "../menu.js";
import Transcript from "../transcript.js";


export default function VideoPlayer() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [currentVideoTime, setCurrentVideoTime] = useState(-1);
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
      <VideoComponent onVideoTimeUpdate={setCurrentVideoTime}/>
      <PositionedMenu />
      <Transcript videoTime={currentVideoTime}/>
    </Box>
  );
}
