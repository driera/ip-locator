import { FunctionComponent } from "react";
import { useIPData } from "./useIpData";

export const IpData: FunctionComponent = () => {
  const ipData = useIPData();
  return (
    <>
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
    </>
  );
};
