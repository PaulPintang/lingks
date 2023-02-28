import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import App from "./App";
import "./index.css";

if (import.meta.env.VITE_NODE_ENV === "production") {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      fontFamily: "Lato, sans-serif",
    }}
  >
    <App />
  </MantineProvider>
  // </React.StrictMode>
);
