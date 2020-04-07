import Config, { DocumentConfig } from "../generic/FireRulesConfig";
import VerifyPath from "./VerifyPath";
import VerifyFields from "./VerifyFields";

export default (config: Config): string[] => {
  const logs: string[] = [];

	Object.keys(config).forEach(path => {
    const params: string[] = [];
    VerifyPath(path, params, logs);

    const docConfig: DocumentConfig = config[path];
    VerifyFields(docConfig.fields, logs);

  });
  
  return logs;
};