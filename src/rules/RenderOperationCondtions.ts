import { Operation } from './types/RulesConfig';
import { ConditionGroup } from '../config/generic/ConditionsConfigs';
import RenderConditionGroup from './RenderConditionGroup';

const RenderOperationCondtions = (config: Operation, indent: number = 2): string => {
  const baseCondtionGroup: ConditionGroup = {
    operator: "&&",
    conditions: []
  };

  if (config.requireAuth)
    baseCondtionGroup.conditions.push(["requiresAuth"]);

  if (config.additionalConditions)
    baseCondtionGroup.conditions.push(config.additionalConditions);

  return RenderConditionGroup(baseCondtionGroup, indent, true);
}

export default RenderOperationCondtions;