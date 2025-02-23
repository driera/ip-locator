import { FunctionComponent } from "react";

import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

import styles from "./App.module.css";
import { IpData } from "./components/IpData/IpData";

const App: FunctionComponent = () => {
  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <h1>Welcome to IP Locator</h1>
        <IpData />
      </div>
    </ErrorBoundary>
  );
};

export default App;
