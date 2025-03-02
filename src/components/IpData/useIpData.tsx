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
    time?: {
      timezone: string;
      localTime: string;
    };
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
            },
            time: response.location?.timezone
              ? {
                  timezone: formatTimezone(response.location.timezone),
                  localTime: calculateLocalTime(response.location.timezone)
                }
              : undefined
          },
          loading: false
        });
      }
    };

    getIpData();
  }, []);

  return data;
};

const formatTimezone = (timezone: string): string => {
  const hours = parseInt(timezone.split(":")[0]);
  return `UTC${hours >= 0 ? "+" : ""}${hours}`;
};

const calculateLocalTime = (timezone: string): string => {
  const now = new Date();

  const timezoneHours = parseInt(timezone.split(":")[0]);
  const utcHours = now.getUTCHours();
  const minutes = now.getUTCMinutes();

  const localHours = (utcHours + timezoneHours + 24) % 24;

  const formattedHours = localHours % 12 || 12;
  const paddedHours = formattedHours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const amPm = localHours < 12 ? "AM" : "PM";

  return `${paddedHours}:${paddedMinutes} ${amPm}`;
};
