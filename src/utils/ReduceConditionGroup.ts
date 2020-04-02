type ConditionGroup = {
  operator: "&&"|"||",
  conditions: Array<string | ConditionGroup>
};

const ReduceConditionGroup = (group: ConditionGroup): ConditionGroup =>
  ({
    operator: group.operator,
    conditions: group.conditions.reduce((l: Array<string | ConditionGroup>, v) => {
      if (typeof v == "string")
        l.push(v);
      else if (v.conditions.length > 0) {
        if (v.conditions.length == 1)
          l.push(v.conditions[0]);
        else if (v.operator == group.operator)
          l.push(...ReduceConditionGroup(v).conditions);
        else
          l.push(ReduceConditionGroup(v));
      }

      return l;
    }, [])
  });

export default ReduceConditionGroup;