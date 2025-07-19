import { useState, useEffect, PropsWithChildren, createContext } from "react";

const getMicStream = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true,
  });
  return stream;
};

const context = new AudioContext();
const analyser = context.createAnalyser();
const stream = await getMicStream();

const source = context.createMediaStreamSource(stream);
source.connect(analyser);
analyser.fftSize = 32768;

export const frequencyContext = createContext(0);

const indexToFrequency = (
  index: number,
  sampleRate: number,
  fftSize: number,
): number => {
  return (index / (fftSize / 2)) * (sampleRate / 2);
};

const frequencyToIndex = (
  frequency: number,
  sampleRate: number,
  fftSize: number,
): number => {
  return Math.floor((frequency / (sampleRate / 2)) * (fftSize / 2));
};

const extractFundamental = (buffer: Uint8Array) => {
  const sampleRate = context.sampleRate;
  const fftSize = analyser.fftSize;

  const minFreq = 60;
  const maxFreq = 1200;

  const minIndex = frequencyToIndex(minFreq, sampleRate, fftSize);
  const maxIndex = frequencyToIndex(maxFreq, sampleRate, fftSize);

  const zoomedBuffer: Uint8Array = buffer.slice(minIndex, maxIndex);

  let pikeAmplitude = 0;
  let pikeIndex = 0;

  zoomedBuffer.forEach((element, index) => {
    if (element > pikeAmplitude && element > 50) {
      pikeAmplitude = element;
      pikeIndex = index;
    }
  });

  console.log(` current detected index: ${pikeIndex} `);
  const frequency = indexToFrequency(
    pikeIndex + minIndex,
    context.sampleRate,
    analyser.fftSize,
  );
  console.log(` current detected frequency:${frequency} `);
  return frequency;
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
