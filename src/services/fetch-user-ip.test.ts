import {
  fetchMock,
  fetchMockWithNetworkError
} from "./__test_helpers__/fetch-mock";
import { ipDataSample } from "./data-samples";
import { fetchUserIP } from "./fetch-user-ip";

describe("fetchUserIP", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("default fetch", () => {
    it("should return IP data when API call is successful", async () => {
      const mockIPData = {
        ip: "192.168.1.1",
        location: "ES",
        region: "Valencia",
        city: "Valencia"
      };
      fetchMock({
        ok: true,
        json: () => Promise.resolve(mockIPData)
      });

      const result = await fetchUserIP();

      expect(result).toEqual(mockIPData);
      const options = expect.anything();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("https://geo.ipify.org/api/v2/country,city"),
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

    it("should throw APIError when IP is missing from response", async () => {
      fetchMock({
        ok: true,
        json: () => Promise.resolve({})
      });

      await expect(fetchUserIP()).rejects.toThrow(
        "IP address not found in response"
      );
    });

    it("should throw APIError on network error", async () => {
      fetchMockWithNetworkError(new TypeError("Network error"));

      await expect(fetchUserIP()).rejects.toThrow(
        "Network error - please check your connection"
      );
    });

    it("should return data when IP is provided", async () => {
      const mockIPData = {
        ...ipDataSample,
        ip: "192.168.1.1",
        location: "ES",
        region: "Valencia",
        city: "Valencia"
      };
      fetchMock({
        ok: true,
        json: () => Promise.resolve(mockIPData)
      });

      const result = await fetchUserIP({ search: "192.168.1.1" });

      expect(result).toEqual(mockIPData);
      const options = expect.anything();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "https://geo.ipify.org/api/v2/country,city?ipAddress=192.168.1.1"
        ),
        options
      );
    });
  });
});
