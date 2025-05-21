"use client";

import { VideoInfo } from "./VideoInfo";
import { VideoPlayer } from "./VideoPlayer";

export default function VideoComponent(props) {
  return (
    <>
      <h1>Video Title</h1>
      <VideoPlayer {...props}/>
      <hr />
      <VideoInfo/>
    </>
  );
}
