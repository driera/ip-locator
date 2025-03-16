import { APIError, FetchUserIPOptions, IPResponse } from "./types";

const IPIFY_API_URL = `https://geo.ipify.org/api/v2/country,city?`;
const IPIFY_API_KEY = import.meta.env.VITE_IPIFY_KEY;

/**
 * Fetches IP address data from the IPify API
 * @param {Object} options - Optional parameters
 * @param {string} options.search - IP address to search for
 * @returns {Promise<IPResponse>} - IP address data
 */
export const fetchUserIP = async ({
  search
}: FetchUserIPOptions = {}): Promise<IPResponse> => {
  try {
    let fetchUrl = IPIFY_API_URL;
    if (search) fetchUrl += `ipAddress=${search}`;

    const response = await fetch(`${fetchUrl}&apiKey=${IPIFY_API_KEY}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new APIError(
        search
          ? `Failed to fetch IP address: ${search}`
          : "Failed to fetch your IP address",
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
