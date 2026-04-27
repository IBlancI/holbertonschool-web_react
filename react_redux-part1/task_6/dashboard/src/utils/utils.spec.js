import { getCurrentYear, getFooterCopy, getLatestNotification } from "./utils";

describe("Utils functions", () => {
  it("getCurrentYear should return the current year", () => {
    const year = new Date().getFullYear();
    expect(getCurrentYear()).toBe(year);
  });

  it("getFooterCopy should return 'Holberton School' when isIndex is true", () => {
    expect(getFooterCopy(true)).toBe("Holberton School");
  });

  it("getFooterCopy should return 'Holberton School main dashboard' when isIndex is false", () => {
    expect(getFooterCopy(false)).toBe("Holberton School main dashboard");
  });

  it("getLatestNotification should return the correct notification string", () => {
    expect(getLatestNotification()).toBe(
      "<strong>Urgent requirement</strong> - complete by EOD"
    );
  });
});
