import { useEffect, useState } from "react";
import { fetchUserIP } from "../services/fetch-user-ip";

interface IPData {
  ip: string | null;
  loading: boolean;
}

export const useIPData = (): IPData => {
  const [data, setData] = useState<IPData>({
    ip: null,
    loading: true
  });

  useEffect(() => {
    const getIP = async () => {
      const response = await fetchUserIP();
      if (response && response.ip) {
        setData({
          ip: response.ip,
          loading: false
        });
      }
    };

    getIP();
  }, []);

  return data;
};
