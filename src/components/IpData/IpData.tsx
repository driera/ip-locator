import { FunctionComponent } from "react";
import { useIpData } from "./useIpData";
import styles from "./IpData.module.css";

export const IpData: FunctionComponent = () => {
  const {
    data: { ip, location, time, isp },
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
            <p className={styles.boxSubtitle}>ISP: {isp}</p>
          </div>
        )}
        {location && (
          <div className={styles.box}>
            <h2 className={styles.boxTitle}>Location</h2>
            <p className={styles.boxText}>
              {location.city}, {location.region}, {location.country}
            </p>
            <p className={styles.boxSubtitle}>{location.coordinates}</p>
          </div>
        )}
        {time && (
          <div className={styles.box}>
            <h2 className={styles.boxTitle}>Time</h2>
            <p className={styles.boxText}>{time.timezone}</p>
            <p className={styles.boxSubtitle}>{time.localTime}</p>
          </div>
        )}
        {isp && (
          <div className={styles.box}>
            <h2 className={styles.boxTitle}>ISP</h2>
            <p className={styles.boxText}>{isp}</p>
          </div>
        )}
      </div>
    </>
  );
};
