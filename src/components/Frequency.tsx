import { useState, useEffect } from "react";
import { getMicStream } from "./AudioStream";

const context = new AudioContext();
const analyser = context.createAnalyser();
const stream = await getMicStream();

const source = context.createMediaStreamSource(stream);
source.connect(analyser);
analyser.fftSize = 4096;

function autoCorrelate(buf: Float32Array, sampleRate: number) {
  const SIZE = buf.length;
  let rms = 0;

  for (let i = 0; i < SIZE; i++) {
    const val = buf[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1; // too quiet

  let bestOffset = -1;
  let bestCorrelation = 0;
  let correlations = new Array(SIZE).fill(0);

  for (let offset = 0; offset < SIZE / 2; offset++) {
    let correlation = 0;
    for (let i = 0; i < SIZE / 2; i++) {
      correlation += Math.abs(buf[i] - buf[i + offset]);
    }
    correlation = 1 - correlation / (SIZE / 2);
    correlations[offset] = correlation;

    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
  }

  if (bestCorrelation > 0.9) {
    return sampleRate / bestOffset;
  }

  return -1;
}

export default function Frequency() {
  const [frequency, setFrequency] = useState<number | null>(null);

  const toggleContext = () => {
    if (context.state === "suspended") {
      context.resume();
    } else {
      context.suspend();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const bufferLength = analyser.fftSize;
      const data = new Float32Array(bufferLength);
      analyser.getFloatTimeDomainData(data);
      const pitch = autoCorrelate(data, context.sampleRate);
      setFrequency(pitch);
    }, 100);
  }, []);

  return <p onClick={toggleContext}> freq:{frequency} Hz</p>;
}
