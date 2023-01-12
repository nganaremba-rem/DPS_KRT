import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./context/ContextProvider";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AuthProvider from "./context/AuthProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ContextProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </ContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
