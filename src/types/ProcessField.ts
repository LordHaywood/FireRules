import { FieldConfig } from "../config/generic/FieldConfigs";
import ProcessObjectFields from "./ProcessObjectFields";
import ProcessMapFields from "./ProcessMapFields";
import ProcessArrayField from "./ProcessArrayField";

export const ProcessFieldRaw = (field: FieldConfig, depth: number = 1): string => {
	if (field.type == "object")
		return ProcessObjectFields(field.fields, depth + 1);
  else if (field.type == "map")
    return ProcessMapFields(field, depth);
	else if (field.type == "array")
		return `${ProcessArrayField(field.valueType, depth)}[]`;
	else if (field.type == "timestamp")
		return `number`;
	return `${field.type}`;
};

const ProcessField = (field: FieldConfig, depth: number = 1, fieldId: string|null = null): string => {
	const start: string = fieldId != null ? `${fieldId}${field.required ? '' : '?'}: `: '';
	return `${start}${ProcessFieldRaw(field, depth)}`;
};

export default ProcessField;