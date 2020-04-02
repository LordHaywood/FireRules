import ReduceConditionGroup from "./ReduceConditionGroup";

describe("ReduceConditionGroup", () => {
  test("not required", () => {
    expect(ReduceConditionGroup({
      operator: "&&",
      conditions: [
        {
          operator: "||",
          conditions: ["abc", "cde"]
        }
      ]
    })).toEqual({
      operator: "&&",
      conditions: [
        {
          operator: "||",
          conditions: ["abc", "cde"]
        }
      ]
    });
  });

  test("required && reduce", () => {
    expect(ReduceConditionGroup({
      operator: "&&",
      conditions: [
        {
          operator: "&&",
          conditions: ["abc", "cde"]
        },
        "hij"
      ]
    })).toEqual({
      operator: "&&",
      conditions: [
        "abc", "cde", "hij"
      ]
    });
  });

  test("required || reduce", () => {
    expect(ReduceConditionGroup({
      operator: "||",
      conditions: [
        {
          operator: "||",
          conditions: ["abc", "cde"]
        },
        "hij"
      ]
    })).toEqual({
      operator: "||",
      conditions: [
        "abc", "cde", "hij"
      ]
    });
  });
});