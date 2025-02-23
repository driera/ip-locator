import React, { FunctionComponent } from "react";

import { ErrorBoundary } from "./components/ErrorBoundary";

import styles from "./App.module.css";
import { useGetIPData } from "./hooks/useGetIpData";

const App: FunctionComponent = () => {
  const ipData = useGetIPData();

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <h1>Welcome to IP Locator</h1>
        {ipData.loading && (
          <div role="alert" aria-busy="true">
            Loading your IP address...
          </div>
        )}
        {ipData.ip && (
          <div>
            <h2>Your IP Address</h2>
            <p>{ipData.ip}</p>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
