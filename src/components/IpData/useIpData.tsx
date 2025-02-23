import { useEffect, useState } from "react";
import { fetchUserIP } from "../../services/fetch-user-ip";

interface IPData {
  data: {
    ip: string | null;
  };
  loading: boolean;
}

export const useIpData = (): IPData => {
  const [data, setData] = useState<IPData>({
    data: {
      ip: null
    },
    loading: true
  });

  useEffect(() => {
    const getIpData = async () => {
      const response = await fetchUserIP();
      if (response && response.ip) {
        setData({
          data: {
            ip: response.ip
          },
          loading: false
        });
      }
    };

    getIpData();
  }, []);

  return data;
};
