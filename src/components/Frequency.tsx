import { useState, useEffect } from "react";
import { getMicStream } from "./AudioStream";

const context = new AudioContext();
const analyser = context.createAnalyser();
const stream = await getMicStream();

const source = context.createMediaStreamSource(stream);
source.connect(analyser);
analyser.fftSize = 4096 * 2;

const extractFundamental = (buffer: Uint8Array) => {
  console.log(analyser.frequencyBinCount);
  const fundamentalPike = Math.max(...buffer);
  const index = buffer.indexOf(fundamentalPike);
  return (index * 12000) / analyser.frequencyBinCount;
};

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
      const bufferLength = analyser.frequencyBinCount;
      const data = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(data);
      const fundamental = extractFundamental(data);
      setFrequency(fundamental);
    }, 100);
  }, []);

  return <p onClick={toggleContext}> freq:{frequency} Hz</p>;
}
