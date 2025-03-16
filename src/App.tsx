import { useState, FunctionComponent } from "react";
import { IpDetails } from "./components/IpDetails/IpDetails";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { useGetIpData } from "./components/useGetIpData/useGetIpData";
import styles from "./App.module.css";
import { ErrorMessage } from "./components/ErrorMessage/ErrorMessage";

const App: FunctionComponent = () => {
  const [searchIpAddress, setSearchIpAddress] = useState<string>();
  const { data, loading, error } = useGetIpData(searchIpAddress);

  const handleSearch = (ipAddress: string) => {
    setSearchIpAddress(ipAddress);
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to IP Locator</h1>
      <SearchForm onSearch={handleSearch} loading={loading} />
      <ErrorMessage error={error} />
      <IpDetails data={data} loading={loading} />
    </div>
  );
};

export default App;
