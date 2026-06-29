import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider";
import "./index.css";
import App from "./App.jsx";
import { queryClient } from "./app/queryClient.js";
import { store } from "./app/store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
