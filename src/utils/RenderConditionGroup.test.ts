import RenderConditionGroup from "./RenderConditionGroup";

describe("RenderConditionGroup", () => {
  test("empty", () => {
    expect(RenderConditionGroup({
      operator: "&&",
      conditions: []
    })).toBe("true");
    
    expect(RenderConditionGroup({
      operator: "||",
      conditions: []
    })).toBe("true");
  });

  test("single condition", () => {
    expect(RenderConditionGroup({
      operator: "&&",
      conditions: [
        "a == b"
      ]
    })).toBe("a == b");
    
    expect(RenderConditionGroup({
      operator: "||",
      conditions: [
        "b == c"
      ]
    })).toBe("b == c");
  });

  test("multiple conditions", () => {
    expect(RenderConditionGroup({
      operator: "&&",
      conditions: [
        "a == b",
        "f == c"
      ]
    })).toBe("(\n\ta == b &&\n\tf == c\n)");
    
    expect(RenderConditionGroup({
      operator: "||",
      conditions: [
        "b == c",
        "e == j"
      ]
    })).toBe("(\n\tb == c ||\n\te == j\n)");
  });

  test("child condition groups", () => {
    expect(RenderConditionGroup({
      operator: "&&",
      conditions: [
        "a == b",
        {
          operator: "||",
          conditions: [
            "a == b",
            "f == c"
          ]
        }
      ]
    })).toEqual("(\n\ta == b &&\n\t(\n\t\ta == b ||\n\t\tf == c\n\t)\n)");
    
    expect(RenderConditionGroup({
      operator: "||",
      conditions: [
        "a == b",
        {
          operator: "&&",
          conditions: [
            "a == b",
            "f == c"
          ]
        }
      ]
    })).toEqual("(\n\ta == b ||\n\t(\n\t\ta == b &&\n\t\tf == c\n\t)\n)");
  });
});