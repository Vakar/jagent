import { getUrlWithParams } from "./urlUtils";

const URL = "https://api.com";
const EXPECTED_URL = `${URL}?id=1&name=username`;
const searchParams = { id: "1", name: "username" };

describe("URL Utils", () => {
  it("should create url with proper url with params", () => {
    const urlWithParams = getUrlWithParams(URL, searchParams);
    expect(urlWithParams).toBe(EXPECTED_URL);
  });
});
