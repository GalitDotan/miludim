"use client";

import { VideoInfo } from "./VideoInfo";
import { VideoPlayer } from "./VideoPlayer";


export default function VideoComponent(props) {
  return (
    <>
      <VideoPlayer {...props}/>
      <hr />
      <VideoInfo {...props}/>
    </>
  );
}
