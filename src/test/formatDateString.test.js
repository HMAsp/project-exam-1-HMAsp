import { formatDateString } from "../../js/global/functions";

describe("formatDateString", () => {
  test("It returns a formatted date string", () => {
    const apiDate = "2023-10-17T08:30:00Z";
    const result = formatDateString(apiDate);
    expect(result).toEqual("October 17, 2023");
  });
});
