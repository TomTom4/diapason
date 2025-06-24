import { useContext } from "react";
import { Button } from "./ui/button";
import SoundWave from "./soundwave";
import Tuning from "./tuning";
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

    if (noteNames[index] && octave != Infinity)
      return `${noteNames[index]}${octave}`;
    return "_";
  };

  const noteCents = (frequency: number): number => {
    const midiCode = Math.round(69 + 12 * Math.log2(frequency / 440));
    const refFrequency = 440.0 * 2 ** ((midiCode - 69) / 12);
    return Math.round(1200 * Math.log2(frequency / refFrequency));
  };

  const messages = (cents: number) => {
    if (cents < -10) {
      return "too low";
    }
    if (cents > 10) {
      return "too high";
    }
    return "in tune!";
  };

  return (
    <div className="flex flex-col w-auto">
      <p className="text-xl font-semibold m-auto p-6">
        {frequencyToNote(frequency) == "_"
          ? "start playing! "
          : messages(noteCents(frequency))}
      </p>
      <div className="flex p-2 justify-between items-center w-80 m-auto">
        <Button
          variant="outline"
          className={
            noteCents(frequency) < -10
              ? "rounded-3xl bg-primary"
              : "rounded-3xl"
          }
        >
          {noteCents(frequency) < -10 ? noteCents(frequency) : "-"}
        </Button>
        <h2 className="text-5xl font-extrabold">
          {frequencyToNote(frequency)}
        </h2>
        <Button
          variant="outline"
          className={
            noteCents(frequency) > 10 ? "rounded-3xl bg-primary" : "rounded-3xl"
          }
        >
          {noteCents(frequency) > 10 ? "+" + noteCents(frequency) : "+"}
        </Button>
      </div>
      <div className="m-auto p-16">
        <SoundWave cents={noteCents(frequency)} />
      </div>
      <Tuning currentNote={frequencyToNote(frequency)} />
    </div>
  );
}
