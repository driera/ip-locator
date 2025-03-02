export interface IPResponse {
  ip: string;
  location: {
    city: string;
    region: string;
    country: string;
    timezone: string;
    lat: number;
    lng: number;
  };
  isp: string;
}

export interface IPError {
  message: string;
  code?: string;
  status?: number;
}

export class APIError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.code = code;
  }
}
