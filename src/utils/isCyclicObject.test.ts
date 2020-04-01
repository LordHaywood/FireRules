import isCyclicObject from "./isCyclicObject";

describe("ExtractObjectLevels", () => {
  test("false", () => {
    expect(isCyclicObject({})).toBe(false);
  });

  test("true", () => {
    let a: any = {b: [1, 2, 3]}
    a.b.push(a);
  
    expect(isCyclicObject(a)).toBe(true);
  });
});