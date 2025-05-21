"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Transcript() {
  const [transcript, setTranscript] = React.useState(null);
  const [toggle, setToggle] = React.useState(false);
  const { videoId } = useParams();

  const getTranscript = () => {
    if (!transcript) {
      axios
        .get(`http://127.0.0.1:8000/videos/${videoId}/transcript`)
        .then((response) => setTranscript(response.data))
        .catch((error) => console.error("Error:", error));
    }
    setToggle((prev) => !prev);
  };

  return (
    <div>
      <Button onClick={getTranscript}>הפעלת תמלול</Button>
      {toggle && <p>{transcript}</p>}
    </div>
  );
}
