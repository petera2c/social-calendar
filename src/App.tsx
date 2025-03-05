import React from "react";
import Calendar from "./components/Calendar";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen w-screen bg-gray-100 flex items-start justify-center p-4">
        <div className="w-full max-w-[1200px]">
          <Calendar />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
