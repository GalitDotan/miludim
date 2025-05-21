import { VideoInfo } from "./VideoInfo";
import { VideoPlayer } from "./VideoPlayer";

export default function VideoComponent() {
  return (
    <>
      <h1>Video Title</h1>
      <VideoPlayer/>
      <hr class="solid" />
      <VideoInfo/>
    </>
  );
}
