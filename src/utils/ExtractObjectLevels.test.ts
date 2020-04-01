import ExtractObjectLevels from "./ExtractObjectLevels";

describe("ExtractObjectLevels", () => {
  test("empty", () => {
    expect(ExtractObjectLevels({})).toEqual([
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
      a: {
        type: "number"
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
      a: {
        type: "object",
        fields: {
          b: {
            type: "number"
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