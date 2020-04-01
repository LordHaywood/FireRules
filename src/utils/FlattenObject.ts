import { Path } from "./FieldPath";
import { FieldConfig, FieldsConfig } from "../config/generic/FieldConfigs";

type FlattenedResult = {path: Path, config: FieldConfig}[]

const FlattenObject = (obj: FieldsConfig, path: Path = []): FlattenedResult => {
  return Object.entries(obj).reduce((t: FlattenedResult, [fieldId, fieldConfig]: [string, FieldConfig]) => {
    const currentPath: Path = [...path, fieldId];

    if (fieldConfig.type == "object")
      t.push(...FlattenObject(fieldConfig.fields, currentPath));
    else
      t.push({path: currentPath, config: fieldConfig});

    return t;
  }, []);
}

export default FlattenObject;