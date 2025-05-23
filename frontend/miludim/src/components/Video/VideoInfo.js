import { useState } from 'react';
import { Typography, Collapse, Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export function VideoInfo({ videoInfo }) {
  const [visible, setVisible] = useState(false);

  if (!videoInfo) return <Typography>Loading...</Typography>;

  return (
    <div style={{ marginTop: '1rem' }}>
      <Box
        display="flex"
        alignItems="center"
        onClick={() => setVisible((v) => !v)}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="h6" gutterBottom sx={{ mr: 1 }}>
          Description:
        </Typography>
        <IconButton size="small">
          {visible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={visible}>
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            p: 2,
            mt: 1,
          }}
        >
          <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
            {videoInfo}
          </Typography>
        </Box>
      </Collapse>
    </div>
  );
}