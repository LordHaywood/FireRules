import { ConditionGroup } from "../../config/generic/ConditionsConfigs";
import ReduceConditionGroup from "./ReduceConditionGroup";

const JoinConditions = (cond1: ConditionGroup, cond2: ConditionGroup): ConditionGroup => {
  return ReduceConditionGroup({
   operator: "&&",
   conditions: [
     cond1, 
     cond2
   ]
  })
};

export default JoinConditions;