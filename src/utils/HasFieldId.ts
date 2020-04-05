import { DocumentFieldsConfig, FieldConfig } from "../config/generic/FieldConfigs";
import { RulesInternalFieldId } from "../config/generic/ConditionsConfigs";

const HasFieldInternal = (obj: FieldConfig, fieldId: RulesInternalFieldId): boolean => {
  if (fieldId.length == 0) {
    switch (obj.type) {
      case "string":
      case "number":
      case "boolean":
      case "timestamp":
      case "object":
      case "map":
      case "array":
        return true;
    }
  }
  if (Array.isArray(fieldId[0]) && obj.type == "map")
    return HasFieldInternal(obj.field, fieldId.slice(1));
  if (typeof fieldId[0] == "string" && obj.type == "object") {
    if (Object.keys(obj.fields).indexOf(fieldId[0]) == -1)
      return false;
    return HasFieldInternal(obj.fields[fieldId[0]], fieldId.slice(1));
  }
  if (typeof fieldId[0] == "number" && obj.type == "array")
    return HasFieldInternal(obj.valueType, fieldId.slice(1));
  return false;
};

export const HasFieldId = (obj: DocumentFieldsConfig, fieldId: RulesInternalFieldId): boolean => {
  if (fieldId.length == 0)
    return true;
  if (Array.isArray(fieldId[0]) && obj.type == "map")
    return HasFieldInternal(obj, fieldId);
  if (typeof fieldId[0] == "string" && obj.type == "object")
    return HasFieldInternal(obj, fieldId);

  return false;
};