import { FunctionComponent } from "react";
import { useIpData } from "./useIpData";

export const IpData: FunctionComponent = () => {
  const ipData = useIpData();
  return (
    <>
      {ipData.loading && (
        <div role="alert" aria-busy="true">
          Loading your IP address...
        </div>
      )}
      {ipData.data.ip && (
        <div>
          <h2>Your IP Address</h2>
          <p>{ipData.data.ip}</p>
        </div>
      )}
    </>
  );
};
