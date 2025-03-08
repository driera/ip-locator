import { useState, FunctionComponent } from "react";
import { IpDetails } from "./components/IpDetails/IpDetails";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { useGetIpData } from "./components/useGetIpData/useGetIpData";
import styles from "./App.module.css";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

const App: FunctionComponent = () => {
  const [searchIpAddress, setSearchIpAddress] = useState<string>();
  const { data, loading } = useGetIpData(searchIpAddress);

  const handleSearch = (ipAddress: string) => {
    setSearchIpAddress(ipAddress);
  };

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <h1>Welcome to IP Locator</h1>
        <SearchForm onSearch={handleSearch} />
        <IpDetails data={data} loading={loading} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
