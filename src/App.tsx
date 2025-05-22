import AppBar from "./components/ui/appbar";
import AudioVisualizer from "./components/AudioVisualizer";
import NoteVisualizer from "./components/NoteVisualizer";

function App() {
  return (
    <div className="flex flex-col">
      <AppBar />
      <NoteVisualizer />
      <AudioVisualizer />
    </div>
  );
}

export default App;
