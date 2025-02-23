import { renderHook, waitFor } from "@testing-library/react";
import { useIPData } from "./useIpData";
import { fetchUserIP } from "../services/fetch-user-ip";

jest.mock("../services/fetch-user-ip");
const mockedFetchUserIP = fetchUserIP as jest.MockedFunction<
  typeof fetchUserIP
>;

describe("useGetIpData", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return loading state initially", () => {
    const { result } = renderHook(() => useIPData());

    expect(result.current.loading).toEqual(true);
  });

  it("should return IP data when API call succeeds", async () => {
    const mockIP = { ip: "192.168.1.1" };
    mockedFetchUserIP.mockResolvedValueOnce(mockIP);

    const { result } = renderHook(() => useIPData());

    await waitFor(() => {
      expect(result.current).toEqual({
        ip: "192.168.1.1",
        loading: false
      });
    });
  });
});
