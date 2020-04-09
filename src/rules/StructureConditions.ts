import { ConditionGroup, RulesInternalFieldId } from "../config/generic/ConditionsConfigs";
import { DocumentFieldsConfig, FieldConfig } from "../config/generic/FieldConfigs";
import ReduceConditionGroup from "../utils/conditions/ReduceConditionGroup";

const StructureConditionsCycle = (structure: DocumentFieldsConfig|FieldConfig, path: RulesInternalFieldId): ConditionGroup => {
  const conditionsGroup: ConditionGroup = {
    operator: "&&",
    conditions: []
  };

  switch (structure.type) {
    case "object":
      const keys = Object.keys(structure.fields);
      keys.sort();
      
      conditionsGroup.conditions.push([["doc", path], "isObject"]);
      if (keys.length > 0)
        conditionsGroup.conditions.push([["doc", path], "keys", "hasOnly", keys]);
      
      const requiredKeys = keys.filter(key => structure.fields[key].required);
      if (requiredKeys.length > 0)
        conditionsGroup.conditions.push([["doc", path], "keys", "hasAll", requiredKeys]);

      keys.forEach(key => {
        conditionsGroup.conditions.push(StructureConditionsCycle(structure.fields[key], [...path, key]));
      });
      break;

    case "map":
      conditionsGroup.conditions.push([["doc", path], "isMap"]);
      break;

    case "array":
      conditionsGroup.conditions.push([["doc", path], "isList"]);
      break;

    case "boolean":
      conditionsGroup.conditions.push([["doc", path], "isBoolean"]);
      break;

    case "number":
      conditionsGroup.conditions.push([["doc", path], "isNumber"]);
      break;

    case "string":
      conditionsGroup.conditions.push([["doc", path], "isString"]);
      break;

    case "timestamp":
      conditionsGroup.conditions.push([["doc", path], "isTimestamp"]);
      break;
  }

  return conditionsGroup
}

const StructureConditions = (structure: DocumentFieldsConfig): ConditionGroup => {
  return ReduceConditionGroup(StructureConditionsCycle(structure, []));
}

export default StructureConditions;