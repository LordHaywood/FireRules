import isCyclicObject from "./isCyclicObject";
import { FieldConfig, FieldsConfig, ObjectConfig, MapConfig } from "../config/generic/FieldConfigs";
import { RulesInternalFieldId } from "../config/generic/ConditionsConfigs";

export type LevelStructure = {path: RulesInternalFieldId, structure: FieldConfig};

const ExtractObjectsRecursive = (obj: ObjectConfig|MapConfig, path: RulesInternalFieldId = []): LevelStructure[] => {
  switch (obj.type) {
    case "object":
      return [
        {path: path, structure: obj},
        ...Object.entries(obj.fields).reduce((l: LevelStructure[], [fieldId, fieldConfig]: [string, FieldConfig]) => {
          if (fieldConfig.type == "object")
            l.push(...ExtractObjectsRecursive(fieldConfig, [...path, fieldId]));
          return l;
        }, [])
      ];
    case "map":
      return [
        // {path: path, structure: obj},
        ...(obj.field.type == "object" || obj.field.type == "map") ? ExtractObjectsRecursive(obj.field, [...path, obj.key]) : []
      ]
  }
};

const ExtractObjectLevels = (obj: ObjectConfig|MapConfig, options?: {
  throwIfCyclic?: boolean
}): LevelStructure[]  => {
  if ((options?.throwIfCyclic || true) && isCyclicObject(obj))
    throw "Object invalid: is cyclic";

  return ExtractObjectsRecursive(obj);
};

export default ExtractObjectLevels;