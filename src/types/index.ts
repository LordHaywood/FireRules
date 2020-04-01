import Config, { DocumentConfig } from "../config/generic/MainConfig";
import Walker from "../walker/Walker";
import { FieldConfig, FieldsConfig } from "../config/generic/FieldConfigs";
import { FieldId } from "../config/generic/ConditionsConfigs";

type FieldConfigMap = Record<string, FieldConfig>;

const ProccessTypes = (globalConfig: Config): FieldConfigMap =>
	Object.values(globalConfig).reduce((typeStructure: {[id: string]: FieldConfig}, config: DocumentConfig) => {
		if (config.canCreate)
			Walker(config, config.canCreate, (path: FieldId, fieldConfig: FieldConfig) => {
				if (path.length == 0)
					typeStructure[`Create${config.id.replace(/ /g, '')}`] = fieldConfig;
			});
		if (config.canEdit)
			Walker(config, config.canEdit, (path: FieldId, fieldConfig: FieldConfig) => {
				if (path.length == 0)
					typeStructure[`Edit${config.id.replace(/ /g, '')}`] = fieldConfig;
			});
		if (config.canRead)
			Walker(config, config.canRead, (path: FieldId, fieldConfig: FieldConfig) => {
				if (path.length == 0)
					typeStructure[`${config.id.replace(/ /g, '')}`] = fieldConfig;
			});
		return typeStructure;
	}, {});

const ProcessTypes = (globalConfig: Config): string => {
	const FieldConfigMap: FieldConfigMap = ProccessTypes(globalConfig);

	return Object.keys(FieldConfigMap).sort().map((id: string) =>	
		`export type ${id} = ${ProcessField(FieldConfigMap[id])};\n`
	).join('\n');
};

export const ProcessField = (field: FieldConfig, depth: number = 1, fieldId: string|null = null): string => {
	const start: string = fieldId != null ? `${fieldId}${field.required ? '' : '?'}: `: '';

	if (field.type == "object")
		return `${start}${ProcessFields(field.fields, depth + 1)}`;
	else if (field.type == "array")
		return `${start}${ProcessArrayField(field.valueType, depth)}[]`;
	else if (field.type == "timestamp")
		return `${start}${"number"}`;
	return `${start}${field.type}`;
};

export const ProcessArrayField = (field: FieldConfig, depth: number = 1): string =>
	(field.type == "object") ? ProcessFields(field.fields, depth + 1) :
		(field.type == "timestamp") ? "number" : field.type;

export const ProcessFields = (tree: FieldsConfig, depth: number = 1): string => {
	const list: string[] = Object.keys(tree).sort().map(fieldId =>
		ProcessField(tree[fieldId], depth, fieldId)
	);

	return `{${list.length > 0 ? '\n' + `	`.repeat(depth) : ''}${list.join(',\n' + `	`.repeat(depth))}${list.length > 0 ? '\n' + `	`.repeat(depth - 1) : ''}}`;
};

export default ProcessTypes;