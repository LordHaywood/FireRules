import ReduceConditionGroup from "./ReduceConditionGroup";
import { ConditionGroup } from "../config/generic/ConditionsConfigs";
import RenderCondition from "../rules/RenderCondition";

const Indent = (amount: number) =>
  "\t".repeat(amount);

const RenderConditionGroup = (group: ConditionGroup, indent: number = 0, reduce: boolean = true): string => {
  if (reduce)
    group = ReduceConditionGroup(group);

  if (group.conditions.length == 0)
    return "true";

  if (group.conditions.length == 1)
    return Array.isArray(group.conditions[0]) ? RenderCondition(group.conditions[0]) : RenderConditionGroup(group.conditions[0], indent, false);
  
  return [
    "(",
    group.conditions
      .map(v => Array.isArray(v) ? RenderCondition(v) : RenderConditionGroup(v, indent + 1, false))
      .map(v => Indent(indent + 1) + v)
      .join(` ${group.operator}\n`),
    Indent(indent) + ")"
  ].join(`\n`);
}

export default RenderConditionGroup;