import ConditionGroup from "../config/generic/ConditionsConfigs";
import ReduceConditionGroup from "../utils/ReduceConditionGroup";

const RenderConditions = (group: ConditionGroup) => {
  group = ReduceConditionGroup(group)
}