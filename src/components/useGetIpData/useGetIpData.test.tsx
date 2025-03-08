import { renderHook, waitFor } from "@testing-library/react";
import { useGetIpData } from "./useGetIpData";
import { fetchUserIP } from "../../services/fetch-user-ip";
import { ipDataSample } from "../../services/data-samples";

jest.mock("../../services/fetch-user-ip");
const mockedFetchUserIP = fetchUserIP as jest.MockedFunction<
  typeof fetchUserIP
>;

describe("useGetIpData", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return loading state initially", async () => {
    const { result } = renderHook(() => useGetIpData());

    await waitFor(() => {
      expect(result.current.loading).toEqual(true);
    });
  });

  it("should return IP data when API call succeeds", async () => {
    mockedFetchUserIP.mockResolvedValueOnce({
      ...ipDataSample,
      ip: "192.168.1.1"
    });

    const { result } = renderHook(() => useGetIpData());

    await waitFor(() => {
      expect(result.current.data.ip).toEqual("192.168.1.1");
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
      },
      ip: "192.168.1.1"
    });

    const { result } = renderHook(() => useGetIpData());

    await waitFor(() => {
      expect(result.current).toEqual({
        data: expect.objectContaining({
          ip: "192.168.1.1",
          location: {
            city: "New York",
            region: "NY",
            country: "US",
            coordinates: "32.69922, -117.11281"
          }
        }),
        loading: false
      });
    });
  });

  it("should return IP timezone and local time when API call succeeds", async () => {
    jest.useFakeTimers();
    mockedFetchUserIP.mockResolvedValueOnce({
      ...ipDataSample,
      location: {
        ...ipDataSample.location,
        timezone: "-03:00"
      },
      ip: "192.168.1.1"
    });
    jest.setSystemTime(new Date("2025-03-02T18:12:00.000+01:00"));

    const { result } = renderHook(() => useGetIpData());

    await waitFor(() => {
      expect(result.current).toEqual({
        data: expect.objectContaining({
          ip: "192.168.1.1",
          location: expect.any(Object),
          time: {
            timezone: "UTC-3",
            localTime: "02:12 PM"
          }
        }),
        loading: false
      });
    });
  });

  it("should return IP Internet Service Provider", async () => {
    mockedFetchUserIP.mockResolvedValueOnce({
      ...ipDataSample,
      ip: "192.168.1.1",
      isp: "Google LLC"
    });

    const { result } = renderHook(() => useGetIpData());

    await waitFor(() => {
      expect(result.current).toEqual({
        data: {
          ip: "192.168.1.1",
          location: expect.any(Object),
          time: expect.any(Object),
          isp: "Google LLC"
        },
        loading: false
      });
    });
  });
});
