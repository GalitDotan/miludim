"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    //setAnchorEl(null);
    axios
      .get(
        "http://127.0.0.1:8000/videos/024a4eb9-94f5-47da-b699-da4d2b830292/summary"
      )
      .then((response) => console.log(response.data))
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
        <MenuItem onClick={handleClose}>הורדת סיכום</MenuItem>
        <MenuItem onClick={handleClose}>הורדת מצגת</MenuItem>
        <MenuItem onClick={handleClose}>הורדת הסרטון</MenuItem>
        <MenuItem onClick={handleClose}>מעבר לשאלות על השיעור</MenuItem>
      </Menu>
    </div>
  );
}
