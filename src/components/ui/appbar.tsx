import { Bars3Icon } from "@heroicons/react/24/outline";
import SoundWave from "@/assets/soundwave.png";

export default function AppBar() {
  return (
    <div className="w-auto">
      <div className="flex justify-between p-4">
        {" "}
        <img src={SoundWave} className="size-10" />
        <h2 className="text-2xl font-bold font-stretch-50%">Diapason</h2>
        <Bars3Icon className="size-7" />
      </div>
    </div>
  );
}
