import React, { FunctionComponent } from "react";

import { ErrorBoundary } from "./components/ErrorBoundary";

import styles from "./App.module.css";

const App: FunctionComponent = () => {
  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <h1>Welcome to IP Locator</h1>
      </div>
    </ErrorBoundary>
  );
};

export default App;
