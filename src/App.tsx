import React from "react";
import Calendar from "./components/Calendar";

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-start justify-center p-4">
      <div className="w-full max-w-[1200px]">
        <Calendar />
      </div>
    </div>
  );
};

export default App;
