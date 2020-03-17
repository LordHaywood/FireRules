import Config from "../config/generic/MainConfig";
import Walker from "../walker";
import { TreeStructure } from "../walker/TreeStructure";
import { FieldConfig } from "../config/generic/FieldConfigs";
import ConditionGroup from "../config/generic/ConditionsConfigs";

type LogConfig = {
	[path: string]: {
		create: ConditionGroup,
		read: ConditionGroup,
		update: ConditionGroup,
		delete: ConditionGroup
	}
};

type RenderedConfig = {
	[path: string]: {
		create: string,
		read: string,
		update: string,
		delete: string
	}
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
		if (config.canCreate) {
			Walker(config, config.canCreate, (_, fieldPath: string[], tree: TreeStructure) => {
				// logConfig[path].create.conditions.push(ObjectHasAllKeysRule(fieldPath, tree));
			}, (fieldPath: string[], fieldConfig: FieldConfig) => {
				// logConfig[path].create.conditions.push(...FieldRules(fieldPath, fieldConfig));
			});
			// if (config.canCreate.conditions)
      //   logConfig[path].create.conditions.push(HandleCondtions(config.canCreate.conditions, path));
    }
    
    // renderedConfig[path].create = ReduceConditionGroups(logConfig[path].create, 2);
  });
  
	return renderedConfig;
};

export default NewProcessTypes;