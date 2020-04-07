import RenderRulesDocumentId from "./RenderRulesDocumentId";

describe("RenderRulesDocumentId", () => {
  test("direct path", () => {
    expect(RenderRulesDocumentId(["users", "specifcUID"])).toBe(`/users/specifcUID`);
  });

  test("path uses param", () => {
    expect(RenderRulesDocumentId(["users", ["param", "uid"]])).toBe(`/users/{uid}`);
  });

  test("long path uses param", () => {
    expect(RenderRulesDocumentId(["users", ["param", "uid"], "config", "personal"])).toBe(`/users/{uid}/config/personal`);
  });
});