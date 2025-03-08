export interface IPData {
  data: {
    ip: string | null;
    location: {
      city: string;
      region: string;
      country: string;
      coordinates: string;
    } | null;
    time: {
      timezone: string;
      localTime: string;
    } | null;
    isp: string | null;
  };
  loading: boolean;
}
