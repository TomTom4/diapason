import { Button } from "./ui/button";

export default function Tuning({ currentNote }: { currentNote: string }) {
  return (
    <div className="m-auto flex gap-2">
      <Button
        variant="outline"
        className={
          currentNote == "E2"
            ? "bg-primary rounded-3xl"
            : "bg-gray-50 rounded-3xl"
        }
      >
        E
      </Button>
      <Button
        variant="outline"
        className={
          currentNote == "A2"
            ? "bg-primary rounded-3xl"
            : "bg-gray-50 rounded-3xl"
        }
      >
        A
      </Button>
      <Button
        variant="outline"
        className={
          currentNote == "D3"
            ? "bg-primary rounded-3xl"
            : "bg-gray-50 rounded-3xl"
        }
      >
        D
      </Button>
      <Button
        variant="outline"
        className={
          currentNote == "G3"
            ? "bg-primary rounded-3xl"
            : "bg-gray-50 rounded-3xl"
        }
      >
        G
      </Button>
      <Button
        variant="outline"
        className={
          currentNote == "B3"
            ? "bg-primary rounded-3xl"
            : "bg-gray-50 rounded-3xl"
        }
      >
        B
      </Button>
      <Button
        variant="outline"
        className={
          currentNote == "E4"
            ? "bg-primary rounded-3xl"
            : "bg-gray-50 rounded-3xl"
        }
      >
        E
      </Button>
    </div>
  );
}
