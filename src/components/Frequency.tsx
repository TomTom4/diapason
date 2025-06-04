import { useState, useEffect, PropsWithChildren, createContext } from "react";
import { getMicStream } from "./AudioStream";

const context = new AudioContext();
const analyser = context.createAnalyser();
const stream = await getMicStream();

const source = context.createMediaStreamSource(stream);
source.connect(analyser);
analyser.fftSize = 32768;

export const frequencyContext = createContext(0);

const extractFundamental = (buffer: Uint8Array) => {
  const fundamentalPike = Math.max(...buffer);
  const index = buffer.indexOf(fundamentalPike);
  return (index * 12000) / analyser.frequencyBinCount;
};

export default function Frequency(props: PropsWithChildren) {
  const [frequency, setFrequency] = useState<number | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const bufferLength = analyser.frequencyBinCount;
      const data = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(data);
      const fundamental = extractFundamental(data);
      setFrequency(fundamental);
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (context.state === "suspended") {
      context.resume();
    }
  }, [context.state]);

  return (
    <frequencyContext.Provider value={frequency || 0}>
      {props.children}
    </frequencyContext.Provider>
  );
}
