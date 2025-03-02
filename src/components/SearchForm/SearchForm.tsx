import styles from "./SearchForm.module.css";

export const SearchForm = ({
  onSearch
}: {
  onSearch: (ipAddress: string) => void;
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const ipAddress = formData.get("ip-address") as string;
    if (ipAddress) onSearch(ipAddress);
  };

  return (
    <div className={styles.searchFormContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <label htmlFor="ip-address">Search for any IP address</label>
        <div className={styles.searchFormInput}>
          <input type="text" id="ip-address" name="ip-address" />
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};
