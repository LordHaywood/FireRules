import Config from "../config/generic/MainConfig";
import Walker from "../walker";
import { TreeStructure } from "../walker/TreeStructure";
import { FieldConfig } from "../config/generic/FieldConfigs";
import ConditionGroup from "../config/generic/ConditionsConfigs";
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
			Walker(config, config.canCreate, (_, fieldPath: string[], tree: TreeStructure) => {
				logConfig[path].create.conditions.push([["field", fieldPath], "keys", "hasAll", Object.keys(tree)]);
			}, (fieldPath: string[], fieldConfig: FieldConfig) => {
				// logConfig[path].create.conditions.push(...FieldRules(fieldPath, fieldConfig));
			});
			if (config.canCreate.conditions)
        logConfig[path].create.conditions.push(config.canCreate.conditions);
      
      renderedConfig[path].create = RenderFieldGroup(logConfig[path].create);
    }
  });
  
	return renderedConfig;
};

export default NewProcessTypes;