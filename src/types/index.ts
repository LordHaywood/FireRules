import { TreeStructure } from "../walker/TreeStructure";
import Config, { DocumentConfig } from "../config/generic/MainConfig";
import Walker from "../walker";

type TypesStructure = {
	[name: string]: TreeStructure
};

const ProccessTypes = (globalConfig: Config): TypesStructure => {
	const typeStructure: TypesStructure = {};
	Object.values(globalConfig).forEach((config: DocumentConfig) => {
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
	}, ``);
	return typeStructure;
};

const ProcessTypes = (globalConfig: Config): string => {
	const typesStructure: TypesStructure = ProccessTypes(globalConfig);

	return Object.keys(typesStructure).sort().map(id =>	
		`export type ${id} = ${ProcessFields(typesStructure[id])};\n`
	).join('\n');
};

const ProcessFields = (tree: TreeStructure, depth: number = 1): string => {
	const list: string[] = Object.keys(tree).sort().map(fieldId => {
		const field = tree[fieldId];
		if (field.type == "object")
			return `${fieldId}${field.required ? '' : '?'}: ${ProcessFields(field.map, depth + 1)}`;
		return `${fieldId}${field.required ? '' : '?'}: ${field.type}`;
	});

	return `{\n${`	`.repeat(depth)}${list.join(',\n' + `	`.repeat(depth))}\n${`	`.repeat(depth - 1)}}`;
};

export default ProcessTypes;