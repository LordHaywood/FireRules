import RenderDocumentId from "./RenderDocumentId";

describe("RenderDocumentId", () => {
  test("empty (throws error)", () => {
    expect(() => RenderDocumentId([])).toThrowError("Invalid Document Id");
  });

  test("id is collection (throws error)", () => {
    expect(() => RenderDocumentId(["collection"])).toThrowError("Invalid Document Id");
    expect(() => RenderDocumentId(["collection1", "doc", "collection2"])).toThrowError("Invalid Document Id");
  });

  test("simple path", () => {
    expect(RenderDocumentId(["collection", "doc"])).toBe("/databases/$(database)/documents/collection/doc");
    expect(RenderDocumentId(["collection1", "doc1", "collection2", "doc2"])).toBe("/databases/$(database)/documents/collection1/doc1/collection2/doc2");
  });

  test("path with param", () => {
    expect(RenderDocumentId(["users", ["param", "uid"]])).toBe("/databases/$(database)/documents/users/$(uid)");
    expect(RenderDocumentId(["users", ["param", "uid"], "configs", "default"])).toBe("/databases/$(database)/documents/users/$(uid)/configs/default");
  });
});