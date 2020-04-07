import Config, { DocumentConfig } from "../config/generic/FireRulesConfig";
import FieldConfigMap from "./FieldConfigMap";
import { RulesInternalFieldId } from "../config/generic/ConditionsConfigs";
import { FieldConfig } from "../config/generic/FieldConfigs";
import Walker from "../walker/Walker";

const ProccessTypes = (globalConfig: Config): FieldConfigMap =>
	Object.values(globalConfig).reduce((typeStructure: FieldConfigMap, config: DocumentConfig) => {
		if (config.canCreate)
			Walker(config, config.canCreate, (path: RulesInternalFieldId, fieldConfig: FieldConfig) => {
				if (path.length == 0)
					typeStructure[`Create${config.id.replace(/ /g, '')}`] = fieldConfig;
			});
		if (config.canEdit)
			Walker(config, config.canEdit, (path: RulesInternalFieldId, fieldConfig: FieldConfig) => {
				if (path.length == 0)
					typeStructure[`Edit${config.id.replace(/ /g, '')}`] = fieldConfig;
			});
		if (config.canRead)
			Walker(config, config.canRead, (path: RulesInternalFieldId, fieldConfig: FieldConfig) => {
				if (path.length == 0)
					typeStructure[`${config.id.replace(/ /g, '')}`] = fieldConfig;
			});
		return typeStructure;
  }, {});
  
export default ProccessTypes;