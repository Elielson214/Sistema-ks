import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css"; // COMENTADO para parar de servir o CSS como HTML
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);