import AppBar from "./components/ui/appbar";
import AudioVisualizer from "./components/AudioVisualizer";
import NoteVisualizer from "./components/NoteVisualizer";
import Frequency from "./components/Frequency";

function App() {
  return (
    <div className="flex flex-col">
      <AppBar />
      <NoteVisualizer />
      <Frequency />
    </div>
  );
}

export default App;
