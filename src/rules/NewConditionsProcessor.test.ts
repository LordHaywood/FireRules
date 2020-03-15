import { RenderInteralFieldPath, RenderFieldList, RenderDocFieldPath, RenderField } from "./NewConditionsProcessor";

describe("RenderInteralFieldPath", () => {
  test("without params", () => {
    expect(RenderInteralFieldPath(["field", ["users", "userABC"]])).toBe(`.users.userABC`);
  });

  test("with params", () => {
    expect(RenderInteralFieldPath(["field", ["users", ["param", "uid"]]])).toBe(`.users[uid]`);
  });
});

describe("RenderFieldList", () => {
  test("no elements", () => {
    expect(RenderFieldList([])).toBe(`[]`);
  });

  test("only string elements", () => {
    expect(RenderFieldList(["elm1", "elm2"])).toBe(`["elm1","elm2"]`);
  });

  test("only number elements", () => {
    expect(RenderFieldList([0, 1, 2])).toBe(`[0,1,2]`);
  });

  test("mixed string and number elements", () => {
    expect(RenderFieldList([0, 1, 2, "abc", "efg"])).toBe(`[0,1,2,"abc","efg"]`);
  });
});

describe("RenderDocFieldPath", () => {
  test("without params", () => {
    expect(RenderDocFieldPath(["doc", ["users", "abc"], ["field", ["displayName"]]])).toBe(`get(/databases/$(database)/documents/users/abc).data.displayName`);
  });

  test("with params", () => {
    expect(RenderDocFieldPath(["doc", ["users", ["param", "uid"]], ["field", ["displayName"]]])).toBe(`get(/databases/$(database)/documents/users/$(uid)).data.displayName`);
  });
});

describe("RenderField", () => {
  describe("RenderDocFieldPath", () => {
    test("without params", () => {
      expect(RenderField(["doc", ["users", "abc"], ["field", ["displayName"]]])).toBe(`get(/databases/$(database)/documents/users/abc).data.displayName`);
    });
  
    test("with params", () => {
      expect(RenderField(["doc", ["users", ["param", "uid"]], ["field", ["displayName"]]])).toBe(`get(/databases/$(database)/documents/users/$(uid)).data.displayName`);
    });
  });
  
  describe("RenderInteralFieldPath", () => {
    test("without params", () => {
      expect(RenderField(["field", ["users", "userABC"]])).toBe(`.users.userABC`);
    });
  
    test("with params", () => {
      expect(RenderField(["field", ["users", ["param", "uid"]]])).toBe(`.users[uid]`);
    });
  });
});