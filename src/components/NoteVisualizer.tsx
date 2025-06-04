import { useContext } from "react";
import { Button } from "./ui/button";
import SoundWave from "./soundwave";
import { frequencyContext } from "./Frequency";

export default function NoteVisualizer() {
  const frequency = useContext(frequencyContext);

  const frequencyToNote = (frequency: number): string => {
    const noteNames = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      " A",
      "A#",
      "B",
    ];
    const midiCode = Math.round(69 + 12 * Math.log2(frequency / 440));
    const index = midiCode % 12;
    const octave = Math.floor(midiCode / 12) - 1;
    return `${noteNames[index]}${octave}`;
  };

  const noteCents = (frequency: number): number => {
    const midiCode = Math.round(69 + 12 * Math.log2(frequency / 440));
    const refFrequency = 440.0 * 2 ** ((midiCode - 69) / 12);
    return Math.round(1200 * Math.log2(frequency / refFrequency));
  };

  return (
    <div className="flex flex-col w-auto">
      <p className="text-xl font-semibold m-auto p-6"> Start playing ! </p>
      <div className="flex p-2 justify-between items-center w-80 m-auto">
        <Button
          variant="outline"
          className={
            noteCents(frequency) < 0 ? "rounded-3xl bg-blue-200" : "rounded-3xl"
          }
        >
          {noteCents(frequency) < 0 ? noteCents(frequency) : "-"}
        </Button>
        <h2 className="text-5xl font-extrabold">
          {frequencyToNote(frequency)}
        </h2>
        <Button
          variant="outline"
          className={
            noteCents(frequency) > 0 ? "rounded-3xl bg-blue-200" : "rounded-3xl"
          }
        >
          {noteCents(frequency) > 0 ? noteCents(frequency) : "+"}
        </Button>
      </div>
      <div className="m-auto p-16">
        <SoundWave />
      </div>
      <div className="m-auto flex gap-2">
        <Button variant="outline" className="rounded-3xl">
          E
        </Button>
        <Button variant="outline" className="rounded-3xl">
          A
        </Button>
        <Button variant="outline" className="rounded-3xl">
          D
        </Button>
        <Button variant="outline" className="rounded-3xl">
          C
        </Button>
        <Button variant="outline" className="rounded-3xl">
          B
        </Button>
        <Button variant="outline" className="rounded-3xl">
          E
        </Button>
      </div>
    </div>
  );
}
