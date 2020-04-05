import { RulesInternalFieldId } from "../config/generic/ConditionsConfigs";
import { DocumentFieldsConfig, FieldConfig } from "../config/generic/FieldConfigs";
import { HasFieldId } from "./HasFieldId";

export const ExtractField = (obj: DocumentFieldsConfig, fieldId: RulesInternalFieldId): FieldConfig => {
  if (!HasFieldId(obj, fieldId))
    throw "Invalid path";

  return fieldId.reduce((config: FieldConfig, field) => {
    if (typeof field == "string" && config.type == "object")
      return config.fields[field];
    if (config.type == "map")
      return config.field;
    if (config.type == "array")
      return config.valueType;
    return config;
  }, obj);
};