import Config from "../config/generic/MainConfig";
import Walker from "../walker/Walker";
import { FieldConfig } from "../config/generic/FieldConfigs";
import ConditionGroup, { FieldId } from "../config/generic/ConditionsConfigs";
import { RenderFieldGroup } from "./ConditionsProcessor";

type LogConfig = {
	[path: string]: {
		create: ConditionGroup,
		read: ConditionGroup,
		update: ConditionGroup,
		delete: ConditionGroup
	}
};

type SingleRenderedConfig = {
  create?: string,
  read?: string,
  update?: string,
  delete?: string
};

type RenderedConfig = {
	[path: string]: SingleRenderedConfig
};

const NewProcessTypes = (globalConfig: Config): RenderedConfig => {
	const logConfig: LogConfig = {};
	const renderedConfig: RenderedConfig = {};
	Object.keys(globalConfig).forEach(path => {
		logConfig[path] = {
			create: {
				operation: "&&",
				conditions: []	
			},
			read: {
				operation: "&&",
				conditions: []	
			},
			update: {
				operation: "&&",
				conditions: []	
			},
			delete: {
				operation: "&&",
				conditions: []	
			}
		};
    const config = globalConfig[path];
    renderedConfig[path] = {};

		if (config.canCreate) {
			Walker(config, config.canCreate, (fieldId: FieldId, fieldConfig: FieldConfig) => {
				logConfig[path].create.conditions.push([fieldId, "keys", "hasAll", Object.keys(fieldConfig)]);
			}, (fieldPath: FieldId, fieldConfig: FieldConfig) => {
				// logConfig[path].create.conditions.push(...FieldRules(fieldPath, fieldConfig));
			});
			// if (config.canCreate.conditions)
      //   logConfig[path].create.conditions.push(config.canCreate.conditions);
      
      renderedConfig[path].create = RenderFieldGroup(logConfig[path].create);
    }
  });
  
	return renderedConfig;
};

export default NewProcessTypes;