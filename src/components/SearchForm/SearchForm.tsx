import { useState } from "react";
import { isValidIPAddress } from "./validation";
import styles from "./SearchForm.module.css";

export const SearchForm = ({
  onSearch,
  loading
}: {
  onSearch: (ipAddress: string) => void;
  loading?: boolean;
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const ipAddress = formData.get("ip-address") as string;

    if (!ipAddress) {
      setError("IP address is required");
      return;
    }

    if (!isValidIPAddress(ipAddress)) {
      setError("Please enter a valid IP address");
      return;
    }

    onSearch(ipAddress);
  };

  return (
    <div className={styles.searchFormContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <label htmlFor="ip-address">Search for any IP address</label>
        <div className={styles.searchFormInput}>
          <input
            type="text"
            id="ip-address"
            name="ip-address"
            placeholder="Enter IP address..."
            aria-invalid={!!error}
            aria-describedby={error ? "ip-error" : undefined}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && (
          <p id="ip-error" className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};
