import { useEffect, useState } from "react";
import { fetchUserIP } from "../../services/fetch-user-ip";

interface IPData {
  data: {
    ip: string | null;
    location: {
      city: string;
      region: string;
      country: string;
    } | null;
  };
  loading: boolean;
}

export const useIpData = (): IPData => {
  const [data, setData] = useState<IPData>({
    data: {
      ip: null,
      location: null
    },
    loading: true
  });

  useEffect(() => {
    const getIpData = async () => {
      const response = await fetchUserIP();
      if (response) {
        setData({
          data: {
            ip: response.ip,
            location: {
              city: response.location?.city,
              region: response.location?.region,
              country: response.location?.country
            }
          },
          loading: false
        });
      }
    };

    getIpData();
  }, []);

  return data;
};
