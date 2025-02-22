import { createRoot } from "react-dom/client";
import App from "./App";

import "./theme/default.css";
import "./theme/reset.css";
import "./theme/variables.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
