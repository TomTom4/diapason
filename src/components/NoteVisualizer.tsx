import { useContext } from "react";
import { Button } from "./ui/button";
import SoundWave from "./soundwave";
import { frequencyContext } from "./Frequency";

export default function NoteVisualizer() {
  const frequency = useContext(frequencyContext);
  return (
    <div className="flex flex-col w-auto">
      <p className="text-xl font-semibold m-auto p-6"> Start playing ! </p>
      <div className="flex p-2 justify-between items-center w-80 m-auto">
        <Button variant="outline" className="rounded-3xl">
          -
        </Button>
        <h2 className="text-5xl font-extrabold">{Math.round(frequency)} Hz</h2>
        <Button variant="outline" className="rounded-3xl">
          +
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
