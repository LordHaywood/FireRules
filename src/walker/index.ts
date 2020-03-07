import { DocumentConfig } from "../config/generic/MainConfig";
import { OnEventConfig } from "../config/generic/EventConfigs";
import { FieldConfig, FieldsConfig } from "../config/generic/FieldConfigs";
import { TreeElment, TreeStructure } from "./TreeStructure";

const SplitFieldPath = (path: string): string[] => path.split(".");

const ExtractFieldType = (fieldConfig: FieldConfig): TreeElment => {
  if (fieldConfig.type == 'object')
    return {required: fieldConfig.required || false, type: fieldConfig.type, map: ExtractObjectType(fieldConfig.fields)};
  if (fieldConfig.type == 'array')
    return {required: fieldConfig.required || false, type: fieldConfig.type, valueType: ExtractFieldType(fieldConfig.valueType)};
  else
    return {required: fieldConfig.required || false, type: fieldConfig.type};
}

const ExtractObjectType = (fieldsConfig: FieldsConfig): TreeStructure => {
  return Object.keys(fieldsConfig).sort().reduce((obj: TreeStructure, fieldId) => {
    obj[fieldId] = ExtractFieldType(fieldsConfig[fieldId]);
    return obj;
  }, {});
}

const Walker = (
	config: DocumentConfig,
	canConfig: OnEventConfig,
	onLevel: (level: number, path: string[], type: TreeStructure) => void,
	onConfig?: (path: string[], config: FieldConfig) => void
): void => {
	if (canConfig && canConfig.fields) {
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
		})
	}
}

export default Walker;