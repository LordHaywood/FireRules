import { FieldConfig, FieldsConfig } from "../generic/FieldConfigs";

const VerifyField = (fieldConfig: FieldConfig, logs: string[] = [], path: string[] = []) => {
  const pathStr: string = path.join('.');

  if (fieldConfig.required != undefined && typeof fieldConfig.required != 'boolean')
    logs.push(`${pathStr}:${fieldConfig.type}(required) must be a boolean, found ${fieldConfig.required}`);

  switch (fieldConfig.type) {
    case "string":
      if (fieldConfig.enum && !Array.isArray(fieldConfig.enum))
        logs.push(`${pathStr}:${fieldConfig.type}(enum) must be an array of strings`);
      if (fieldConfig.min && Number.isInteger(fieldConfig.min))
        logs.push(`${pathStr}:${fieldConfig.type}(min) must be an number`);
      if (fieldConfig.max && Number.isInteger(fieldConfig.max))
        logs.push(`${pathStr}:${fieldConfig.type}(max) must be an number`);
      if (fieldConfig.verify) {
        if (fieldConfig.verify.type == "email") {

        } else if (fieldConfig.verify.type == "regex")  {
          if (!fieldConfig.verify.regex && fieldConfig.verify.regex.length > 0)
            logs.push(`${pathStr}:${fieldConfig.type}(verify.regex) must be an string`);
        }
      }
      break;
    case "number":
      if (fieldConfig.enum && !Array.isArray(fieldConfig.enum))
        logs.push(`${pathStr}:${fieldConfig.type}(enum) must be an array of number`);
      if (fieldConfig.min && Number.isInteger(fieldConfig.min))
        logs.push(`${pathStr}:${fieldConfig.type}(min) must be an number`);
      if (fieldConfig.max && Number.isInteger(fieldConfig.max))
        logs.push(`${pathStr}:${fieldConfig.type}(max) must be an number`);
      break;
    case "boolean":
      break;
    case "timestamp":
      break;
    case "array":
      if (!fieldConfig.valueType)
        logs.push(`${pathStr}:${fieldConfig.type}(valueType) must be used to specify contents of array`);
      else {
        VerifyField(fieldConfig.valueType, logs, [...path, '[]']);
      }
      break;
    case "object":
      if (!fieldConfig.fields)
        logs.push(`${pathStr}:${fieldConfig.type}(fields) must be an map of field configs`);
      else {
        Object.keys(fieldConfig.fields).forEach(fieldId =>
          VerifyField(fieldConfig.fields[fieldId], logs, [...path, fieldId])
        );
      }
      break;
  }
}

const VerifyFields = (config: FieldsConfig, logs: string[] = []) => {
  Object.keys(config).forEach(fieldId => {
    VerifyField(config[fieldId], logs, [fieldId]);
  })
}

export default VerifyFields;