type ConditionGroup = {
  operator: "&&"|"||",
  conditions: Array<string | ConditionGroup>
};

const Indent = (amount: number) =>
  " ".repeat(amount + 1);

const RenderConditionGroup = (group: ConditionGroup, indent: number = 0): string =>
  [
    Indent(indent) + "(",
    ...group.conditions
      .map(v => typeof v == "string" ? v : RenderConditionGroup(v, indent + 1))
      .map(v => Indent(indent + 1) + v)
      .join(`${group.operator}\n`),
    Indent(indent) + ")"
  ].join("\n");

export default RenderConditionGroup;