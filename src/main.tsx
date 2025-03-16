import { createRoot } from "react-dom/client";
import App from "./App";

import "./theme/default.css";
import "./theme/reset.css";
import "./theme/variables.css";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
