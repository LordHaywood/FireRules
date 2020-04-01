import FlattenObject from "./FlattenObject";

describe("FlattenObject", () => {
  test("empty", () => {
    expect(FlattenObject({})).toEqual([]);
  });
});