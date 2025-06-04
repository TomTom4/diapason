import AppBar from "./components/ui/appbar";
import NoteVisualizer from "./components/NoteVisualizer";
import Frequency from "./components/Frequency";

function App() {
  return (
    <div className="flex flex-col">
      <AppBar />
      <Frequency>
        <NoteVisualizer />
      </Frequency>
    </div>
  );
}

export default App;
