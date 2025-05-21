"use client";

import { useEffect, useState } from "react";
import axios from "axios";

function extractFromPathVideoId() {
  return "aac32dfa-d5f5-4e32-8683-01a8659e4f63";
}

function fetchVideo(video_id) {
  return axios
    .get(`http://127.0.0.1:8000/videos/${video_id}/download`, {responseType: 'blob'})
    .then((res) => 
      URL.createObjectURL(res.data)
);
}

export function VideoPlayer(props) {
    const onTimeUpdate = props.onVideoTimeUpdate

  const [videoSrc, setVideoSrc] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadVideo = async () => {
    setIsLoading(true);
    setError(null);

    try {
      setVideoSrc(await fetchVideo(extractFromPathVideoId()));
    } catch (err) {
      console.error("Video fetch error:", err);
      setVideoSrc(null);
      setError("Failed to load video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {loadVideo()}, []);

  if (isLoading) return <p>Loading video...</p>;
  if (error) return <p>{error}</p>;

  return <video controls width="600" src={videoSrc} onTimeUpdate={(e) => {onTimeUpdate(e.target.currentTime); console.log(e.target.currentTime);}}></video>;
}
