import { ConditionGroup, ConditionList } from "../../config/generic/ConditionsConfigs";

const ReduceConditionGroup = <T>(group: ConditionGroup): ConditionGroup =>
  ({
    operator: group.operator,
    conditions: group.conditions.reduce((l: ConditionList, v) => {
      if (Array.isArray(v))
        l.push(v);
      else if (v.conditions?.length > 0) {
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