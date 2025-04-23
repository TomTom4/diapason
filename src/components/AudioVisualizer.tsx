import { useState, useEffect } from "react";

export default function AudioVisualizer() {
  const [audioDataArray, setAudioDataArray] = useState(undefined);
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();

  useEffect(() => {
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    setAudioDataArray(dataArray);
  }, []);

  const tic = () => {
    const datayArray = new Uint8Array();
    analyser.getByteTimeDomainData(dataArray);
  };

  return (
    <div>
      <p>this is the audio visualizer</p>
    </div>
  );
}
