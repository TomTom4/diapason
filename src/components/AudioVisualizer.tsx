import { useRef, Ref } from "react";
import { AnalyzeSound } from "./AudioStream";

export default function AudioVisualizer() {
  const canvasRef: Ref<HTMLCanvasElement> = useRef(null);

  const start = async () => {
    if (canvasRef !== null) {
      if (canvasRef.current !== null) {
        await AnalyzeSound(canvasRef.current.getContext("2d"), 550, 200);
      }
    }
  };

  return (
    <div>
      <p>this is the audio visualizer</p>
      <canvas ref={canvasRef} width={550} height={200} />
      <button onClick={start} type="button">
        start
      </button>
    </div>
  );
}
