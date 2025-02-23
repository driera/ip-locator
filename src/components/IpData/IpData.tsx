import { FunctionComponent } from "react";
import { useIpData } from "./useIpData";

export const IpData: FunctionComponent = () => {
  const ipData = useIpData();
  const { ip, location } = ipData.data;
  return (
    <>
      {ipData.loading && (
        <div role="alert" aria-busy="true">
          Loading your IP address...
        </div>
      )}

      {ip && (
        <div>
          <h2>Your IP Address</h2>
          <p>{ip}</p>
        </div>
      )}
      {location && (
        <div>
          <h2>Location</h2>
          <p>
            {location.city}, {location.region}, {location.country}
          </p>
        </div>
      )}
    </>
  );
};
