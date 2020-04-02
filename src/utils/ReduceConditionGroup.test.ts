import ReduceConditionGroup from "./ReduceConditionGroup";

describe("ReduceConditionGroup", () => {
  test("not required", () => {
    expect(ReduceConditionGroup({
      operator: "&&",
      conditions: [
        {
          operator: "||",
          conditions: [["doc", ["abc"]], ["doc", ["efg"]]]
        }
      ]
    })).toEqual({
      operator: "&&",
      conditions: [
        {
          operator: "||",
          conditions: [["doc", ["abc"]], ["doc", ["efg"]]]
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
          conditions: [["doc", ["abc"]], ["doc", ["efg"]]]
        },
        ["doc", ["hij"]]
      ]
    })).toEqual({
      operator: "&&",
      conditions: [
        ["doc", ["abc"]],
        ["doc", ["efg"]],
        ["doc", ["hij"]]
      ]
    });
  });

  test("required || reduce", () => {
    expect(ReduceConditionGroup({
      operator: "||",
      conditions: [
        {
          operator: "||",
          conditions: [["doc", ["abc"]], ["doc", ["efg"]]]
        },
        ["doc", ["hij"]]
      ]
    })).toEqual({
      operator: "||",
      conditions: [
        ["doc", ["abc"]],
        ["doc", ["efg"]],
        ["doc", ["hij"]]
      ]
    });
  });
});