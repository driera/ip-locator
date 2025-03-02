import { FunctionComponent, useState } from "react";

import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

import styles from "./App.module.css";
import { IpData } from "./components/IpData/IpData";
import { SearchForm } from "./components/SearchForm/SearchForm";
const App: FunctionComponent = () => {
  const [ipAddress, setIpAddress] = useState<string>();

  const handleSearch = (ipAddress: string) => {
    setIpAddress(ipAddress);
  };

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <h1>Welcome to IP Locator</h1>
        <SearchForm onSearch={handleSearch} />
        <IpData ipAddress={ipAddress} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
