export const fetchMock = ({
  json = () => Promise.resolve({}),
  ok = true,
  status = 200,
  statusText = "OK"
}: {
  json?: object;
  ok?: boolean;
  status?: number;
  statusText?: string;
} = {}) =>
  (global.fetch = jest.fn(() =>
    Promise.resolve({
      json,
      ok,
      status,
      statusText
    } as Response)
  ));

export const fetchMockWithNetworkError = (error = new Error("Network error")) =>
  (global.fetch = jest.fn(() => Promise.reject(error)));
