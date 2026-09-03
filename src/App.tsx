import ContentPanel from "@components/ContentPanel/ContentPanel";
import Header from "@components/Layout/Header";
import MapboxMap from "@components/Map/MapboxMap";
import { useState } from "react";

function App() {
  const [selectedCounter, setSelectedCounter] = useState<number>();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col min-h-0 overflow-hidden">
        <div className="flex flex-1 min-h-0">
          <div className="w-1/2 flex flex-col h-full z-10 border-t border-l border-dvrpc-gray-5 min-h-0 ">
            <ContentPanel
              selectedCounter={selectedCounter}
              setSelectedCounter={setSelectedCounter}
            />
          </div>
          <div className="w-1/2 h-full min-h-0">
            <MapboxMap
              selectedCounter={selectedCounter}
              setSelectedCounter={setSelectedCounter}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
