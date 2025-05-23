"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { BlockMath } from 'react-katex';

function prettifyText(text) {
  const superscriptMap = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', 'k': 'ᵏ'
  };

  const subscriptMap = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
    'n': 'ₙ', 'k': 'ₖ'
  };

  const toSuperscript = str => [...str].map(c => superscriptMap[c] || c).join('');
  const toSubscript = str => [...str].map(c => subscriptMap[c] || c).join('');

  return text
    .replace(/\bEpsilon\b/g, 'ε')
    .replace(/\bR_([0-9k]+)\b/gi, (_, n) => 'ℝ' + toSuperscript(n))
    .replace(/\bx_([0-9]+)_n\b/g, (_, i) => 'x' + toSubscript(i) + subscriptMap['n'])
    .replace(/\bx_n\b/g, 'xₙ')
    .replace(/\bl_k\b/g, '𝑙ₖ')
    .replace(/\bl_n\b/g, '𝑙ₙ')
    .replace(/\bL\b/g, '𝐿');
}

function parseSRT(data) {
  const lines = data.split('\n');
  const result = [];
  let i = 0;

  function timeToSeconds(timeStr) {
    const [hh, mm, ss] = timeStr.split(':');
    const [s, ms] = ss.split(',');
    return (
      parseInt(hh, 10) * 3600 +
      parseInt(mm, 10) * 60 +
      parseInt(s, 10) +
      parseInt(ms, 10) / 1000
    );
  }


  while (i < lines.length) {
    const indexLine = lines[i++].trim();
    if (!indexLine || isNaN(Number(indexLine))) continue;

    const timeLine = lines[i++].trim();
    const match = timeLine.match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
    if (!match) continue;

    const start = timeToSeconds(match[1]);
    const end = timeToSeconds(match[2]);

    let text = '';
    while (i < lines.length && lines[i].trim() !== '') {
      text += lines[i++].trim() + ' ';
    }
    i++; // skip empty line
    text = prettifyText(text.trim());

    result.push({ start, end, text: text.trim() });
  }
  console.log(result)

  return result;
}


export default function Transcript({ videoTime }) {
  const [entries, setEntries] = React.useState([]);
  const [toggle, setToggle] = React.useState(false);
  const { videoId } = useParams();
  const containerRef = React.useRef(null);

  const getTranscript = () => {
    if (entries.length === 0) {
      axios
        .get(`http://127.0.0.1:8000/videos/${videoId}/subtitles`)
        .then((response) => setEntries(parseSRT(response.data)))
        .catch((error) => console.error("Error:", error));
    }
    setToggle((prev) => !prev);
  };

  React.useEffect(() => {
    if (!toggle || !containerRef.current) return;
    const index = entries.findIndex(
      (entry) => videoTime >= entry.start && videoTime <= entry.end
    );
    if (index !== -1) {
      const el = document.getElementById(`line-${index}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [videoTime, toggle, entries]);

  return (
    <div>
      <Button onClick={getTranscript}>הפעלת תמלול</Button>
      {toggle && (
        <div style={transcript_container} ref={containerRef}>
          {entries.map((entry, idx) => (
            <p
              key={idx}
              id={`line-${idx}`}
              style={{
                backgroundColor:
                  videoTime >= entry.start && videoTime <= entry.end
                    ? "#d0f0fd"
                    : "transparent",
              }}
            >
              {entry.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

const transcript_container = {
  height: "200px",
  overflowY: "auto",
  border: "1px solid #ccc",
  padding: "1rem",
  fontSize: "20px",
  direction: "rtl", // Hebrew-friendly
  textAlign: "right", // Default RTL alignment
};
