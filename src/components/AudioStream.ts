export const getMicStream = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true,
  });
  return stream;
};

export const setUpAnalyser = async (): Promise<AnalyserNode> => {
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  const stream = await getMicStream();

  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);
  analyser.fftSize = 256;

  return analyser;
};

export const AnalyzeSound = async (
  canvasCtx: CanvasRenderingContext2D | null,
  width: number,
  height: number,
) => {
  if (!canvasCtx) {
    console.error("No canvas context available.");
    return;
  }

  const analyser = await setUpAnalyser();
  const bufferLength = analyser.frequencyBinCount;
  const data = new Uint8Array(bufferLength);
  let drawVisual;

  canvasCtx.fillStyle = "rgb(200,200,200)";
  canvasCtx.clearRect(0, 0, width, height);

  const draw = () => {
    drawVisual = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(data);

    canvasCtx.fillStyle = "rgb(0,0,0)";
    canvasCtx.clearRect(0, 0, width, height);

    const barWidth = (width / bufferLength) * 2.5;

    console.log([...data.slice(0, 10)]);

    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = data[i];

      canvasCtx.fillStyle = "rgb(90,230,250)";
      canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  };
  draw();
};
