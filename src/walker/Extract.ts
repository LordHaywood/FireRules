import { FieldConfig, FieldsConfig, ArrayFieldConfig } from "../config/generic/FieldConfigs";
import { TreeElement, TreeStructure, TreeArrayElement } from "./TreeStructure";

export const SplitFieldPath = (path: string): string[] =>
  path.split(".");

export const ExtractArrayFieldType = (fieldConfig: ArrayFieldConfig): TreeArrayElement =>
  (fieldConfig.type == 'object') ? {
		type: fieldConfig.type,
		map: ExtractObjectType(fieldConfig.fields),
	} :	{
		type: fieldConfig.type
	};

export const ExtractFieldType = (fieldConfig: FieldConfig): TreeElement =>
  (fieldConfig.type == 'object') ? {
		type: fieldConfig.type,
		map: ExtractObjectType(fieldConfig.fields),
		required: fieldConfig.required || false
	} : (fieldConfig.type == 'array') ?	{
		type: fieldConfig.type,
		valueType: ExtractArrayFieldType(fieldConfig.valueType),
		required: fieldConfig.required || false
	} :	{
		type: fieldConfig.type,
		required: fieldConfig.required || false
	};

export const ExtractObjectType = (fieldsConfig: FieldsConfig): TreeStructure =>
  Object.keys(fieldsConfig).sort().reduce((obj: TreeStructure, fieldId) => {
    obj[fieldId] = ExtractFieldType(fieldsConfig[fieldId]);
    return obj;
  }, {});