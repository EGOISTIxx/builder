import { Canvas } from "./widgets/canvas/Canvas";
import { Toolbar } from "./widgets/sidebar/Sidebar";

function App() {
  return (
    <div className="h-screen flex flex-col">
      {/* Topbar */}
      <div className="h-12 border-b flex items-center px-4 bg-white">
        <span className="font-semibold">Builder</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r bg-gray-50 p-2">
          <Toolbar />
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-100">
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default App;
