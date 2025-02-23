import { renderHook, waitFor } from "@testing-library/react";
import { useIpData } from "./useIpData";
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

  it("should return loading state initially", () => {
    const { result } = renderHook(() => useIpData());

    expect(result.current.loading).toEqual(true);
  });

  it("should return IP data when API call succeeds", async () => {
    mockedFetchUserIP.mockResolvedValueOnce({
      ...ipDataSample,
      ip: "192.168.1.1"
    });

    const { result } = renderHook(() => useIpData());

    await waitFor(() => {
      expect(result.current.data.ip).toEqual("192.168.1.1");
    });
  });

  it("should return IP location when API call succeeds", async () => {
    mockedFetchUserIP.mockResolvedValueOnce({
      ...ipDataSample,
      location: {
        city: "New York",
        region: "NY",
        country: "US"
      },
      ip: "192.168.1.1"
    });

    const { result } = renderHook(() => useIpData());

    await waitFor(() => {
      expect(result.current).toEqual({
        data: {
          ip: "192.168.1.1",
          location: {
            city: "New York",
            region: "NY",
            country: "US"
          }
        },
        loading: false
      });
    });
  });
});
