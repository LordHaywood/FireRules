import ExtractObjectLevels from "./ExtractObjectLevels";
import { ExtractField } from "./ExtractField";

describe("ExtractObjectLevels", () => {
  test("empty", () => {
    expect(ExtractObjectLevels({
      type: "object",
      fields: {}
    })).toEqual([
      {
        path: [],
        structure: {
          type: "object",
          fields: {}
        }
      }
    ]);
  });

  test("throw cylic", () => {
    let a: any = {a: ""};
    a.a = a;
    expect(() => ExtractObjectLevels(a)).toThrowError("Object invalid: is cyclic");
  });

  test("has simple fields", () => {
    expect(ExtractObjectLevels({
      type: "object",
      fields: {
        a: {
          type: "number"
        }
      }
    })).toEqual([
      {
        path: [],
        structure: {
          type: "object",
          fields: {
            a: {
              type: "number"
            }
          }
        }
      }
    ]);
  });

  test("has embedded object", () => {
    expect(ExtractObjectLevels({
      type: "object",
      fields: {
        a: {
          type: "object",
          fields: {
            b: {
              type: "number"
            }
          }
        }
      }
    })).toEqual([
      {
        path: [],
        structure: {
          type: "object",
          fields: {
            a: {
              type: "object",
              fields: {
                b: {
                  type: "number"
                }
              }
            }
          }
        }
      },
      {
        path: ["a"],
        structure: {
          type: "object",
          fields: {
            b: {
              type: "number"
            }
          }
        }
      }
    ]);
  });

  test("stops at arrays", () => {
    expect(ExtractObjectLevels({
      type: "object",
      fields: {
        a: {
          type: "array",
          valueType: {
            type: "object",
            fields: {
              b: {
                type: "number"
              }
            }
          }
        }
      }
    })).toEqual([
      {
        path: [],
        structure: {
          type: "object",
          fields: {
            a: {
              type: "array",
              valueType: {
                type: "object",
                fields: {
                  b: {
                    type: "number"
                  }
                }
              }
            }
          }
        }
      }
    ]);
  });
});