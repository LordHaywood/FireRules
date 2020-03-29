import { HasPath, ExtractField } from "./ExtractField";

describe("HasPath", () => {
  test("empty object", () => {
    expect(HasPath({}, ["abc"])).toBe(false);
    expect(HasPath({}, ["abc", 0])).toBe(false);
    expect(HasPath({}, ["abc", "abc"])).toBe(false);
    expect(HasPath({}, ["abc", "abc", 7])).toBe(false);
    expect(HasPath({}, ["abc", 1, "abc"])).toBe(false);
  });

  test("object depth 1", () => {
    const obj = {
      abc: "value"
    };
    expect(HasPath(obj, ["abc"])).toBe(true);
    expect(HasPath(obj, ["abc", 0])).toBe(false);
    expect(HasPath(obj, ["abc", "jeff"])).toBe(false);
    expect(HasPath(obj, ["abc", "jeff", 7])).toBe(false);
    expect(HasPath(obj, ["abc", 1, "jeff"])).toBe(false);
  });

  test("object depth 2", () => {
    const obj = {
      abc: {
        jeff: "value"
      }
    };
    expect(HasPath(obj, ["abc"])).toBe(true);
    expect(HasPath(obj, ["abc", 0])).toBe(false);
    expect(HasPath(obj, ["abc", "jeff"])).toBe(true);
    expect(HasPath(obj, ["abc", "jeff", 7])).toBe(false);
    expect(HasPath(obj, ["abc", 1, "jeff"])).toBe(false);
  });

  test("object depth 1 with array", () => {
    const obj = {
      abc: [
        "1",
        "2",
        "3"
      ]
    };
    expect(HasPath(obj, ["abc"])).toBe(true);
    expect(HasPath(obj, ["abc", 0])).toBe(true);
    expect(HasPath(obj, ["abc", 2])).toBe(true);
    expect(HasPath(obj, ["abc", 3])).toBe(false);
    expect(HasPath(obj, ["abc", "jeff"])).toBe(false);
    expect(HasPath(obj, ["abc", "jeff", 7])).toBe(false);
    expect(HasPath(obj, ["abc", 1, "jeff"])).toBe(false);
  });
  
  test("object depth 2 with array", () => {
    const obj = {
      abc: {
        jeff: [
          "1",
          "2",
          "3"
        ]
      }
    };
    expect(HasPath(obj, ["abc"])).toBe(true);
    expect(HasPath(obj, ["abc", 0])).toBe(false);
    expect(HasPath(obj, ["abc", "jeff"])).toBe(true);
    expect(HasPath(obj, ["abc", "jeff", 0])).toBe(true);
    expect(HasPath(obj, ["abc", "jeff", 2])).toBe(true);
    expect(HasPath(obj, ["abc", "jeff", 3])).toBe(false);
    expect(HasPath(obj, ["abc", "jeff", 7])).toBe(false);
    expect(HasPath(obj, ["abc", 1, "jeff"])).toBe(false);
  });
  
  test("object depth 3 with middle array", () => {
    const obj = {
      abc: [
        {
          jeff: 2
        },
        {
          jeff: 4
        }
      ]
    };
    expect(HasPath(obj, ["abc"])).toBe(true);
    expect(HasPath(obj, ["abc", 0])).toBe(true);
    expect(HasPath(obj, ["abc", "jeff"])).toBe(false);
    expect(HasPath(obj, ["abc", "jeff", 0])).toBe(false);
    expect(HasPath(obj, ["abc", "jeff", 2])).toBe(false);
    expect(HasPath(obj, ["abc", "jeff", 3])).toBe(false);
    expect(HasPath(obj, ["abc", "jeff", 7])).toBe(false);
    expect(HasPath(obj, ["abc", 1, "jeff"])).toBe(true);
  });
});

describe("ExtractField", () => {
  test("object depth 1", () => {
    const obj = {
      abc: "value"
    };
    expect(ExtractField(obj, "abc")).toEqual("value");
  });

  test("object depth 2", () => {
    const obj = {
      abc: {
        jeff: "value"
      }
    };
    expect(ExtractField(obj, "abc")).toEqual({
      jeff: "value"
    });
    expect(ExtractField(obj, "abc.jeff")).toEqual("value");
  });

  test("object depth 1 with array", () => {
    const obj = {
      abc: [
        "1",
        "2",
        "3"
      ]
    };
    expect(ExtractField(obj, "abc")).toEqual([
      "1",
      "2",
      "3"
    ]);
    expect(ExtractField(obj, "abc[0]")).toEqual("1");
    expect(ExtractField(obj, "abc[1]")).toEqual("2");
    expect(ExtractField(obj, "abc[2]")).toEqual("3");
  });
  
  test("object depth 2 with array", () => {
    const obj = {
      abc: {
        jeff: [
          "1",
          "2",
          "3"
        ]
      }
    };
    expect(ExtractField(obj, "abc")).toEqual({
      jeff: [
        "1",
        "2",
        "3"
      ]
    });
    expect(ExtractField(obj, "abc.jeff")).toEqual([
      "1",
      "2",
      "3"
    ]);
    expect(ExtractField(obj, "abc.jeff[0]")).toEqual("1");
    expect(ExtractField(obj, "abc.jeff[2]")).toEqual("3");
  });
  
  test("object depth 3 with middle array", () => {
    const obj = {
      abc: [
        {
          jeff: 2
        },
        {
          jeff: 4
        }
      ]
    };
    expect(ExtractField(obj, "abc")).toEqual([
      {
        jeff: 2
      },
      {
        jeff: 4
      }
    ]);
    expect(ExtractField(obj, "abc[0]")).toEqual({
      jeff: 2
    });
    expect(ExtractField(obj, "abc[1].jeff")).toEqual(4);
  });
});