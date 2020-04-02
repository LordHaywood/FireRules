import RenderFieldList from "./RenderFieldList";

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
