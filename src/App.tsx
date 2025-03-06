import React from "react";
import Calendar from "./components/Calendar";
import { SocialPostsProvider } from "./contexts/SocialPostsContext";

const App: React.FC = () => {
  return (
    <SocialPostsProvider>
      <div className="min-h-screen w-screen bg-gray-100 flex items-start justify-center p-4">
        <div className="w-full max-w-[1200px]">
          <Calendar />
        </div>
      </div>
    </SocialPostsProvider>
  );
};

export default App;
