import { Bars3Icon } from "@heroicons/react/24/outline";
import SoundWave from "@/assets/soundwave.png";

export default function AppBar() {
  return (
    <div
      className="flex w-full h-16
      justify-between p-2"
    >
      <img src={SoundWave} className="size-10" />
      <h2 className="text-2xl font-bold font-stretch-50%">Diapason</h2>
      <Bars3Icon className="size-7" />
    </div>
  );
}
