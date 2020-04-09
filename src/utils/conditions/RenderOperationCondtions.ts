import { Operation } from '../../rules/types/RulesConfig';
import { ConditionGroup } from '../../config/generic/ConditionsConfigs';
import RenderConditionGroup from './RenderConditionGroup';
import DocumentConfig from '../../config/generic/DocumentConfig';
import StructureConditions from '../../rules/StructureConditions';

const RenderOperationCondtions = (
  config: Operation,
  options: {
    documentConfig?: DocumentConfig,
    operator?: "create"|"delete"|"get"|"list"|"read"|"update"|"write",
    indent: number
  } = {
    indent: 2
  }
): string => {
  const baseCondtionGroup: ConditionGroup = {
    operator: "&&",
    conditions: []
  };

  if (config.requireAuth)
    baseCondtionGroup.conditions.push(["requiresAuth"]);

  if (options.operator && options.documentConfig)
    if (["create", "write"].indexOf(options.operator) != -1)
      baseCondtionGroup.conditions.push(StructureConditions(options.documentConfig.structure));

  if (config.additionalConditions)
    baseCondtionGroup.conditions.push(config.additionalConditions);

  return RenderConditionGroup(baseCondtionGroup, options.indent, true);
}

export default RenderOperationCondtions;