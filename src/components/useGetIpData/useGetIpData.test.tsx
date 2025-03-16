import { renderHook, waitFor } from "@testing-library/react";
import { useGetIpData } from "./useGetIpData";
import { fetchUserIP } from "../../services/fetch-user-ip";
import { ipDataSample } from "../../services/data-samples";
import { APIError } from "../../services/types";

jest.mock("../../services/fetch-user-ip");
const mockedFetchUserIP = fetchUserIP as jest.MockedFunction<
  typeof fetchUserIP
>;

describe("useGetIpData", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  it("should return loading state initially", async () => {
    const { result } = renderHook(() => useGetIpData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it("should return IP data when API call succeeds", async () => {
    mockedFetchUserIP.mockResolvedValueOnce({
      ...ipDataSample,
      ip: "192.168.1.1"
    });

    const { result } = renderHook(() => useGetIpData());

    await waitFor(() => {
      expect(result.current.data.ip).toEqual("192.168.1.1");
      expect(result.current.error).toBeUndefined();
    });
  });

  it("should return IP location when API call succeeds", async () => {
    mockedFetchUserIP.mockResolvedValueOnce({
      ...ipDataSample,
      location: {
        ...ipDataSample.location,
        lat: 32.69922,
        lng: -117.11281,
        city: "New York",
        region: "NY",
        country: "US"
      }
    });

    const { result } = renderHook(() => useGetIpData());

    await waitFor(() => {
      expect(result.current.data.location).toEqual({
        city: "New York",
        region: "NY",
        country: "US",
        coordinates: "32.69922, -117.11281"
      });
    });
  });

  it("should return IP timezone and local time when API call succeeds", async () => {
    mockedFetchUserIP.mockResolvedValueOnce({
      ...ipDataSample,
      location: {
        ...ipDataSample.location,
        timezone: "-03:00"
      }
    });
    jest.setSystemTime(new Date("2025-03-02T18:12:00.000+01:00"));

    const { result } = renderHook(() => useGetIpData());

    await waitFor(() => {
      expect(result.current.data.time).toEqual({
        timezone: "UTC-3",
        localTime: "02:12 PM"
      });
    });
  });

  it("should return IP Internet Service Provider", async () => {
    mockedFetchUserIP.mockResolvedValueOnce({
      ...ipDataSample,
      isp: "Google LLC"
    });

    const { result } = renderHook(() => useGetIpData());

    await waitFor(() => expect(result.current.data.isp).toEqual("Google LLC"));
  });

  it("should set error state when API call fails", async () => {
    const apiError = new APIError(
      "Failed to fetch IP address",
      404,
      "NOT_FOUND"
    );
    mockedFetchUserIP.mockRejectedValueOnce(apiError);

    const { result } = renderHook(() => useGetIpData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toBe("Failed to fetch IP address");
      expect(result.current.error?.status).toBe(404);
      expect(result.current.error?.code).toBe("NOT_FOUND");
    });
  });

  it("should reset error state on new request", async () => {
    const apiError = new APIError(
      "Failed to fetch IP address",
      404,
      "NOT_FOUND"
    );
    mockedFetchUserIP.mockRejectedValueOnce(apiError);

    const { result, rerender } = renderHook(
      (props) => useGetIpData(props.ipAddress),
      { initialProps: { ipAddress: "invalid-ip" } }
    );

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });

    mockedFetchUserIP.mockResolvedValueOnce({
      ...ipDataSample,
      ip: "192.168.1.1"
    });

    rerender({ ipAddress: "192.168.1.1" });

    await waitFor(() => {
      expect(result.current.error).toBeUndefined();
      expect(result.current.data.ip).toBe("192.168.1.1");
    });
  });
});
