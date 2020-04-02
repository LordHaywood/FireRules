import RenderFieldId from "./RenderFieldId";

describe("RenderFieldId", () => {
  test("empty", () => {
    expect(RenderFieldId([])).toBe("");
  });

  test("invalid array index", () => {
    expect(() => RenderFieldId([-6])).toThrowError("Invalid array index");
    expect(() => RenderFieldId([0.5])).toThrowError("Invalid array index");
    expect(() => RenderFieldId(["abc", 6.5])).toThrowError("Invalid array index");
    expect(() => RenderFieldId(["abc", 7.5, "efg"])).toThrowError("Invalid array index");
  });

  test("simple path", () => {
    expect(RenderFieldId([56])).toBe("[56]");
    expect(RenderFieldId(["fieldId"])).toBe(".fieldId");
    expect(RenderFieldId(["fieldId", "fieldId2"])).toBe(".fieldId.fieldId2");
    expect(RenderFieldId(["fieldId", 0])).toBe(".fieldId[0]");
    expect(RenderFieldId(["fieldId", 0, "fieldId2"])).toBe(".fieldId[0].fieldId2");
  });

  test("path with param", () => {
    expect(RenderFieldId([["param", "fieldId"]])).toBe("[fieldId]");
    expect(RenderFieldId(["fieldId", ["param", "fieldId2"]])).toBe(".fieldId[fieldId2]");
    expect(RenderFieldId(["fieldId", ["param", "fieldId2"], "fieldId3"])).toBe(".fieldId[fieldId2].fieldId3");
    expect(RenderFieldId(["fieldId", 0, ["param", "fieldId2"]])).toBe(".fieldId[0][fieldId2]");
  });
});