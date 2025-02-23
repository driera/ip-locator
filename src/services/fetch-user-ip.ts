import { APIError, IPResponse } from "./types";

const API_URL = "https://api.ipify.org?format=json";

export const fetchUserIP = async (): Promise<IPResponse> => {
  try {
    const response = await fetch(API_URL, { method: "GET" });

    if (!response.ok) {
      throw new APIError(
        "Failed to fetch IP address",
        response.status,
        response.statusText
      );
    }

    let data: IPResponse;
    try {
      data = await response.json();
    } catch {
      throw new APIError("Invalid response format");
    }

    if (!data.ip) {
      throw new APIError("IP address not found in response");
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new APIError("Network error - please check your connection");
    }
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError("An unexpected error occurred");
  }
};
