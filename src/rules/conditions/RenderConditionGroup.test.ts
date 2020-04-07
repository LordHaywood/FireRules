import RenderConditionGroup from "./RenderConditionGroup";
import { SingleCondition } from "../../config/generic/ConditionsConfigs";

const rawCondition: SingleCondition = ["doc", ["abc"]];
const processedCondition: string = "resource.data.abc";

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
        rawCondition
      ]
    })).toEqual(processedCondition);
    
    expect(RenderConditionGroup({
      operator: "||",
      conditions: [
        rawCondition
      ]
    })).toEqual(processedCondition);
  });

  test("multiple conditions", () => {
    expect(RenderConditionGroup({
      operator: "&&",
      conditions: [
        rawCondition,
        rawCondition
      ]
    })).toBe(`(\n\t${processedCondition} &&\n\t${processedCondition}\n)`);
    
    expect(RenderConditionGroup({
      operator: "||",
      conditions: [
        rawCondition,
        rawCondition
      ]
    })).toBe(`(\n\t${processedCondition} ||\n\t${processedCondition}\n)`);
  });

  test("child condition groups", () => {
    expect(RenderConditionGroup({
      operator: "&&",
      conditions: [
        rawCondition,
        {
          operator: "||",
          conditions: [
            rawCondition,
            rawCondition
          ]
        }
      ]
    })).toEqual(`(\n\t${processedCondition} &&\n\t(\n\t\t${processedCondition} ||\n\t\t${processedCondition}\n\t)\n)`);
    
    expect(RenderConditionGroup({
      operator: "||",
      conditions: [
        rawCondition,
        {
          operator: "&&",
          conditions: [
            rawCondition,
            rawCondition
          ]
        }
      ]
    })).toEqual(`(\n\t${processedCondition} ||\n\t(\n\t\t${processedCondition} &&\n\t\t${processedCondition}\n\t)\n)`);
  });
});