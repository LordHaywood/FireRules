import RenderField from "./RenderField";

describe("RenderField", () => {
  test("doc", () => {
    expect(RenderField(["doc", []])).toBe(`resource.data`);
    expect(RenderField(["doc", ["abc"]])).toBe(`resource.data.abc`);
    expect(RenderField(["doc", ["abc", 0]])).toBe(`resource.data.abc[0]`);
    expect(RenderField(["doc", ["abc", 0, "efg"]])).toBe(`resource.data.abc[0].efg`);
    expect(RenderField(["doc", ["abc", ["param", "uid"]]])).toBe(`resource.data.abc[uid]`);
    expect(RenderField(["doc", ["abc", ["param", "uid"], "hij"]])).toBe(`resource.data.abc[uid].hij`);
  });

  test("updateField", () => {
    expect(RenderField(["updateField", []])).toBe(`request.resource.data`);
    expect(RenderField(["updateField", ["abc"]])).toBe(`request.resource.data.abc`);
    expect(RenderField(["updateField", ["abc", 0]])).toBe(`request.resource.data.abc[0]`);
    expect(RenderField(["updateField", ["abc", 0, "efg"]])).toBe(`request.resource.data.abc[0].efg`);
    expect(RenderField(["updateField", ["abc", ["param", "uid"]]])).toBe(`request.resource.data.abc[uid]`);
    expect(RenderField(["updateField", ["abc", ["param", "uid"], "hij"]])).toBe(`request.resource.data.abc[uid].hij`);
  });

  test("externalDoc", () => {
    expect(() => RenderField(["externalDoc", [], []])).toThrowError(`Invalid Document Id`);
    expect(() => RenderField(["externalDoc", ["user"], []])).toThrowError(`Invalid Document Id`);
    expect(RenderField(["externalDoc", ["user", ["param", "uid"]], []])).toBe(`get(/databases/$(database)/documents/user/$(uid)).data`);
    expect(RenderField(["externalDoc", ["collection", "doc"], ["abc"]])).toBe(`get(/databases/$(database)/documents/collection/doc).data.abc`);
    expect(RenderField(["externalDoc", ["collection", "doc"], ["abc", 0]])).toBe(`get(/databases/$(database)/documents/collection/doc).data.abc[0]`);
    expect(RenderField(["externalDoc", ["collection", "doc"], ["abc", 0, "efg"]])).toBe(`get(/databases/$(database)/documents/collection/doc).data.abc[0].efg`);
    expect(RenderField(["externalDoc", ["collection", "doc"], ["abc", ["param", "uid"]]])).toBe(`get(/databases/$(database)/documents/collection/doc).data.abc[uid]`);
    expect(RenderField(["externalDoc", ["collection", "doc"], ["abc", ["param", "uid"], "hij"]])).toBe(`get(/databases/$(database)/documents/collection/doc).data.abc[uid].hij`);
  });
});