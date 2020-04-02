import ReduceConditionGroup from "./ReduceConditionGroup";

type ConditionGroup = {
  operator: "&&"|"||",
  conditions: Array<string | ConditionGroup>
};

const Indent = (amount: number) =>
  "\t".repeat(amount);

const RenderConditionGroup = (group: ConditionGroup, indent: number = 0, reduce: boolean = true): string => {
  if (reduce)
    group = ReduceConditionGroup(group);

  if (group.conditions.length == 0)
    return "true";

  if (group.conditions.length == 1)
    return typeof group.conditions[0] == "string" ? group.conditions[0] : RenderConditionGroup(group.conditions[0], indent, false);
  
  return [
    "(",
    group.conditions
      .map(v => typeof v == "string" ? v : RenderConditionGroup(v, indent + 1, false))
      .map(v => Indent(indent + 1) + v)
      .join(` ${group.operator}\n`),
    Indent(indent) + ")"
  ].join(`\n`);
}

export default RenderConditionGroup;