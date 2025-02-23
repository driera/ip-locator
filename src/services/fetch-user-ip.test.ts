import {
  fetchMock,
  fetchMockWithNetworkError
} from "./__test_helpers__/fetch-mock";
import { fetchUserIP } from "./fetch-user-ip";

describe("fetchUserIP", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return IP address when API call is successful", async () => {
    const mockIP = { ip: "192.168.1.1" };
    fetchMock({
      ok: true,
      json: () => Promise.resolve(mockIP)
    });

    const result = await fetchUserIP();

    expect(result).toEqual(mockIP);
    const options = expect.anything();
    expect(fetch).toHaveBeenCalledWith(
      "https://api.ipify.org?format=json",
      options
    );
  });

  it("should throw APIError when API returns non-200 response", async () => {
    fetchMock({ ok: false, status: 404, statusText: "Not Found" });

    await expect(fetchUserIP()).rejects.toThrow("Failed to fetch IP address");
    await expect(fetchUserIP()).rejects.toHaveProperty("status", 404);
  });

  it("should throw APIError when response is not valid JSON", async () => {
    fetchMock({
      ok: true,
      json: () => Promise.reject(new Error("Invalid JSON"))
    });

    await expect(fetchUserIP()).rejects.toThrow("Invalid response format");
  });

  it("should throw IPAPIError when IP is missing from response", async () => {
    fetchMock({
      ok: true,
      json: () => Promise.resolve({})
    });

    await expect(fetchUserIP()).rejects.toThrow(
      "IP address not found in response"
    );
  });

  it("should throw IPAPIError on network error", async () => {
    fetchMockWithNetworkError(new TypeError("Network error"));

    await expect(fetchUserIP()).rejects.toThrow(
      "Network error - please check your connection"
    );
  });
});
