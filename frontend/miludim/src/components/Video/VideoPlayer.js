"use client";

import { useEffect, useState } from "react";
import axios from "axios";

function extractFromPathVideoId() {
    return "aac32dfa-d5f5-4e32-8683-01a8659e4f63";
}

function fetchVideo(video_id) {
  return axios
    .get(`http://127.0.0.1:8000/videos/${video_id}/download`)
    .then((response) => response.blob())
    .then((blob) => {
      return URL.createObjectURL(blob);
    })
    .catch((error) => console.error("Error:", error));
}

export function VideoPlayer() {
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    setVideoSrc(fetchVideo(extractFromPathVideoId()));
  }, []);

  if (!videoSrc) return <p>Loading video...</p>;

  return (
    <video controls width="600" src={videoSrc}>
    </video>
  );
}
