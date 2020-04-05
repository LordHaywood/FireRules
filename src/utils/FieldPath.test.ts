import { ValidPathStr, ValidPathObj, ExtractPath, PathStringify } from "./FieldPath";

describe("ValidPathStr", () => {
  test("empty string", () => {
    expect(ValidPathStr("")).toBe(false);
  });

  test("single string path", () => {
    expect(ValidPathStr("abc")).toBe(true);
  });

  test("single number path", () => {
    expect(ValidPathStr("34")).toBe(true);
  });

  test("single array path", () => {
    expect(ValidPathStr("[34]")).toBe(false);
  });

  test("deep string path", () => {
    expect(ValidPathStr("user.name.jeff")).toBe(true);
  });

  test("deep array path", () => {
    expect(ValidPathStr("user[0]")).toBe(true);
    expect(ValidPathStr("user[1]")).toBe(true);
    expect(ValidPathStr("user[246]")).toBe(true);

    expect(ValidPathStr("user[1.2]")).toBe(false);
    expect(ValidPathStr("user[-1]")).toBe(false);
    expect(ValidPathStr("user[abc]")).toBe(false);
  });
});


describe("ValidPathObj", () => {
  test("empty string", () => {
    expect(ValidPathObj([])).toBe(false);
  });

  test("single string path", () => {
    expect(ValidPathObj(["abc"])).toBe(true);
  });

  test("single number path", () => {
    expect(ValidPathObj(["34"])).toBe(true);
  });

  test("single array path", () => {
    expect(ValidPathObj([34])).toBe(false);
  });

  test("deep string path", () => {
    expect(ValidPathObj(["user","name","jeff"])).toBe(true);
  });

  test("deep array path", () => {
    expect(ValidPathObj(["user", 0])).toBe(true);
    expect(ValidPathObj(["user", 1])).toBe(true);
    expect(ValidPathObj(["user", 246])).toBe(true);

    expect(ValidPathObj(["user", 1.2])).toBe(false);
    expect(ValidPathObj(["user", -1])).toBe(false);
  });
});

describe("ExtractPath", () => {
  test("single string path", () => {
    expect(ExtractPath("abc")).toEqual(["abc"]);
  });

  test("single number path", () => {
    expect(ExtractPath("34")).toEqual(["34"]);
  });

  test("deep string path", () => {
    expect(ExtractPath("user.name.jeff")).toEqual(["user", "name", "jeff"]);
  });
1
  test("deep array path", () => {
    expect(ExtractPath("user[0]")).toEqual(["user", 0]);
    expect(ExtractPath("user[1]")).toEqual(["user", 1]);
    expect(ExtractPath("user[246]")).toEqual(["user", 246]);
  });
});

describe("PathStringify", () => {
  test("single string path", () => {
    expect(PathStringify(["abc"])).toEqual("abc");
  });

  test("single number path", () => {
    expect(PathStringify(["34"])).toEqual("34");
  });

  test("deep string path", () => {
    expect(PathStringify(["user", "name", "jeff"])).toEqual("user.name.jeff");
  });

  test("deep array path", () => {
    expect(PathStringify(["user", 0])).toEqual("user[0]");
    expect(PathStringify(["user", 1])).toEqual("user[1]");
    expect(PathStringify(["user", 246])).toEqual("user[246]");
  });
});