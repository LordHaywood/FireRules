import DocumentConfig from "../config/generic/DocumentConfig";
import { RulesInternalDocumentId } from "../config/generic/ConditionsConfigs";
import RenderRulesDocumentId from "./RenderRulesDocumentId";
import RenderOperations from "./RenderOperations";

const RenderDocumentRules = (documentId: RulesInternalDocumentId, config: DocumentConfig, indent: number = 0): string => {
  return [
    `match ${RenderRulesDocumentId(documentId)} {`,
    RenderOperations(config, indent),
    `}`
  ].join('\n');
};

export default RenderDocumentRules;