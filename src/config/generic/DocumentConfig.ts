import { DocumentFieldsConfig } from "./FieldConfigs";
import RulesConfig from "../../rules/types/RulesConfig";

type DocumentConfig = {
	id: string,
	description: string,
  structure: DocumentFieldsConfig,
  rules: RulesConfig
};

export default DocumentConfig;