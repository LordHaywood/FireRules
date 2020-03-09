import { TreeStructure, TreeElement, TreeArrayElement } from "../walker/TreeStructure";
import Config, { DocumentConfig } from "../config/generic/MainConfig";
import Walker from "../walker";

type TypesStructure = {
	[name: string]: TreeStructure
};

const ProccessTypes = (globalConfig: Config): TypesStructure =>
	Object.values(globalConfig).reduce((typeStructure: TypesStructure, config: DocumentConfig) => {
		if (config.canCreate)
			Walker(config, config.canCreate, (level: number, _, fields: TreeStructure): void => {
				if (level == 0)
					typeStructure[`Create${config.id.replace(/ /g, '')}`] = fields;
			});
		if (config.canEdit)
			Walker(config, config.canEdit, (level: number, _, fields: TreeStructure): void => {
				if (level == 0)
					typeStructure[`Edit${config.id.replace(/ /g, '')}`] = fields;
			});
		if (config.canRead)
			Walker(config, config.canRead, (level: number, _, fields: TreeStructure): void => {
				if (level == 0)
					typeStructure[`${config.id.replace(/ /g, '')}`] = fields;
			});
		return typeStructure;
	}, {});

const ProcessTypes = (globalConfig: Config): string => {
	const typesStructure: TypesStructure = ProccessTypes(globalConfig);

	return Object.keys(typesStructure).sort().map(id =>	
		`export type ${id} = ${ProcessFields(typesStructure[id])};\n`
	).join('\n');
};

export const ProcessArrayField = (field: TreeArrayElement, depth: number = 1): string =>
	(field.type == "object") ? ProcessFields(field.map, depth + 1) :
		(field.type == "timestamp") ? field.type = "number" : field.type;

export const ProcessField = (field: TreeElement, depth: number = 1, fieldId: string|null = null): string => {
	const start: string = fieldId != null ? `${fieldId}${field.required ? '' : '?'}: `: '';

	if (field.type == "object")
		return `${start}${ProcessFields(field.map, depth + 1)}`;
	else if (field.type == "array")
		return `${start}${ProcessArrayField(field.valueType, depth)}[]`;
	else if (field.type == "timestamp")
		field.type = "number";
	return `${start}${field.type}`;
};

export const ProcessFields = (tree: TreeStructure, depth: number = 1): string => {
	const list: string[] = Object.keys(tree).sort().map(fieldId =>
		ProcessField(tree[fieldId], depth, fieldId)
	);

	return `{${list.length > 0 ? '\n' + `	`.repeat(depth) : ''}${list.join(',\n' + `	`.repeat(depth))}${list.length > 0 ? '\n' + `	`.repeat(depth - 1) : ''}}`;
};

export default ProcessTypes;