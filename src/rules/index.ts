import Config from "../config/generic/MainConfig";
import Walker from "../walker/Walker";
import { FieldConfig } from "../config/generic/FieldConfigs";
import { RulesExternalFieldId, ConditionGroup, RulesInternalFieldId } from "../config/generic/ConditionsConfigs";
import RenderConditionGroup from "../utils/RenderConditionGroup";

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
				operator: "&&",
				conditions: []	
			},
			read: {
				operator: "&&",
				conditions: []	
			},
			update: {
				operator: "&&",
				conditions: []	
			},
			delete: {
				operator: "&&",
				conditions: []	
			}
		};
    const config = globalConfig[path];
    renderedConfig[path] = {};

		if (config.canCreate) {
			Walker(config, config.canCreate, (fieldId: RulesInternalFieldId, fieldConfig: FieldConfig) => {
				logConfig[path].create.conditions.push([["doc", fieldId], "keys", "hasAll", Object.keys(fieldConfig)]);
			});
			if (config.canCreate.conditions)
        logConfig[path].create.conditions.push(...config.canCreate.conditions.conditions);
      
      renderedConfig[path].create = RenderConditionGroup(logConfig[path].create);
    }
  });
  
	return renderedConfig;
};

export default NewProcessTypes;