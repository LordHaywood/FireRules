import { DocumentConfig } from "../config/generic/MainConfig";
import { OnEventConfig } from "../config/generic/EventConfigs";
import { FieldConfig, FieldsConfig } from "../config/generic/FieldConfigs";
import { TreeStructure } from "./TreeStructure";
import { ExtractObjectType, SplitFieldPath } from "./Extract";

const Walker = (
	config: DocumentConfig,
	canConfig: OnEventConfig,
	onLevel: (level: number, path: string[], type: TreeStructure) => void,
	onConfig?: (path: string[], config: FieldConfig) => void
): void => {
	if (!(canConfig && canConfig.fields))
		return;
	
	onLevel(0, [], ExtractObjectType(canConfig.fields.reduce((fields: FieldsConfig, fieldId) => {
		fields[fieldId] = config.fields[fieldId];
		return fields;
	}, {})));

	canConfig.fields.forEach(v => {
		const splitPath: string[] = SplitFieldPath(v);

		let localConfig: FieldConfig = config.fields[splitPath[0]];
		for (let i=0; i<splitPath.length; i++) {
			const localPath: string[] = splitPath.slice(0, i + 1);
			if (i < splitPath.length - 1) {
				if (localConfig.type != 'object')
					throw `Invalid path ${splitPath}`;
				else {
					onLevel(i + 1, localPath, ExtractObjectType(localConfig.fields));
					localConfig = localConfig.fields[splitPath[i]];
				}
			} else if (onConfig)
				onConfig(localPath, localConfig);
		}
	});
}

export default Walker;