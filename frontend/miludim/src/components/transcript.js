"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Transcript() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const [transcript, setTranscript] = React.useState("");

  const getTranscript = () => {
    axios
      .get(
        "http://127.0.0.1:8000/videos/024a4eb9-94f5-47da-b699-da4d2b830292/transcript"
      )
      .then((response) => setTranscript(response.data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <Button onClick={getTranscript}>הפעלת תמלול</Button>
      {transcript && <p>{transcript}</p>}
    </div>
  );
}
