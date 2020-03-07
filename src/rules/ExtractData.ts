import { FieldExtractor } from '../config/generic/ConditionsConfigs';

const ProcessDataExtraction = (config: FieldExtractor, docId: string): string => {
	if (typeof config == "string")
		return `"${config}"`;
	if (typeof config == "number")
		return `${config}`;
	switch(config[0]) {
		case "data":
			return `resource.data.${config[1]}`;
		case "param":
			if (docId.indexOf("${" + config[1] + "}") == -1)
				throw `Param ${config[1]} doesnt exist in doc ${docId}`;
			return config[1];
		case "postData":
			return `request.resource.data.${config[1]}`;
		case "prevData":
			return `resource.data.${config[1]}`;
		case "externalDocData":
			return `get(/databases/$(database)/documents${config[1]}).data.${config[2]}`;
	}
};

export default ProcessDataExtraction;