import isCyclicObject from "./isCyclicObject";
import { Path } from "./FieldPath";
import { FieldConfig, FieldsConfig } from "../config/generic/FieldConfigs";

type LevelStructure = {path: Path, structure: FieldConfig};

const ExtractObjectsRecursive = (obj: FieldsConfig, path: Path = []): LevelStructure[] => {
  return [
    {path: path, structure: {type: "object", fields: obj}},
    ...Object.entries(obj).reduce((l: any[], [fieldId, fieldConfig]: [string, FieldConfig]) => {
      if (fieldConfig.type == "object")
        l.push(...ExtractObjectsRecursive(fieldConfig.fields, [...path, fieldId]));
      return l;
    }, [])
  ]
};

const ExtractObjectLevels = (obj: FieldsConfig, options?: {
  throwIfCyclic?: boolean
}): LevelStructure[]  => {
  if ((options?.throwIfCyclic || true) && isCyclicObject(obj))
    throw "Object invalid: is cyclic";

  return ExtractObjectsRecursive(obj);
};

export default ExtractObjectLevels;