import { FieldExtractor } from '../config/generic/ConditionsConfigs';

const isDocIdWildcard = (docId: string): boolean =>
  docId.length > 3 && docId.charAt(0) == "{" && docId.charAt(docId.length - 1) == "}";

const isParamIsValid = (param: string): boolean => /^[a-zA-Z_-]+$/.test(param);

const ProcessDataExtraction = (config: FieldExtractor, docPath: string[]): string => {
	if (typeof config == "string")
		return `"${config}"`;
	if (typeof config == "number")
    return `${config}`;
  

	switch(config[0]) {
		case "data":
      return `resource.data.${config[1]}`;
    
		case "param":
      if (!isParamIsValid(config[1]))
        throw new TypeError(`Param '${config[1]}' must be in [a-zA-Z_-]+ format`);
			if (docPath.length === 0 || docPath.length % 2 != 0)
        throw `Invalid document path '${docPath.join('/')}'`;
      
      const param: string = `{${config[1]}}`;
      const availableParams: string[] = docPath.filter((v, i) => i % 2 != 0 && isDocIdWildcard(v));
			if (availableParams.indexOf(param) == -1)
				throw `Invalid param ${config[1]}, must be one of [${availableParams.map(v => `'${v.substring(1, v.length - 1)}'`).join(',')}]`;
      return config[1];
    
		case "postData":
      return `request.resource.data.${config[1]}`;
    
		case "prevData":
      return `resource.data.${config[1]}`;
    
		case "externalDocData":
      const getDocPath: string[] = config[1];

      const availableDocPathParams: string[] = docPath.filter((v, i) => i % 2 == 1 && isDocIdWildcard(v));

			if (docPath.length === 0 || docPath.length % 2 != 0)
        throw `Invalid document path '${docPath.join('/')}'`;
      if (getDocPath.length === 0 || getDocPath.length % 2 != 0)
        throw `Invalid document path '${getDocPath.join('/')}'`;

      for (let i=1; i<getDocPath.length; i+=2)
        if (isDocIdWildcard(getDocPath[i])) {
          if (availableDocPathParams.length == 0)
            throw `Invalid param ${getDocPath[i]}, document path has no params`;
          if (availableDocPathParams.indexOf(getDocPath[i]) == -1)
            throw `Invalid param ${getDocPath[i]}, must be one of [${availableDocPathParams.join(',')}]`;
        }
      
			return `get(/databases/$(database)/documents/${config[1].join('/')}).data.${config[2]}`;
	}
};

export default ProcessDataExtraction;