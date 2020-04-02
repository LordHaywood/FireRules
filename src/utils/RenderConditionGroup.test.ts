import RenderConditionGroup from "./RenderConditionGroup";

describe("RenderConditionGroup", () => {
  test("empty", () => {
    expect(RenderConditionGroup({
      operator: "&&",
      conditions: []
    })).toEqual("true");
    
    expect(RenderConditionGroup({
      operator: "||",
      conditions: []
    })).toEqual("true");
  });

  test("single condition", () => {
    expect(RenderConditionGroup({
      operator: "&&",
      conditions: [
        "a == b"
      ]
    })).toEqual("a == b");
    
    expect(RenderConditionGroup({
      operator: "||",
      conditions: [
        "b == c"
      ]
    })).toEqual("b == c");
  });

  test("multiple conditions", () => {
    expect(RenderConditionGroup({
      operator: "&&",
      conditions: [
        "a == b",
        "f == c"
      ]
    })).toEqual("(\n  a == b ||\n f == c\n)");
    
    expect(RenderConditionGroup({
      operator: "||",
      conditions: [
        "b == c",
        "e == j"
      ]
    })).toEqual("(\n  b == c ||\n e == j\n)");
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
    })).toEqual("(\n  a == b && (\n   a == b ||\n   f == c\n  )\n)");
    
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
    })).toEqual("(\n  a == b || (\n   a == b &&\n   f == c\n  )\n)");
  });
});