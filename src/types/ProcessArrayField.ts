import { FieldConfig } from "../config/generic/FieldConfigs";
import ProcessFields from "./ProcessObjectFields";

const ProcessArrayField = (field: FieldConfig, depth: number = 1): string =>
	(field.type == "object") ? ProcessFields(field.fields, depth + 1) :
    (field.type == "timestamp") ? "number" : field.type;
    
export default ProcessArrayField;