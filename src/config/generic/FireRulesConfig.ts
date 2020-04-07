import { RulesInternalDocumentId } from "./ConditionsConfigs";
import DocumentConfig from "./DocumentConfig";

type FireRulesConfig = {
  documents: {docId: RulesInternalDocumentId, config: DocumentConfig}[]
};

export default FireRulesConfig;