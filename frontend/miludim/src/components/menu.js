"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { videoId } = useParams();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getSummary = () => {
    axios
      .get(`http://127.0.0.1:8000/videos/${videoId}/summary`)
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error:", error));
  };

  const getSlides = () => {
    axios
      .get(`http://127.0.0.1:8000/videos/${videoId}/slides`)
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error:", error));
  };

  const getDownload = () => {
    axios
      .get(`http://127.0.0.1:8000/videos/${videoId}/download`)
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error:", error));
  };

  const getQuestions = () => {
    axios
      .get(`http://127.0.0.1:8000/videos/${videoId}/questions`)
      .then((response) => console.log(response.data))
      .then(console.log(videoId))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <Button
        id="main-button"
        aria-controls={open ? "menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        אפשרויות
      </Button>
      <Menu
        id="menu"
        aria-labelledby="main-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={getSummary}>הורדת סיכום</MenuItem>
        <MenuItem onClick={getSlides}>הורדת מצגת</MenuItem>
        <MenuItem onClick={getDownload}>הורדת הסרטון</MenuItem>
        <MenuItem onClick={getQuestions}>מעבר לשאלות על השיעור</MenuItem>
      </Menu>
    </div>
  );
}
