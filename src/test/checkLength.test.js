import { checkLength } from "../../js/global/functions.js";

describe("checkLength", () => {
  test("It returns true if the value length is greater than the len argument", () => {
    const value = "abc";
    const len = 2;
    const result = checkLength(value, len);
    expect(result).toEqual(true);
  });
  test("It returns false if the value length is less than the len argument", () => {
    const value = "abc";
    const len = 4;
    const result = checkLength(value, len);
    expect(result).toEqual(false);
  });
});
