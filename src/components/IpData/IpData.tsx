import { FunctionComponent } from "react";
import { useIpData } from "./useIpData";
import styles from "./IpData.module.css";

export const IpData: FunctionComponent = () => {
  const {
    data: { ip, location },
    loading
  } = useIpData();
  return (
    <>
      {loading && (
        <div role="alert" aria-busy="true">
          Loading your IP address...
        </div>
      )}

      <div className={styles.dataBoxes}>
        {ip && (
          <div className={styles.box}>
            <h2 className={styles.boxTitle}>Your IP Address</h2>
            <p className={styles.boxText}>{ip}</p>
          </div>
        )}
        {location && (
          <div className={styles.box}>
            <h2 className={styles.boxTitle}>Location</h2>
            <p className={styles.boxText}>
              {location.city}, {location.region}, {location.country}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
