import './style.css'
import { getVideo, drawVideo } from './src/camera.js'

const video = await getVideo();
const canvas = document.querySelector("canvas")
const button = document.querySelector("#take-selfie");

button.addEventListener("click", () => {
  drawVideo(video, canvas);
});
